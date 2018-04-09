import React from "react";
import { render } from "react-dom";
import shortid from "shortid";

import AddForm from "./add-form";
import Available from "./available";
import WithClient from "./with-client";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      queue: [],
      currName: ""
    };

    this.addToQueue = this.addToQueue.bind(this);
    this.removeFromQueue = this.removeFromQueue.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.move = this.move.bind(this);
  }

  addToQueue(name) {
    this.setState({
      queue: this.state.queue.concat({
        name: name,
        id: shortid.generate(),
        status: "available"
      })
    });
  }

  removeFromQueue(name) {
    this.setState({
      queue: this.state.queue.filter(x =>
        x.name !== name
      )
    });
  }

  move(id, to) {
    this.setState({
      queue: this.state.queue.map(x => {
        if (x.id === id) {
          return Object.assign(x, { status: to });
        }
        return x;
      })
    });
  }

  handleInput(event) {
    this.setState({
      currName: event.target.value
    });
  }

  render() {
    return (
      <div>
        <AddForm
          addToQueue={this.addToQueue}
          handleInput={this.handleInput}
          currName={this.state.currName}
        />
        <Available
          available={this.state.queue.filter(x => x.status === "available")}
          move={this.move}
          removeFromQueue={this.removeFromQueue}
        />
        <WithClient
          withClient={this.state.queue.filter(x => x.status === "withClient")}
          move={this.move}
          removeFromQueue={this.removeFromQueue}
        />
      </div>
    );
  }
}

render(
  <Main />,
  document.body
);
