import React from "react";
import LandingPage from "../LandingPage/LandingPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ShoppingList from "../ShoppingList/ShoppingList";
import NavPage from "../NavPage/NavPage";
import NewShoppingList from "../ShoppingList/newShoppingList";
import { ShoppingListData } from "../ShoppingListData";

function App() {
  return (
    <Router>
      <ShoppingListData>
        <main>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/nav" component={NavPage} />
            <Route exact path="/s-list" component={ShoppingList} />
            <Route exact path="/c-list" component={NewShoppingList} />
          </Switch>
        </main>
      </ShoppingListData>
    </Router>
  );
}
export default App;
