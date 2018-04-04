import React from "react";
import { render } from "react-dom";

import AddForm from "./add-form";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      salespeople: [],
      name: ""
    };

    this.addToQueue = this.addToQueue.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  addToQueue() {
    this.setState({
      salespeople: this.state.salespeople.concat(this.state.name),
      name: ""
    });
  }

  handleInput(event) {
    this.setState({
      name: event.target.value
    });
  }

  render() {
    return (
      <div>
        <AddForm
          addToQueue={this.addToQueue}
          handleInput={this.handleInput}
        />
      </div>
    );
  }
}

render(
  <Main />,
  document.body
);
