import React from 'react';

class Customer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLookingFor: false
    };

    this.toggleLookingFor = this.toggleLookingFor.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
  }

  toggleLookingFor() {
    this.setState(prevState => ({
      showLookingFor: !prevState.showLookingFor
    }));
  }

  handleDragOver(e) {
    e.preventDefault();
  }

  handleDrop(e) {
    const id = parseInt(e.dataTransfer.getData('id'), 10);
    this.props.moveSalesperson(id, 'available', 'withClient');
  }

  render() {
    const style = {
      customer: {
        position: 'relative',
        border: '1px solid',
        padding: '10px',
        height: '100px'
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

    const { showLookingFor } = this.state;

    const {
      name,
      notes,
      salesperson,
      lookingFor
    } = this.props;

    return (
      <div
        style={style.customer}
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
      >
        <div style={style.inner}>
          <h3>{name}</h3>
          <p>{notes}</p>
          {
            salesperson ? (
              <p style={style.salesperson}>{salesperson}</p>
            ) : ''
          }
          {
            lookingFor ? (
              <div style={style.lookingFor}>
                <span style={style.arrow} onClick={this.toggleLookingFor}>
                  {
                    showLookingFor ? '▼' : '►'
                  }
                </span>
                <span>Looking for</span>
                {
                  showLookingFor ? (
                    <span style={style.hidden}>{lookingFor}</span>
                  ) : ''
                }
              </div>
            ) : ''
          }
        </div>
      </div>
    );
  }
}

export default Customer;
