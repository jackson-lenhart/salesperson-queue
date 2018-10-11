import React from 'react';
import { render } from 'react-dom';
import shortid from 'shortid';

import Available from './available';
import WithClient from './with-client';
import Unavailable from './unavailable';
import Waiting from './waiting';
import AddCustomerButton from './add-customer-button';
import AddCustomerForm from './add-customer-form';

import style from './style';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      isError: false,
      isLoading: true,
      salespersonIds: [],
      available: [],
      withClient: [],
      unavailable: [],
      waiting: [],
      customerFormMounted: false,
      customerFormErrorMsg: ''
    };

    this.addCustomer = this.addCustomer.bind(this);
    this.customerHelped = this.customerHelped.bind(this);
    this.removeCustomer = this.removeCustomer.bind(this);
    this.removeSalesperson = this.removeSalesperson.bind(this);
    this.moveSalesperson = this.moveSalesperson.bind(this);
    this.moveToUnavailable = this.moveToUnavailable.bind(this);
    this.toggleCustomerForm = this.toggleCustomerForm.bind(this);

    // TODO
    this.token = null;
  }

  componentDidMount() {

    // Fetch endpoints to get all current visitors waiting and salespeople available
    Promise.all([
      fetch('/api/visitor').then(res => res.json()),
      fetch('/api/salesperson').then(res => res.json())
    ])
    .then(([ visitors, salespeople ]) => {

      // if either visitors or salespeople is not an array, there's been an error with the request
      if (!Array.isArray(visitors) || !Array.isArray(salespeople)) {
        this.setState({
          isLoading: false,
          isError: true
        });
      } else {

        // Stream setup
        const stream = new EventSource('/api/visitor/observe');
        stream.onmessage = event => {
          const jsonString = event.data.replace('data: ', '').trim();
          const latestVisitors = JSON.parse(jsonString);
          this.setState({ waiting: latestVisitors });
        };

        // Setting state with what we got from 'fetchall' endpoints
        this.setState({
          salespersonIds: salespeople.map(s => s.id),
          waiting: visitors,
          available: salespeople,
          isLoading: false
        });
      }
    }).catch(err => {
      console.error(err)
      this.setState({
        isError: true
      });
    });
  }

  removeSalesperson(id, from) {
    this.setState(prevState => ({
      [from]: prevState[from].filter(x => x.id !== id)
    }));
  }

  moveSalesperson(id, from, to) {
    if (from !== to) {
      this.setState(prevState => ({
        [from]: prevState[from].filter(x => x.id !== id),
        [to]: prevState[to].concat(prevState[from].find(x => x.id === id))
      }));
    }
  }

  moveToUnavailable(id, from, reason) {
    this.setState(prevState => ({
      [from]: prevState[from].filter(x => x.id !== id),
      unavailable: prevState.unavailable
        .concat(Object.assign(prevState[from].find(x => x.id === id), { reason }))
    }));
  }

  toggleCustomerForm() {
    this.setState(prevState => ({
      customerFormMounted: !prevState.customerFormMounted
    }));
  }

  addCustomer({ name, hasVisitedBefore, salespersonId, notes, lookingFor }) {
    const { salespersonIds } = this.state;

    const visitor = {
      name,
      hasVisitedBefore,
      isWaiting: 1
    };

    // Nullable fields
    if (salespersonId) {
      const idAsInt = parseInt(salespersonId, 10);
      if (salespersonIds.some(x => x === idAsInt)) {
        visitor.salespersonId = idAsInt;
      } else {
        this.setState({
          customerFormErrorMsg: `Could not find salesperson with id ${salespersonId}`
        });
      }
    }
    if (notes) {
      visitor.notes = notes;
    }
    if (lookingFor) {
      visitor.lookingFor = lookingFor;
    }

    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(visitor)
    };

    fetch('/api/visitor/add', options)
    .then(res => res.text())
    .then(msg => console.log(msg));
  }

  /*
    this will take care of all the things when the customer is helped
    including:
    - sending customer and saleperson data to server
    - removing customer in state
    - moving salesperson to withClient in state
  */
  customerHelped(customer, salesperson) {
    const { id, parent } = salesperson;

    const options = {
      headers: {
        // TODO
        'Authorization': 'Bearer ${this.token}',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        customer,
        salespersonId: id
      })
    };

    fetch('/api/customer-helped', options)
    .then(res => {
      if (res.ok) {
        this.removeCustomer(customer.id);
        this.moveSalesperson(id, parent, 'withClient')
      } else {
        // error handling here...
      }
    });
  }

  removeCustomer(id) {
    this.setState(prevState => ({
      waiting: prevState.waiting.filter(x => x.id !== id)
    }));
  }

  handleInput(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const {
      isError,
      isLoading,
      customerFormMounted,
      waiting,
      available,
      withClient,
      unavailable,
      customerFormErrorMsg
    } = this.state;

    return (
      <div style={style.app}>
        <div style={style.header}>
          <span style={style.headertext}>Showroom Manager</span>
          <span style={style.nav}>This will be navigation stuffs!!</span>
        </div>
        <div style={style.row}>
          <div style={style.column}>
            <h2 style={style.subheader}>Customers</h2>
            <div style={style.addcustomer}>
              {
                customerFormMounted ? (
                  <AddCustomerForm
                    handleInput={this.handleInput}
                    addCustomer={this.addCustomer}
                    toggleCustomerForm={this.toggleCustomerForm}
                    style={style}
                  />
                ) : (
                  <AddCustomerButton
                    style={style}
                    toggleCustomerForm={this.toggleCustomerForm}
                  />
                )
              }
              {customerFormErrorMsg ? (
                <p style={{ color: 'red' }}>{customerFormErrorMsg}</p>
              ) : ''}
            </div>
            <Waiting
              waiting={waiting}
              handleInput={this.handleInput}
              customerHelped={this.customerHelped}
              style={style}
            />
          </div>
          <div style={style.column}>
            <h2 style={style.subheader}>Salespeople</h2>
            {
              isError ? (
                <p style={style.error}>Error loading calendars</p>
              ) : (
                isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <div>
                    <Available
                      available={available}
                      moveSalesperson={this.moveSalesperson}
                      removeSalesperson={this.removeSalesperson}
                      moveToUnavailable={this.moveToUnavailable}
                      handleInput={this.handleInput}
                      style={style}
                    />
                    <WithClient
                      withClient={withClient}
                      moveSalesperson={this.moveSalesperson}
                      removeSalesperson={this.removeSalesperson}
                      moveToUnavailable={this.moveToUnavailable}
                      handleInput={this.handleInput}
                      style={style}
                    />
                    <Unavailable
                      unavailable={unavailable}
                      handleInput={this.handleInput}
                      moveSalesperson={this.moveSalesperson}
                      removeSalesperson={this.removeSalesperson}
                      style={style}
                    />
                  </div>
                )
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

render(
  <Main />,
  document.getElementById('main')
);
