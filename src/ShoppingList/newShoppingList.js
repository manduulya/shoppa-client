import React from "react";
import { ShoppingListContext, ShoppingListData } from "../ShoppingListData";
import Store from "../MyStores/Store";

class NewShoppingList extends React.Component {
  state = { storeInput: "", listTitle: "" };

  static contextType = ShoppingListContext;

  changeInput(storeInput) {
    this.setState({ storeInput });
  }

  addStore() {
    this.context.addStore(this.state.storeInput);
  }

  formSubmitted(e) {
    e.preventDefault();

    fetch("yourserver.com/shoppingLists", {
      method: "POST",
      body: { shoppingList: this.context.shoppingList },
    })
      .then((r) => r.json())
      .then((response) => {});
  }

  render() {
    const s = this.context.shoppingList;
    console.log(this.context);
    return (
      <ShoppingListData>
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

          {Object.keys(s.items).map((store) => (
            <Store name={store} items={s.items[store]} />
          ))}

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
      </ShoppingListData>
    );
  }
}

export default NewShoppingList;
