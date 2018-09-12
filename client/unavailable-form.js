import React from "react";

class UnavailableForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currReason: '',
      invalid: false
    }

    this.clickWrapper = this.clickWrapper.bind(this)
    this.handleInput = props.handleInput.bind(this)
    this.cancel = this.cancel.bind(this)
  }

  clickWrapper() {
    const {
      id,
      parent,
      moveToUnavailable,
      toggleUnavailableForm
    } = this.props

    const { currReason } = this.state

    if (currReason.length === 0) {
      this.setState({
        invalid: true
      })
    } else {
      moveToUnavailable(id, parent, currReason)
      toggleUnavailableForm()
    }
  }

  cancel() {
    this.props.toggleUnavailableForm()
  }

  render() {
    const { invalid } = this.state

    return (
      <div style={{
        paddingLeft: '20px'
      }}>
        <p>Reason for Unavailability:</p>
        <input
          type="text"
          name="currReason"
          onChange={this.handleInput}
        />
        <button onClick={this.clickWrapper}>
          <strong>OK</strong>
        </button>
        <button onClick={this.cancel}>Cancel</button>
        {
          invalid ? (
            <p style={{ color: 'red' }}>Reason cannot be blank</p>
          ) : ''
        }
      </div>
    )
  }
}

export default UnavailableForm
