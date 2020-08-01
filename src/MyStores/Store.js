import React from "react";
import { ShoppingListContext } from "../ShoppingListData";
import Item from "../ShoppingList/Item";
import "./Store.css";
import cuid from "cuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import config from "../config";

function removeItemServer(id) {
  return fetch(`${config.API_HOST}items/` + id, {
    method: "DELETE",
  });
}

function removeStoreServer(id) {
  return fetch(`${config.API_HOST}stores/` + id, {
    method: "DELETE",
  });
}

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
    const name = this.state.nameInput.trim();

    if (!name) return;

    if (this.props.edit) {
      const item = {
        storeId: Number(this.props.id),
        name: this.state.nameInput,
      };
      fetch(`${config.API_HOST}items`, {
        method: "POST",
        body: JSON.stringify({
          name,
          storeId: this.props.id,
        }),
      })
        .then((r) => r.json())
        .then(() => this.context.addItem(item));
    } else {
      const item = { name, id: cuid() };
      this.context.addItem(this.props.id, item);
    }

    this.changeInput("");
    this.setState({ nameInput: "" });
  }

  removeItem = (itemId) => {
    console.log(itemId, this.props);
    if (this.props.edit) {
      removeItemServer(itemId).then(() =>
        this.context.removeItem(this.props.id, itemId)
      );
    } else {
      this.context.removeItem(this.props.id, itemId);
    }
  };

  removeStore = () => {
    if (this.props.edit) {
      removeStoreServer(this.props.id).then(() =>
        this.context.removeStore(this.props.id)
      );
    } else {
      this.context.removeStore(this.props.id);
    }
  };

  render() {
    return (
      <fieldset className="Store">
        <h2 className="flex">
          From: {this.props.name}{" "}
          <button
            className="fontAwesome"
            onClick={() => this.removeStore(this.props.id)}
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
                onClick={(e) => {
                  e.preventDefault();
                  this.removeItem(item.id);
                }}
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
