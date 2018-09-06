import React from 'react';

import Customer from './customer';

class Waiting extends React.Component {
  render() {
    const {
      style,
      waiting
    } = this.props;

    return (
      <div>
        <h3 style={style.header}>Waiting</h3>
        {
          waiting.length === 0 ? (
            <p>None waiting.</p>
          ) : waiting.map(x =>
            <Customer
              key={x.id}
              id={x.id}
              name={x.name}
              salesperson={x.salesperson}
              description={x.description}
            />
          )
        }
      </div>
    );
  }
}

export default Waiting;
