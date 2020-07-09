import React from "react";
// import { ShoppingListContext } from "./AppContext";

export const ShoppingListContext = React.createContext({
  shoppingList: {},
  addStore: (name) => {},
  addItem: (store, name) => {},
  setTitle: (title) => {},
});

export class ShoppingListData extends React.Component {
  state = {
    shoppingList: {
      title: "",
      items: {},
    },
  };
  setTitle(title) {
    const { shoppingList } = this.state;
    shoppingList.title = title;
    this.setState({ shoppingList });
  }
  addStore(storeName) {
    const { shoppingList } = this.state;
    shoppingList.items[storeName] = [];
    this.setState({ shoppingList });
  }

  addItem(store, itemName) {
    console.log(store, itemName);
    const { shoppingList } = this.state;
    shoppingList.items[store].push(itemName);
    this.setState({ shoppingList });
  }

  render() {
    const { shoppingList } = this.state;

    const value = {
      shoppingList,
      addStore: (name) => this.addStore(name),
      addItem: (store, name) => this.addItem(store, name),
      setTitle: (title) => this.setTitle(title),
    };

    return (
      <ShoppingListContext.Provider value={value}>
        {this.props.children}
      </ShoppingListContext.Provider>
    );
  }
}
