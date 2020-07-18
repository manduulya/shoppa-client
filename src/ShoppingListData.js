import React from "react";

export const ShoppingListContext = React.createContext({
  shoppingList: {},
  addStore: (name) => {},
  addItem: (store, name) => {},
  setTitle: (title) => {},
  reset: (callBack) => {},
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
  reset = (callBack) => {
    console.log("hi");
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

  addItem = (storeId, item) => {
    const { shoppingList } = this.state;
    // if (!item.id) {
    //   item.id = cuid();
    // }
    if (shoppingList.items[storeId]) {
      shoppingList.items[storeId].push(item);
    } else {
      shoppingList.items[storeId] = [item];
    }
    this.setState({ shoppingList });
  };

  render() {
    const { shoppingList } = this.state;
    console.log(this.state);

    const values = {
      shoppingList,
      addStore: (store) => this.addStore(store),
      addItem: (store, name) => this.addItem(store, name),
      setTitle: (title) => this.setTitle(title),
      reset: (callBack) => this.reset(callBack),
    };

    return (
      <ShoppingListContext.Provider value={values}>
        {this.props.children}
      </ShoppingListContext.Provider>
    );
  }
}
