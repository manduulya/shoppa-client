import React from "react";
import { ShoppingListContext } from "../ShoppingListData";
import Item from "../ShoppingList/Item";
import "./Store.css";

export default class Store extends React.Component {
  static contextType = ShoppingListContext;

  state = {
    nameInput: "",
  };

  changeInput(nameInput) {
    this.setState({ nameInput });
  }

  addItem() {
    this.context.addItem(this.props.name, this.state.nameInput);
    this.setState({ nameInput: "" });
    console.log(this.props.name);
  }

  render() {
    return (
      <fieldset className="Store">
        <h2>{this.props.name}</h2>
        <ul>
          {this.props.items.map((item, i) => (
            <li key={i}>
              <Item name={item} />
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={this.state.nameInput}
          onChange={(e) => this.changeInput(e.currentTarget.value)}
        />{" "}
        <button type="button" onClick={() => this.addItem()}>
          Add Item
        </button>
      </fieldset>
    );
  }
}
