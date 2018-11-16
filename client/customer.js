import React from 'react';

import { formatWaitedSeconds, calculateWaitedSeconds } from './utils';

class Customer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLookingFor: false,
      waitedSeconds: calculateWaitedSeconds(props.customer.signed_in_timestamp)
    };

    this.toggleLookingFor = this.toggleLookingFor.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);

    this.customer = props.customer;
    this.salesperson = props.salesperson;
  }

  componentDidMount() {
    console.log(this.state.waitedSeconds);
    this.interval = setInterval(() => {
      this.setState({
        waitedSeconds: calculateWaitedSeconds(this.customer.signed_in_timestamp)
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  toggleLookingFor() {
    this.setState(prevState => ({
      showLookingFor: !prevState.showLookingFor
    }));
  }

  calculateWaitedSeconds() {
    const currentSeconds = Math.floor(Date.now() / 1000);
    const waitedSeconds = currentSeconds - this.customer.signed_in_timestamp;
    return waitedSeconds;
  }

  handleDragOver(e) {
    e.preventDefault();
  }

  handleDrop(e) {
    const salespersonData = JSON.parse(e.dataTransfer.getData('salesperson'));
    this.props.customerHelped(this.customer, salespersonData);
  }

  render() {
    const style = {
      customer: {
        position: 'relative',
        border: '1px solid',
        padding: '10px',
        height: '100px'
      },
      column: {
        float: 'left',
        width: '25%'
      },
      salesperson: {
        position: 'absolute',
        top: '10px',
        right: '10px'
      },
      lookingFor: {
        position: 'absolute',
        bottom: '10px',
        right: '10px'
      },
      arrow: {
        cursor: 'pointer'
      },
      hidden: {
        display: 'block',
        paddingLeft: '10px',
        paddingTop: '5px'
      }
    };

    const { waitedSeconds, showLookingFor } = this.state;

    const customer = this.customer;
    const salesperson = this.salesperson;

    return (
      <div
        style={style.customer}
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
      >
        <div style={style.column}>
          <h3>{customer.name}</h3>
          <p>{customer.notes}</p>
        </div>
        <div style={style.column}>
          {
            salesperson ? (
              <p style={style.salesperson}>{salesperson.name}</p>
            ) : ''
          }
        </div>
        <div style={style.column}>
          {
            customer.lookingFor ? (
              <div style={style.lookingFor}>
                <span style={style.arrow} onClick={this.toggleLookingFor}>
                  {
                    showLookingFor ? '▼' : '►'
                  }
                </span>
                <span>Looking for</span>
                {
                  showLookingFor ? (
                    <span style={style.hidden}>{customer.lookingFor}</span>
                  ) : ''
                }
              </div>
            ) : ''
          }
        </div>
        <div style={style.column}>
          <h1>{formatWaitedSeconds(waitedSeconds)}</h1>
        </div>
      </div>
    );
  }
}

export default Customer;
