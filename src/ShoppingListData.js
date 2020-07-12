import React from "react";
import cuid from "cuid";

export const ShoppingListContext = React.createContext({
  shoppingList: {},
  addStore: (name) => {},
  addItem: (store, name) => {},
  setTitle: (title) => {},
  fetchShoppingList: (data) => {},
});

export class ShoppingListData extends React.Component {
  state = {
    shoppingList: {
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

  addStore = (store) => {
    // {name: 'the name'}
    if (!store.id) {
      store.id = cuid();
    }
    const { shoppingList } = this.state;
    shoppingList.stores.push(store);
    shoppingList.items[store.name] = [];

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
    console.log(shoppingList);
    this.setState({ shoppingList });
  };
  fetchShoppingList = () => {
    fetch(`http://localhost:8000/shoppinglist`)
      .then((r) => r.json())
      .then((data) => {
        this.context.setTitle(data.title);
        console.log(data);
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
  };

  render() {
    const { shoppingList } = this.state;

    const values = {
      shoppingList,
      addStore: (store) => this.addStore(store),
      addItem: (store, name) => this.addItem(store, name),
      setTitle: (title) => this.setTitle(title),
      fetchShoppingList: (data) => this.fetchShoppingList(data),
    };

    return (
      <ShoppingListContext.Provider value={values}>
        {this.props.children}
      </ShoppingListContext.Provider>
    );
  }
}
