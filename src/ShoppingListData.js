import React from "react";

export const ShoppingListContext = React.createContext({
  shoppingList: {},
  addStore: (name) => {},
  addItem: (store, name) => {},
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
    const { shoppingList } = this.state;
    shoppingList.items[store].push(itemName);
    this.setState({ shoppingList });
  }

  render() {
    const { shoppingList } = this.state;

    const values = {
      shoppingList,
      addStore: (name) => this.addStore(name),
      addItem: (store, name) => this.addItem(store, name),
    };

    return (
      <ShoppingListContext.Provider values={values}>
        {this.props.children}
      </ShoppingListContext.Provider>
    );
  }
}
