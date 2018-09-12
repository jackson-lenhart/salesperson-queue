import React from 'react';

import Salesperson from './salesperson';

class Available extends React.Component {
  render() {
    const {
      style,
      available,
      moveSalesperson,
      removeSalesperson,
      moveToUnavailable,
      handleInput
    } = this.props;

    return (
      <div style={style.list}>
        <h3>Available</h3>
        {
          available.length === 0 ? (
            <p>None available.</p>
          ) : available.map(x =>
            <div key={x.id} style={style.item}>
              <Salesperson
                id={x.id}
                name={x.name}
                moveSalesperson={moveSalesperson}
                removeSalesperson={removeSalesperson}
                moveToUnavailable={moveToUnavailable}
                handleInput={handleInput}
                parent={'available'}
                movesTo={'withClient'}
                buttonText={'Helped A Customer'}
              />
            </div>
          )
        }
      </div>
    );
  }
}

export default Available;
