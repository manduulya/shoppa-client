import React from "react";
import { ShoppingListContext } from "../ShoppingListData";
import Store from "../MyStores/Store";
import config from "../config";
import "./newShoppingList.css";
import { Link } from "react-router-dom";
import cuid from "cuid";

function fillShoppingList(data, context) {
  context.reset(() => {
    // needs to be implemented, same way as setTitle
    context.setId(data.id);
    context.setTitle(data.title);
    for (const store of data.stores || []) {
      context.addStore(store);
      for (const item of data.items[store.id] || []) {
        context.addItem(store.id, item);
      }
    }
  });
}

class NewShoppingList extends React.Component {
  state = { storeInput: "" };

  static contextType = ShoppingListContext;
  //Changing storeInput state from the user input
  changeInput(storeInput) {
    this.setState({ storeInput });
  }
  //adding store to the context
  addStore() {
    const name = this.state.storeInput.trim();
    if (!name) return;
    if ("id" in this.props.match.params) {
      fetch(
        `${config.API_HOST}stores`, // POST /stores (create a new store) this should respond with the store that was created
        {
          method: "POST",
          body: JSON.stringify({
            shoppingListId: this.props,
            name,
          }),
        }
      )
        .then((r) => r.json())
        .then((store) => this.context.addStore(store));
    } else {
      this.context.addStore({
        id: cuid(),
        name: this.state.storeInput,
      });
    }

    this.changeInput("");
  }
  //resetting the form before render
  componentDidMount() {
    const cb =
      this.props.match.params.id &&
      (() => {
        fetch(`${config.API_HOST}shoppinglist/` + this.props.match.params.id)
          .then((r) => r.json())
          .then((shoppingList) => {
            // ... fill it the same way as in SHoppingList
            fillShoppingList(shoppingList, this.context);
          });
      });

    this.context.reset(cb);
  }
  //Form submitting function
  formSubmitted(e) {
    e.preventDefault();
    const s = this.context.shoppingList;
    //fetching POST request
    fetch(`${config.API_HOST}shoppinglists`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      //convert the input to JSON
      body: JSON.stringify({
        title: s.title,
        items: s.items,
        stores: s.stores,
      }),
    })
      .then((r) => r.json())
      .then((response) => {
        //directing to result page after POST request
        this.props.history.push(`/s-list`);
      });
  }

  render() {
    const s = this.context.shoppingList;
    console.log(s);
    const edit = "id" in this.props.match.params;
    const renderForm = !edit || this.context.shoppingList.id;
    return (
      <section className="newShoppingListContainer">
        {renderForm && (
          <form
            onSubmit={(e) => this.formSubmitted(e)}
            className="newShoppingList"
          >
            <label htmlFor="title" className="titleLabel">
              Shopping list name:{" "}
            </label>
            <br />
            <input
              className="title"
              type="text"
              name="title"
              id="title"
              value={s.title}
              target="value"
              placeholder="Enter a list name:"
              onChange={(e) => this.context.setTitle(e.currentTarget.value)}
              required
            />
            <br />
            {/*Mapping through Stores and rendering the Store component */}
            {s.stores.map((store) => {
              return (
                <Store
                  key={store.id}
                  id={store.id}
                  name={store.name}
                  items={s.items[store.id]}
                  edit={!!this.props.edit}
                />
              );
            })}
            <fieldset>
              <input
                type="text"
                name="storeName"
                className="storeNameInput"
                placeholder="Enter a store name"
                value={this.state.storeInput}
                onChange={(e) => this.changeInput(e.currentTarget.value)}
              />
              <br />
              <button
                type="button"
                className="newShoppingListButton"
                onClick={() => this.addStore()}
              >
                Add Store
              </button>
            </fieldset>

            <button type="submit" className="newShoppingListButton">
              Submit
            </button>
            <Link to="/nav">
              <button className="newShoppingListButton grey">Back</button>
            </Link>
          </form>
        )}
      </section>
    );
  }
}

export default NewShoppingList;
