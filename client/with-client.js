import React from "react";

import Salesperson from "./salesperson";

class WithClient extends React.Component {
  render() {
    const {
      style,
      withClient,
      removeFromQueue,
      moveSalesperson,
      moveToUnavailable,
      handleInput
    } = this.props;

    return (
      <div style={style.list}>
        <h3>With Client</h3>
        {
          withClient.length === 0 ? (
            <p>None with clients.</p>
          ) : (
            withClient.map(x =>
              <div key={x.id} style={style.item}>
                <Salesperson
                  key={x.id}
                  id={x.id}
                  name={x.name}
                  removeSalesperson={removeFromQueue}
                  moveSalesperson={moveSalesperson}
                  moveToUnavailable={moveToUnavailable}
                  handleInput={handleInput}
                  parent={'withClient'}
                  movesTo={'available'}
                  buttonText={'No Longer With Customer'}
                />
              </div>
            )
          )
        }
      </div>
    );
  }
}

export default WithClient;
