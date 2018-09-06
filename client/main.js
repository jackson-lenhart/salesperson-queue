import React from "react";
import { render } from "react-dom";
import shortid from "shortid";

import AddCustomerForm from "./add-customer-form";
import Available from "./available";
import WithClient from "./with-client";
import Unavailable from "./unavailable";
import Waiting from "./waiting";
import AddCustomerButton from "./add-customer-button";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
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
    fetch("http://localhost:3000/calendars")
      .then(res => res.json())
      .then(calendars => {
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
      }).catch(err => console.error(err));
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

  addCustomer({ name, salesperson, description }) {
    this.setState(prevState => ({
      waiting: prevState.waiting.concat({
        name,
        salesperson,
        description,
        id: shortid.generate()
      })
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
    const style = {
      app: {
        textAlign: "center"
      },
      item: {
        padding: "10px"
      },
      table: {
        padding: "20px"
      },
      header: {
        textAlign: "center"
      },
      row: {
        display: "flex"
      },
      column: {
        flex: "50%"
      }
    };

    const {
      isLoading,
      customerFormMounted,
      waiting,
      available,
      withClient,
      unavailable
    } = this.state;

    return (
      <div style={style.app}>
        <h1 style={style.header}>Showroom Manager</h1>
        <div style={style.row}>
          <div style={style.column}>
            <h2 style={style.header}>Customers</h2>
            {
              customerFormMounted ? (
                <AddCustomerForm
                  handleInput={this.handleInput}
                  addCustomer={this.addCustomer}
                  toggleCustomerForm={this.toggleCustomerForm}
                />
              ) : (
                <AddCustomerButton toggleCustomerForm={this.toggleCustomerForm} />
              )
            }
            <Waiting
              waiting={this.state.waiting}
              handleInput={this.handleInput}
              removeCustomer={this.removeCustomer}
              style={style}
            />
          </div>
          <div style={style.column}>
            <h2 style={style.header}>Salespeople</h2>
            {
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
            }
          </div>
        </div>
      </div>
    );
  }
}

render(
  <Main />,
  document.getElementById("main")
);
