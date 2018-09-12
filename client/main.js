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
      errorLoadingCalendars: false,
      available: [],
      withClient: [],
      unavailable: [],
      waiting: [],
      customerFormMounted: false
    };

    this.addCustomer = this.addCustomer.bind(this);
    this.removeSalesperson = this.removeSalesperson.bind(this);
    this.moveSalesperson = this.moveSalesperson.bind(this);
    this.moveToUnavailable = this.moveToUnavailable.bind(this);
    this.toggleCustomerForm = this.toggleCustomerForm.bind(this);
  }

  componentDidMount() {
    fetch('/api/calendars')
    .then(res => res.json())
    .then(calendars => {
      // if calendars is not an array, there's been an error with the request
      if (!Array.isArray(calendars)) {
        this.setState({
          isLoading: false,
          errorLoadingCalendars: true
        });
      } else {
        this.setState({
          isLoading: false,
          available: calendars
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
    this.setState(prevState => ({
      [from]: prevState[from].filter(x => x.id !== id),
      [to]: prevState[to].concat(prevState[from].find(x => x.id === id))
    }));
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

  addCustomer({ name, notes, salesperson, lookingFor }) {
    this.setState(prevState => ({
      waiting: prevState.waiting.concat({
        name,
        notes,
        salesperson,
        lookingFor,
        id: shortid.generate()
      }),
      customerFormMounted: false
    }));
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
      unavailable
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
            </div>
            <Waiting
              waiting={waiting}
              handleInput={this.handleInput}
              removeCustomer={this.removeCustomer}
              moveSalesperson={this.moveSalesperson}
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
