import React from 'react';

import MoveButton from './move-button';
import UnavailableButton from './unavailable-button';
import UnavailableForm from './unavailable-form';

class Salesperson extends React.Component {
  constructor() {
    super();
    this.state = {
      unavailableFormMounted: false,
      deleteFormMounted: false
    };

    this.toggleUnavailableForm = this.toggleUnavailableForm.bind(this);
    this.toggleDeleteForm = this.toggleDeleteForm.bind(this);
  }

  toggleUnavailableForm() {
    this.setState({
      unavailableFormMounted: !this.state.unavailableFormMounted
    });
  }

  toggleDeleteForm() {
    this.setState({
      deleteFormMounted: !this.state.deleteFormMounted
    });
  }

  render() {
    const style = {
      name: {
        padding: '10px'
      },
      button: {
        padding: '5px'
      },
      reason: {
        color: 'red'
      }
    };

    const {
      id,
      name,
      parent,
      movesTo,
      moveToUnavailable,
      handleInput,
      removeSalesperson,
      moveSalesperson,
      buttonText,
      unavailableReason
    } = this.props;

    const {
      unavailableFormMounted,
      deleteFormMounted
    } = this.state;

    return (
      <div>
        <span style={style.name}>{name}</span>
        <MoveButton
          moveSalesperson={moveSalesperson}
          id={id}
          parent={parent}
          movesTo={movesTo}
          buttonText={buttonText}
          style={style.button}
        />
        {
          parent !== 'unavailable' ? (
            unavailableFormMounted ? (
              <UnavailableForm
                id={id}
                moveToUnavailable={moveToUnavailable}
                parent={parent}
                toggleUnavailableForm={this.toggleUnavailableForm}
                handleInput={handleInput}
              />
            ) : (
              <UnavailableButton
                toggleUnavailableForm={this.toggleUnavailableForm}
                style={style.button}
              />
            )
          ) : (
            <p style={style.reason}>{unavailableReason}</p>
          )
        }
      </div>
    );
  }
}

export default Salesperson;
