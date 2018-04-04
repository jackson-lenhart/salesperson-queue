import React from "react";
import { render } from "react-dom";

class Main extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello</h1>
      </div>
    );
  }
}

render(
  <Main />,
  document.body
);
