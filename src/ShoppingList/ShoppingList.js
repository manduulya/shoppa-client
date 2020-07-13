import React from "react";
import { ShoppingListContext } from "../ShoppingListData";
import { Link } from "react-router-dom";
import "./ShoppingList.css";

export default class ShoppingList extends React.Component {
  static contextType = ShoppingListContext;
  state = { shoppingList: {} };

  componentDidMount() {
    fetch(`http://localhost:8000/shoppinglist/${this.props.id}`)
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        this.context.setTitle(data.title);
        for (const store of data.stores) {
          this.context.addStore(store);
          for (const item of data.items[store.id]) {
            this.context.addItem(store.id, item);
          }
        }
      })
      .catch((error) => this.setState({ error }));
  }

  render() {
    const { title, items, stores } = this.context.shoppingList;

    return (
      <div className="ShoppingList">
        {this.context.shoppingList && (
          <>
            <h1>{title}</h1>
            {stores &&
              stores.map((store) => (
                <div key={store.id}>
                  <h2>{store.name}</h2>
                  <ul>
                    {items[store.id].map((item) => (
                      <li key={item.id}>{item.name}</li>
                    ))}
                  </ul>
                  <Link to="/">
                    <button>Back</button>
                  </Link>
                </div>
              ))}
          </>
        )}
      </div>
    );
  }
}
