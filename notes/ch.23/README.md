# Update data on the Server with fetch

We’ll use fetch and refactor our client-side task completion logic to send an update to the server, and update the UI with a success message once the save has completed successfully.

We're loading our todos from the JSON server and we're adding new items to the server. But `if we toggle a todo, that change won't be reflected on the server`.

To save changes to existing todos, we'll need to create a new function that makes a `PUT` request to the server. This will look very `similar to the existing createTodo function`, so we'll start by duplicating that.

```javascript
export const saveTodo = (todo) => {
  return fetch(`${baseUrl}/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  }).then(res => res.json())
}
```

Then we find our `handleToggle` method, and we'll do some refactoring.

```javascript
  handleToggle = (id) => {
    // const getUpdatedTodos = pipe(findById, toggleTodo, partial(updateTodo, this.state.todos));
    // const updatedTodos = getUpdatedTodos(id, this.state.todos);
    const getToggledTodo = pipe(findById, toggleTodo);
    const updated = getToggledTodo(id, this.state.todos);
    const getUpdatedTodos = partial(updateTodo, this.state.todos);
    const updatedTodos = getUpdatedTodos(updated);
    this.setState({ todos: updatedTodos })
    saveTodo(updated)
      .then(() => this.showTempmessage('Todo updated'))
  }
```

