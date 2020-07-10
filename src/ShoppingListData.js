import React from "react";

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
      stores: [],
      items: {},
    },
  };

  setTitle(title) {
    const { shoppingList } = this.state;
    shoppingList.title = title;
    this.setState({ shoppingList });
  }

  addStore(store) {
    // {name: 'the name'}
    if (!store.id) {
      // store.id = cuid();
    }
    const { shoppingList } = this.state;
    shoppingList.stores.push(store);
    shoppingList.items[store.id] = [];

    this.setState({ shoppingList });
  }

  addItem(storeId, item) {
    const { shoppingList } = this.state;
    if (!item.id) {
      // item.id = cuid();
    }
    shoppingList.items[storeId].push(item);
    this.setState({ shoppingList });
  }

  render() {
    const { shoppingList } = this.state;

    const values = {
      shoppingList,
      addStore: (name) => this.addStore(name),
      addItem: (store, name) => this.addItem(store, name),
      setTitle: (title) => this.setTitle(title),
    };

    return (
      <ShoppingListContext.Provider value={values}>
        {this.props.children}
      </ShoppingListContext.Provider>
    );
  }
}
