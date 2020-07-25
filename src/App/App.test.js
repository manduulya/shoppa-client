import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage";
import Store from "../MyStores/Store";
import NavPage from "../NavPage/NavPage";
import Item from "../ShoppingList/Item";
import NewShoppingList from "../ShoppingList/newShoppingList";
import ShoppingList from "../ShoppingList/ShoppingList";
import { ShoppingListData } from "../ShoppingListData";
import ShoppingLists from "../ShoppingLists/ShoppingLists";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <LandingPage />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Store key={1} id={2} name={"name"} items={[]} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <NavPage />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Item />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <ShoppingListData>
      <BrowserRouter>
        <NewShoppingList stores={[{}]} />
      </BrowserRouter>
    </ShoppingListData>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <ShoppingList />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <ShoppingLists />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
