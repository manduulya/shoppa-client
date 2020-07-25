import React from "react";
import { ShoppingListContext } from "../ShoppingListData";
import { Link } from "react-router-dom";
import "./ShoppingList.css";
import config from "../config";

export default class ShoppingList extends React.Component {
  static contextType = ShoppingListContext;
  state = {
    shoppingLists: [],
  };
  //fetching GET request by ID
  componentDidMount() {
    fetch(`${config.API_HOST}shoppinglist/${this.props.id}`)
      .then((r) => r.json())
      .then((data) => {
        //resetting the component before each GET request
        this.context.reset(() => {
          this.context.setTitle(data.title);
          for (const store of data.stores) {
            this.context.addStore(store);
            for (const item of data.items[store.id]) {
              this.context.addItem(store.id, item);
            }
          }
        });
      })
      .catch((error) => this.setState({ error }));
  }

  render() {
    const { title, items, stores } = this.context.shoppingList;

    return (
      <section className="ShoppingListContainer">
        <div className="ShoppingList">
          {this.context.shoppingList && (
            <>
              <h1>For: {title}</h1>
              {/*Mapping through Stores and rendering Stores in the component*/}
              {stores &&
                stores.map((store) => (
                  <div key={store.id}>
                    <h2>From: {store.name}</h2>
                    <ul>
                      {items[store.id].map((item) => (
                        <li key={item.id}>{item.name}</li>
                      ))}
                    </ul>
                  </div>
                ))}
            </>
          )}
        </div>
        <Link to="/s-list">
          <button className="newShoppingListButton">Back</button>
        </Link>
      </section>
    );
  }
}
