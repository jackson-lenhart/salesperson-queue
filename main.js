import React from "react";
import { render } from "react-dom";
import shortid from "shortid";

import AddForm from "./add-form";
import Queue from "./queue";

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
      salespeople: this.state.salespeople.concat({
        name: this.state.name,
        id: shortid.generate()
      }),
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
        <Queue salespeople={this.state.salespeople} />
      </div>
    );
  }
}

render(
  <Main />,
  document.body
);
