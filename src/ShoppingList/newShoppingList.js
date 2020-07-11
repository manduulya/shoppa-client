import React from "react";
import { ShoppingListContext } from "../ShoppingListData";
import Store from "../MyStores/Store";
import cuid from "cuid";

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

    fetch("http://localhost:8000/stores", {
      method: "POST",
      body: { shoppingList: this.context.shoppingList },
    })
      .then((r) => r.json())
      .then((response) => {
        // ** needs to pass history as props, not doing that yet
        this.props.history.push(`/lists/${response.shoppingList.id}`);
      });
  }

  render() {
    const s = this.context.shoppingList;
    let storeKeys = Object.keys(s.items);
    return (
      <form onSubmit={(e) => this.formSubmitted(e)}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          id="title"
          value={s.title}
          onChange={(e) => this.context.setTitle(e.currentTarget.value)}
        />
        <br />

        {storeKeys.map((store, i) => {
          return <Store key={i} name={store} items={s.items[store]} />;
        })}
        <fieldset>
          <input
            type="text"
            name="storeName"
            value={this.state.storeInput}
            onChange={(e) => this.changeInput(e.currentTarget.value)}
          />
          <button type="button" onClick={() => this.addStore()}>
            Add New Store
          </button>
        </fieldset>

        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default NewShoppingList;
