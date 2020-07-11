import React from "react";
import { ShoppingListContext } from "../ShoppingListData";

export default class ShoppingList extends React.Component {
  static contextType = ShoppingListContext;
  state = { error: null };

  render() {
    const { title, items } = this.context.shoppingList;
    return (
      <div>
        {this.state.error && "some error message"}
        {this.context.shoppingList && (
          <>
            <h1>{title}</h1>
            {Object.entries(items).map(([store, items]) => (
              <>
                <h2>{store}</h2>
                <ul>
                  {items.map((i) => (
                    <li>i</li>
                  ))}
                </ul>
              </>
            ))}
          </>
        )}
      </div>
    );
  }

  componentDidMount() {
    fetch(`yourserverhost/lists/${this.props.id}`)
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
      .catch((error) => this.setState({ error }));
  }
}
