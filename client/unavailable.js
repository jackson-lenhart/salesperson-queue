import React from 'react';

import Salesperson from './salesperson';

class Unavailable extends React.Component {
  render() {
    const {
      style,
      unavailable,
      moveSalesperson,
      removeSalesperson,
      handleInput
    } = this.props;

    return (
      <div style={style.list}>
        <h3>Unavailable</h3>
        {
          unavailable.length === 0 ? (
            <p>None unavailable.</p>
          ) : unavailable.map(x =>
            <div key={x.id} style={style.item}>
              <Salesperson
                key={x.id}
                id={x.id}
                name={x.name}
                moveSalesperson={moveSalesperson}
                removeSalesperson={removeSalesperson}
                handleInput={handleInput}
                unavailableReason={x.reason}
                parent={'unavailable'}
                movesTo={'available'}
                buttonText={'Mark As Available'}
              />
            </div>
          )
        }
      </div>
    );
  }
}

export default Unavailable;
