import React from "react";
import NewShoppingList from "./ShoppingList/newShoppingList";
import { ShoppingListData } from "./ShoppingListData";

function App() {
  return (
    <ShoppingListData>
      <NewShoppingList />
    </ShoppingListData>
  );
}
export default App;
