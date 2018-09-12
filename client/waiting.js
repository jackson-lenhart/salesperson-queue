import React from 'react';

import Customer from './customer';

class Waiting extends React.Component {
  render() {
    const {
      style,
      waiting,
      moveSalesperson
    } = this.props;

    return (
      <div style={style.list}>
        <h3>Waiting</h3>
        {
          waiting.length === 0 ? (
            <p>None waiting.</p>
          ) : waiting.map(x =>
            <Customer
              key={x.id}
              id={x.id}
              name={x.name}
              notes={x.notes}
              moveSalesperson={moveSalesperson}
              salesperson={x.salesperson}
              lookingFor={x.lookingFor}
            />
          )
        }
      </div>
    );
  }
}

export default Waiting;
