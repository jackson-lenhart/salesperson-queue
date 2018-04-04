import React from "react";
import { render } from "react-dom";
import shortid from "shortid";

import AddForm from "./add-form";
import Queue from "./queue";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      queue: [],
      name: ""
    };

    this.addToQueue = this.addToQueue.bind(this);
    this.removeFromQueue = this.removeFromQueue.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  addToQueue() {
    this.setState({
      queue: this.state.queue.concat({
        name: this.state.name,
        id: shortid.generate()
      }),
      name: ""
    });
  }

  removeFromQueue(name) {
    this.setState({
      queue: this.state.queue.filter(x =>
        x.name !== name
      )
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
          removeFromQueue=this.removeFromQueue
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
