import React from "react";
import { ShoppingListContext } from "../ShoppingListData";
import { Link } from "react-router-dom";

export default class ShoppingList extends React.Component {
  static contextType = ShoppingListContext;
  state = { shoppingList: {} };

  componentDidMount() {
    fetch(`http://localhost:8000/shoppinglist`)
      .then((r) => r.json())
      .then((data) => {
        this.context.setTitle(data.title);
        for (const store of data.stores) {
          const sName = store.name;
          this.context.addStore(sName);
          for (const item of data.items[store.id]) {
            this.context.addItem(sName, item.name);
          }
        }
      })
      .then((data) => {
        this.setState({ shoppingList: data });
      })
      .catch((error) => this.setState({ error }));
  }

  render() {
    const { title, items } = this.context.shoppingList;

    return (
      <div>
        {this.context.shoppingList && (
          <>
            <h1>{title}</h1>
            {Object.entries(items).map(([store, items]) => (
              <>
                <h2>{store}</h2>
                <ul>
                  {items.map((name, i) => (
                    <li key={i}>{name}</li>
                  ))}
                </ul>
                <Link to="/">
                  <button>Back</button>
                </Link>
              </>
            ))}
          </>
        )}
      </div>
    );
  }
}
