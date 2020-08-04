import React from "react";
import { Link } from "react-router-dom";
import "./ShoppingLists.css";
import config from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

//removing shopping list from db using fetch DELETE
function removeShoppingListServer(id) {
  return fetch(`${config.API_HOST}shoppinglist/` + id, {
    method: "DELETE",
  });
}

export default class ShoppingLists extends React.Component {
  state = {
    shoppingLists: [],
  };

  //fetching GET request to get the all lists
  componentDidMount() {
    fetch(`${config.API_HOST}shoppinglists`)
      .then((r) => r.json())
      .then((data) => this.setState({ shoppingLists: data }));
  }
  //removing whole shoppingList
  removeShoppingList = (id) => {
    removeShoppingListServer(id).then((r) => {
      if (r.ok) {
        this.setState({
          shoppingLists: this.state.shoppingLists.filter((s) => s.id !== id),
        });
      }
    });
  };
  render() {
    return (
      <section className="shoppingListsContainer">
        <Link to="/c-list">
          <button className="AddButton bottom" title="Create Shopping list">
            +
          </button>
        </Link>
        <main className="ShoppingLists">
          <ul>
            {" "}
            {/*mapping through the shoppinglist and rendering lists*/}
            {this.state.shoppingLists.map((s) => (
              <li key={s.id}>
                <span className="span"></span>
                <Link to={`/shoppinglist/${s.id}`}>{s.title}</Link>
                <button
                  className="deleteListButton"
                  onClick={(e) => {
                    e.preventDefault();
                    this.removeShoppingList(s.id);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </li>
            ))}{" "}
          </ul>
          <Link to="/">
            <button className="backButton">back</button>
          </Link>
        </main>
      </section>
    );
  }
}
