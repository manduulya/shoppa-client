import React from "react";

export const ShoppingListContext = React.createContext({
  shoppingList: {},
  addStore: (name) => {},
  addItem: (store, name) => {},
  setTitle: (title) => {},
  reset: (callBack) => {},
  removeItem: (storeId, itemId) => {},
  removeStore: (storeId) => {},
  setId: (id) => {},
});

export class ShoppingListData extends React.Component {
  state = {
    shoppingList: {
      id: null,
      title: "",
      stores: [],
      items: {},
    },
  };

  setTitle = (title) => {
    const { shoppingList } = this.state;
    shoppingList.title = title;
    this.setState({ shoppingList });
  };
  setId = (id) => {
    const { shoppingList } = this.state;
    shoppingList.id = id;
    this.setState({ shoppingList });
  };
  reset = (callBack) => {
    this.setState(
      {
        shoppingList: {
          stores: [],
          items: {},
          title: "",
          id: null,
        },
      },
      callBack
    );
  };
  addStore = (store) => {
    const { shoppingList } = this.state;
    shoppingList.stores.push(store);
    shoppingList.items[store.id] = [];
    this.setState({ shoppingList });
  };
  removeStore = (storeId) => {
    const { shoppingList } = this.state;
    shoppingList.stores = shoppingList.stores.filter((s) => s.id !== storeId);
    delete shoppingList.items[storeId];
    this.setState({ shoppingList });
  };

  addItem = (storeId, item) => {
    const { shoppingList } = this.state;
    if (shoppingList.items[storeId]) {
      shoppingList.items[storeId].push(item);
    } else {
      shoppingList.items[storeId] = [item];
    }
    this.setState({ shoppingList });
  };
  removeItem = (storeId, itemId) => {
    const { shoppingList } = this.state;
    shoppingList.items[storeId] = shoppingList.items[storeId].filter(
      (i) => i.id !== itemId
    );
    this.setState({ shoppingList });
  };

  render() {
    const { shoppingList } = this.state;
    const values = {
      shoppingList,
      addStore: (store) => this.addStore(store),
      addItem: (store, name) => this.addItem(store, name),
      setTitle: (title) => this.setTitle(title),
      reset: (callBack) => this.reset(callBack),
      removeItem: this.removeItem,
      removeStore: this.removeStore,
      setId: (id) => this.setId(id),
    };

    return (
      <ShoppingListContext.Provider value={values}>
        {this.props.children}
      </ShoppingListContext.Provider>
    );
  }
}
