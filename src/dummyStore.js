module.exports = {
  user: [
    {
      id: 1,
      Name: "Mynameis",
      password: "mypassword",
    },
  ],
  shoppingList: [
    {
      title: "",
      items: {},
      stores: [],
    },
  ],
  store: [
    {
      id: 1,
      name: "target",
      shoppingListId: 1,
    },
  ],
  item: [
    {
      id: 1,
      name: "apple",
      store_id: 1,
    },
  ],
};
