import React from "react";
import { ShoppingListContext } from "../ShoppingListData";
import Item from "../ShoppingList/Item";
import "./Store.css";
import cuid from "cuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default class Store extends React.Component {
  static contextType = ShoppingListContext;

  state = {
    nameInput: "",
  };
  //Changing store name and setState
  changeInput(nameInput) {
    this.setState({ nameInput });
  }
  //adding item function to
  addItem() {
    if (!this.state.nameInput.trim()) return;
    const item = { name: this.state.nameInput, id: cuid() };
    this.context.addItem(this.props.id, item);
    //resetting the input after submit
    this.setState({ nameInput: "" });
  }

  render() {
    return (
      <fieldset className="Store">
        <h2 className="flex">
          From: {this.props.name}{" "}
          <button
            className="fontAwesome"
            onClick={() => this.context.removeStore(this.props.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </h2>
        <ul>
          {/* mapping through items and rendering item component*/}
          {this.props.items.map((item) => (
            <li key={item.id} className="flex hover">
              <Item name={item.name} />
              <button
                className="fontAwesome"
                onClick={() => this.context.removeItem(this.props.id, item.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={this.state.nameInput}
          onChange={(e) => this.changeInput(e.currentTarget.value)}
        />{" "}
        <button
          className="newShoppingListButton"
          type="button"
          onClick={() => this.addItem()}
        >
          Add Item
        </button>
      </fieldset>
    );
  }
}
