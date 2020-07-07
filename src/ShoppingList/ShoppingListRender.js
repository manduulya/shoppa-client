import React, { Component } from "react";
import AddItemForm from "./ShoppingList/AddItemForm";
import ShoppingList from "./ShoppingList/ShoppingList";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingItems: [{ name: "", checked: false }],
    };
  }

  handleDeleteItem = (item) => {
    const newItems = this.state.shoppingItems.filter((itm) => itm !== item);
    this.setState({
      shoppingItems: newItems,
    });
  };
  handleCheckItem = (item) => {
    const newItems = this.state.shoppingItems.map((itm) => {
      if (itm === item) {
        itm.checked = !itm.checked;
      }
      return itm;
    });
    this.setState({
      shoppingItems: newItems,
    });
  };
  handleAddItem = (itemName) => {
    const newItems = [
      ...this.state.shoppingItems,
      { name: itemName, checked: false },
    ];
    this.setState({
      shoppingItems: newItems,
    });
  };
  render() {
    return (
      <>
        <header>
          <h1>List to buy from Target!</h1>
        </header>
        <main>
          <section>
            <AddItemForm onAddItem={this.handleAddItem} />
          </section>
          <section>
            <ShoppingList
              items={this.state.shoppingItems}
              onDeleteItem={this.handleDeleteItem}
              onCheckItem={this.handleCheckItem}
            />
          </section>
        </main>
      </>
    );
  }
}
