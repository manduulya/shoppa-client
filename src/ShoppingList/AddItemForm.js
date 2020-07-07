import React, { Component } from "react";

export default class AddItemForm extends Component {
  onSubmitForm = (e) => {
    e.preventDefault();
    this.props.onAddItem(e.target.itemToAdd.value);
  };
  render() {
    return (
      <form onSubmit={this.onSubmitForm}>
        <input
          name="itemToAdd"
          type="text"
          placeholder="Please enter item"
          aria-label="Shopping List Item"
        ></input>
        <button type="submit">Add Item</button>
      </form>
    );
  }
}
