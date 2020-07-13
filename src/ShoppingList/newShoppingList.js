import React from "react";
import { ShoppingListContext } from "../ShoppingListData";
import Store from "../MyStores/Store";
import cuid from "cuid";
import "./newShoppingList.css";
import { Link } from "react-router-dom";

class NewShoppingList extends React.Component {
  state = { storeInput: "" };

  static contextType = ShoppingListContext;

  changeInput(storeInput) {
    this.setState({ storeInput });
  }

  addStore() {
    this.context.addStore({
      name: this.state.storeInput,
      id: cuid(),
    });
  }
  formSubmitted(e) {
    e.preventDefault();
    const s = this.context.shoppingList;
    console.log(s.title);
    fetch("http://localhost:8000/shoppinglist", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title: s.title,
        items: s.items,
        stores: s.stores,
      }),
    })
      .then((r) => r.json())
      .then((response) => {
        // ** needs to pass history as props, not doing that yet
        this.props.history.push(`/s-list`);
      });
  }

  render() {
    const s = this.context.shoppingList;
    let storeKeys = Object.keys(s.items);
    return (
      <form onSubmit={(e) => this.formSubmitted(e)} className="newShoppingList">
        {/* <label htmlFor="title" className="title">
          Shopping list name:{" "}
        </label> */}
        <input
          className="title"
          type="text"
          name="title"
          id="title"
          value={s.title}
          target="value"
          placeholder="Shopping list name:"
          onChange={(e) => this.context.setTitle(e.currentTarget.value)}
        />
        <br />
        {/* {this.context.shoppingList.map((store, i) => {
          return <Store key={i} name={store} items={s.items[store]} />;
        })} */}
        {storeKeys.map((store, i) => {
          return <Store key={i} name={store} items={s.items[store]} />;
        })}
        <fieldset>
          <input
            type="text"
            name="storeName"
            className="storeNameInput"
            placeholder="Store name"
            value={this.state.storeInput}
            onChange={(e) => this.changeInput(e.currentTarget.value)}
          />
          <button type="button" onClick={() => this.addStore()}>
            Add Store
          </button>
        </fieldset>

        <button type="submit" className="newShoppingListButton">
          Save my list
        </button>
        <Link to="/nav">
          <button>Back</button>
        </Link>
      </form>
    );
  }
}

export default NewShoppingList;
