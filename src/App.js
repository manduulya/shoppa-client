// import React from "react";
// import "./App.css";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import LandingPage from "./LandingPage/LandingPage";
// import MyStores from "./MyStores/MyStores";

// function App() {
//   return (
//     <Router>
//       <main className="App">
//         <header className="App-header"></header>
//         <Switch>
//           <Route exact path="/" component={LandingPage} />
//           <Route exact path="/stores" component={MyStores} />
//         </Switch>
//       </main>
//     </Router>
//   );
// }

// export default App;

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
