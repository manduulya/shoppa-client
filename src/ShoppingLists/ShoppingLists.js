import React from "react";
import { Link } from "react-router-dom";
import "./ShoppingLists.css";
import config from "../config";

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
  render() {
    return (
      <section className="shoppingListsContainer">
        <main className="ShoppingLists">
          <ul>
            {" "}
            {/*mapping through the shoppinglist and rendering lists*/}
            {this.state.shoppingLists.map((s) => (
              <li key={s.id}>
                <Link to={`/shoppinglist/${s.id}`}>{s.title}</Link>
              </li>
            ))}{" "}
          </ul>
          <Link to="/nav">
            <button>back</button>
          </Link>
        </main>
      </section>
    );
  }
}
