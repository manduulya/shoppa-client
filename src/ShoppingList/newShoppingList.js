import React from "react";
import { ShoppingListContext } from "../ShoppingListData";
import Store from "../MyStores/Store";
import config from "../config";
import "./newShoppingList.css";
import { Link } from "react-router-dom";
import cuid from "cuid";

class NewShoppingList extends React.Component {
  state = { storeInput: "" };

  static contextType = ShoppingListContext;
  //Changing storeInput state from the user input
  changeInput(storeInput) {
    this.setState({ storeInput });
  }
  //adding store to the context
  addStore() {
    if (!this.state.storeInput.trim()) return;
    this.context.addStore({
      //creating ID
      id: cuid(),
      //adding store name
      name: this.state.storeInput,
    });
    //resetting the input after submit
    this.changeInput("");
  }
  //resetting the form before render
  componentDidMount() {
    this.context.reset();
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
    return (
      <section className="newShoppingListContainer">
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
            console.log(s.stores);
            return (
              <Store
                key={store.id}
                id={store.id}
                name={store.name}
                items={s.items[store.id]}
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
              required
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
      </section>
    );
  }
}

export default NewShoppingList;
