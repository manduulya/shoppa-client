import React from "react";
import LandingPage from "../LandingPage/LandingPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ShoppingLists from "../ShoppingLists/ShoppingLists";
import NavPage from "../NavPage/NavPage";
import NewShoppingList from "../ShoppingList/newShoppingList";
import { ShoppingListData } from "../ShoppingListData";
import ShoppingList from "../ShoppingList/ShoppingList";
import "./App.css";

function App() {
  return (
    <Router>
      {/*React context wrapper*/}
      <ShoppingListData>
        <main>
          {/*Switch between pages*/}
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/nav" component={NavPage} />
            <Route exact path="/s-list" component={ShoppingLists} />
            <Route exact path="/c-list" component={NewShoppingList} />
            <Route
              exact
              path="/shoppinglist/:id"
              render={(r) => <ShoppingList id={r.match.params.id} />}
            />
          </Switch>
        </main>
      </ShoppingListData>
    </Router>
  );
}
export default App;
