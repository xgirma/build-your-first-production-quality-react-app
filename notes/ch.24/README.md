# Delete Data on the Server with fetch

We’ll use fetch to delete items on the server when the client triggers a removal, and update the UI with a success message once the delete operation on the server has succeeded.

Our application handles removing items from the state, but those deletes aren't reflected on the server. If I delete some to dos and then I refresh the browser, those deleted items will come back because they're still persisted on the server.

```javascript
export const destroyTodo = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
}
```

app.js

```javascript
  handleRemove = (id, evt) => {
    evt.preventDefault();
    const updatedTodos = removeTodo(this.state.todos, id)
    this.setState({ todos: updatedTodos })
    destroyTodo(id)
      .then(() => this.showTempMessage('Todo Removed'))
  }
```

