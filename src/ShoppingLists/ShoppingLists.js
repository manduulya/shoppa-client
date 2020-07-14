import React from "react";
import { Link } from "react-router-dom";

export default class ShoppingLists extends React.Component {
  state = {
    shoppingLists: [],
  };

  componentDidMount() {
    fetch(`http://localhost:8000/shoppinglists`)
      .then((r) => r.json())
      .then((data) => this.setState({ shoppingLists: data }));
  }
  render() {
    return (
      <ul>
        {" "}
        {this.state.shoppingLists.map((s) => (
          <li key={s.id}>
            <Link to={`/shoppinglist/${s.id}`}>{s.title}</Link>
          </li>
        ))}{" "}
      </ul>
    );
  }
}
