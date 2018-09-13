import React from 'react';

import Customer from './customer';

class Waiting extends React.Component {
  render() {
    const {
      style,
      waiting,
      customerHelped
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
              customer={x}
              customerHelped={customerHelped}
            />
          )
        }
      </div>
    );
  }
}

export default Waiting;
