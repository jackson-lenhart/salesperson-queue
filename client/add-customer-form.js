import React from 'react';
import { omit } from 'ramda';

import { nameToLabel } from './utils';

class AddCustomerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      notes: '',
      salesperson: '',
      lookingFor: '',
      visited: false,
      invalid: false
    };

    this.handleInput = props.handleInput.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.clickWrapper = this.clickWrapper.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  clickWrapper(e) {
    e.preventDefault();

    const { name } = this.state;
    if (name.length === 0) {
      this.setState({
        invalid: true
      });
    } else {
      this.props.addCustomer(omit(['invalid'], this.state));
    }
  }

  handleCheckbox(e) {
    this.setState({
      visited: e.target.checked
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

    const { visited, invalid } = this.state;

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
            <label style={style.label} htmlFor="visited">Visited before?</label>
            <input
              style={style.checkbox}
              type="checkbox"
              name="visited"
              onChange={this.handleCheckbox}
            />
          </div>
          {
            visited ? (
              <div>
                <label style={style.label} htmlFor="salesperson">Salesperson:</label>
                <input
                  style={style.input}
                  placeholder="Salesperson"
                  type="text"
                  name="salesperson"
                  onChange={this.handleInput}
                />
              </div>
            ) : ''
          }
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
          {
            invalid ? (
              <p style={style.invalid}>Name cannot be blank</p>
            ) : ''
          }
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
