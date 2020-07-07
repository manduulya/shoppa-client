import React, { Component } from "react";

export default class MyStores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeName: "",
    };
  }
  render() {
    return (
      <section>
        <h2>Please add stores</h2>
        <form className="addStore">
          <label htmlFor="addStore">Store name:</label>
          <input type="text" id="addStore" name="addStore"></input>
          <button type="submit">Add folder</button>
        </form>
      </section>
    );
  }
}
