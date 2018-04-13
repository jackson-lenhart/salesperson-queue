import React from "react";
import { render } from "react-dom";
import shortid from "shortid";
import deepCopy from "deep-copy";

import AddForm from "./add-form";
import Available from "./available";
import WithClient from "./with-client";
import Unavailable from "./unavailable";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      queue: {
        available: [],
        withClient: [],
        unavailable: []
      },
      currName: ""
    };

    this.addToQueue = this.addToQueue.bind(this);
    this.removeFromQueue = this.removeFromQueue.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.move = this.move.bind(this);
  }

  addToQueue(name) {
    let newQueue = deepCopy(this.state.queue);
    newQueue.available = this.state.queue.available.concat({
      name,
      id: shortid.generate()
    });
    this.setState({
      queue: newQueue
    });
  }

  removeFromQueue(id) {
    let newQueue = deepCopy(this.state.queue);
    for (let k in this.state.queue) {
      newQueue[k] = this.state.queue[k].filter(x =>
        x.id !== id
      );
    }
    this.setState({
      queue: newQueue
    });
  }

  move(id, from, to) {
    this.setState(prevState => {
      let newQueue = deepCopy(prevState.queue);
      let temp = newQueue[from].find(x => x.id === id);
      newQueue[from] = prevState.queue[from].filter(x =>
        x.id !== id
      );
      newQueue[to] = prevState.queue[to].concat(temp);
      return {
        queue: newQueue
      };
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
          available={this.state.queue.available}
          move={this.move}
          removeFromQueue={this.removeFromQueue}
        />
        <WithClient
          withClient={this.state.queue.withClient}
          move={this.move}
          removeFromQueue={this.removeFromQueue}
        />
        <Unavailable
          unavailable={this.state.queue.unavailable}
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
