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
      }
    };

    this.addToQueue = this.addToQueue.bind(this);
    this.removeFromQueue = this.removeFromQueue.bind(this);
    this.move = this.move.bind(this);
    this.moveToUnavailable = this.moveToUnavailable.bind(this);
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
    let newQueue = deepCopy(this.state.queue);
    let temp = newQueue[from].find(x => x.id === id);
    newQueue[from] = this.state.queue[from].filter(x =>
      x.id !== id
    );
    newQueue[to] = this.state.queue[to].concat(temp);
    this.setState({
      queue: newQueue
    });
  }

  moveToUnavailable(id, from, reason) {
    let newQueue = deepCopy(this.state.queue);
    let temp = newQueue[from].find(x => x.id === id);
    newQueue[from] = this.state.queue[from].filter(x =>
      x.id !== id
    );
    newQueue.unavailable = this.state.queue.unavailable.concat(
      Object.assign(temp, { reason })
    );
    this.setState({
      queue: newQueue,
      unavailableFormMounted: false
    });
  }

  handleInput(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const style = {
      item: {
        padding: "10px"
      },
      table: {
        padding: "20px"
      }
    };

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
          mountUnavailableForm={this.mountUnavailableForm}
          unavailableFormMounted={this.state.unavailableFormMounted}
          currUnavailableReason={this.state.currUnavailableReason}
          moveToUnavailable={this.moveToUnavailable}
          handleInput={this.handleInput}
          style={style}
        />
        <WithClient
          withClient={this.state.queue.withClient}
          move={this.move}
          removeFromQueue={this.removeFromQueue}
          mountUnavailableForm={this.mountUnavailableForm}
          unavailableFormMounted={this.state.unavailableFormMounted}
          currUnavailableReason={this.state.currUnavailableReason}
          moveToUnavailable={this.moveToUnavailable}
          handleInput={this.handleInput}
          style={style}
        />
        <Unavailable
          unavailable={this.state.queue.unavailable}
          handleInput={this.handleInput}
          move={this.move}
          removeFromQueue={this.removeFromQueue}
          style={style}
        />
      </div>
    );
  }
}

render(
  <Main />,
  document.body
);
