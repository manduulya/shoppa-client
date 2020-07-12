import React from "react";
import { ShoppingListContext } from "../ShoppingListData";
import { Link } from "react-router-dom";

export default class ShoppingList extends React.Component {
  static contextType = ShoppingListContext;
  state = { shoppingList: {} };

  componentDidMount() {
    this.context.fetchShoppingList();
    console.log(this.context);
  }

  render() {
    const { title, items } = this.context.shoppingList;
    console.log(this.context.shoppingList);

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
