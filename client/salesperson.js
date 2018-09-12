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
    this.handleDragStart = this.handleDragStart.bind(this);
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

  handleDragStart(e) {
    const { id } = this.props;
    e.dataTransfer.setData('id', id);
  }

  render() {
    const style = {
      name: {
        padding: '10px',
        cursor: 'pointer'
      },
      button: {
        padding: '5px'
      },
      reason: {
        paddingLeft: '10px'
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
        <span
          style={style.name}
          draggable="true"
          onDragStart={this.handleDragStart}
        >{name}</span>
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
            <p style={style.reason}>Reason: {unavailableReason}</p>
          )
        }
      </div>
    );
  }
}

export default Salesperson;
