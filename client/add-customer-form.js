import React from 'react';
import { omit } from 'ramda';

import { nameToLabel } from './utils';

class AddCustomerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      hasVisitedBefore: 0,
      errorMsg: ''
    };

    this.handleInput = props.handleInput.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.clickWrapper = this.clickWrapper.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  clickWrapper(e) {
    e.preventDefault();
    
    const { salespeople } = this.props;
    const { name, salespersonId } = this.state;

    if (!name) {
      this.setState({
        errorMsg: 'Name cannot be blank'
      });
    }
    else if (
      salespersonId
      && !this.props.salespeople.some(s => s.id === parseInt(salespersonId, 10))
    ) {
      this.setState({
        errorMsg: `Salesperson with id ${salespersonId} cannot be found`
      });
    }
    else {
      this.props.addCustomer(this.state);
      this.setState({
        nameError: false,
        salespersonError: false
      })
    }
  }

  handleCheckbox(e) {
    this.setState({
      hasVisitedBefore: e.target.checked ? 1 : 0
    });
  }

  cancel() {
    this.props.toggleCustomerForm();
  }

  render() {
    const { style } = this.props;

    style.buttonGroup = {
      paddingTop: '8px',
      paddingLeft: '40px'
    };
    style.invalid = {
      color: 'red',
      fontSize: '16px',
      paddingLeft: '40px'
    };

    const {
      hasVisitedBefore,
      salespersonId,
      errorMsg
    } = this.state;

    return (
      <div style={style.form}>
        <form onSubmit={this.clickWrapper}>
          <div>
            <label style={style.label} htmlFor="name">Name:</label>
            <input
              style={style.input}
              placeholder="Name"
              type="text"
              name="name"
              onChange={this.handleInput}
            />
          </div>
          <div>
            <label style={style.label} htmlFor="hasVisitedBefore">Visited before?</label>
            <input
              style={style.checkbox}
              type="checkbox"
              name="hasVisitedBefore"
              onChange={this.handleCheckbox}
            />
          </div>
          <div>
            <label style={style.label} htmlFor="salespersonId">Salesperson:</label>
            <input
              style={style.input}
              placeholder="Salesperson"
              type="text"
              name="salespersonId"
              onChange={this.handleInput}
            />
          </div>
          <div>
            <label style={style.label} htmlFor="notes">Notes:</label>
            <input
              style={style.input}
              placeholder="Notes"
              type="text"
              name="notes"
              onChange={this.handleInput}
            />
          </div>
          <div>
            <label style={style.label} htmlFor="lookingFor">Looking for:</label>
            <input
              style={style.input}
              placeholder="Looking for"
              type="text"
              name="lookingFor"
              onChange={this.handleInput}
            />
          </div>
          <p style={style.invalid}>{errorMsg}</p>
          <div style={style.buttonGroup}>
            <button style={style.button} type="submit">Add To List</button>
            <button style={style.button} type="button" onClick={this.cancel}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddCustomerForm
