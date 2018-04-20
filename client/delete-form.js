import React from "react";

class DeleteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currName: "",
      err: false
    };

    this.handleInput = props.handleInput.bind(this);
    this.clickWrapper = this.clickWrapper.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  clickWrapper() {
    if (this.state.currName !== this.props.name) {
      this.setState({
        err: true
      });
      return;
    }

    this.props.removeFromQueue(this.props.id);
    this.props.toggleDeleteForm();
  }

  cancel() {
    this.props.toggleDeleteForm();
  }

  render() {
    const style = {
      error: {
        color: "red"
      }
    };

    let errMsg = "";
    if (this.state.err) {
      errMsg = (
        <p style={style.error}>Error: salesperson name incorrect.</p>
      );
    }

    return (
      <div>
        <p>Enter salesperson{"'"}s name to delete</p>
        <input
          type="text"
          name="currName"
          onChange={this.handleInput}
        />
        <button onClick={this.clickWrapper}>
          <strong>Delete</strong>
        </button>
        <button onClick={this.cancel}>Cancel</button>
        {errMsg}
      </div>
    );
  }
}

export default DeleteForm;
