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
      available: [],
      withClient: [],
      unavailable: []
    };

    this.addToQueue = this.addToQueue.bind(this);
    this.removeFromQueue = this.removeFromQueue.bind(this);
    this.move = this.move.bind(this);
    this.moveToUnavailable = this.moveToUnavailable.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:3000/calendars")
      .then(res => res.json())
      .then(calendars =>
        this.setState({
          available: calendars
        })
      ).catch(err => console.error(err));
  }

  addToQueue(name) {
    this.setState(prevState => ({
      available: prevState.available.concat({ name, id: shortid.generate() })
    }));
  }

  removeFromQueue(id, from) {
    this.setState(prevState => ({
      [from]: prevState[from].filter(x => x.id !== id)
    }));
  }

  move(id, from, to) {
    this.setState(prevState => ({
      [from]: prevState[from].filter(x => x.id !== id),
      [to]: prevState[to].concat(prevState[from].find(x => x.id === id))
    }));
  }

  moveToUnavailable(id, from, reason) {
    this.setState(prevState => ({
      [from]: prevState[from].filter(x => x.id !== id),
      unavailable: prevState.unavailable
        .concat(Object.assign(prevState[from].find(x => x.id === id), { reason }))
    }));
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
          available={this.state.available}
          move={this.move}
          removeFromQueue={this.removeFromQueue}
          moveToUnavailable={this.moveToUnavailable}
          handleInput={this.handleInput}
          style={style}
        />
        <WithClient
          withClient={this.state.withClient}
          move={this.move}
          removeFromQueue={this.removeFromQueue}
          moveToUnavailable={this.moveToUnavailable}
          handleInput={this.handleInput}
          style={style}
        />
        <Unavailable
          unavailable={this.state.unavailable}
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
