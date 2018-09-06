import React from 'react';

class MoveButton extends React.Component {
  constructor() {
    super();
    this.clickWrapper = this.clickWrapper.bind(this);
  }

  clickWrapper() {
    const {
      moveSalesperson,
      id,
      parent,
      movesTo
    } = this.props;

    moveSalesperson(id, parent, movesTo);
  }

  render() {
    const {
      style,
      buttonText
    } = this.props;

    return (
      <span style={style}>
        <button onClick={this.clickWrapper}>
          <strong>{buttonText}</strong>
        </button>
      </span>
    );
  }
}

export default MoveButton;
