# 21. Save Data to the Server with fetch

We’ll cover posting new data to the server using fetch and the `POST` http method. We’ll also update the UI with a success message once the save has completed successfully.

By default, `fetch` will issue a `GET` request. In order to post to the server, we'll need to `pass in some options`.

We have to define the `body` of our post or `the content that we want saved` to the server. We need to `stringify` our todo object. We're going to call `JSON.stringify` and pass in our todo.

```javascript
export const createTodo = (todo) => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  }).then(res => res.json())
}
```

I'm going to come down to the `handleSubmit` method. We're adding our todo and updating our state. Now, I want to call create todo. I want to pass that new todo to the server. So we can confirm that this works, I'm going to add .then.

```javascript
handleSubmit = (evt) => {
    evt.preventDefault();
    const newId = generateId();
    const newTodo = { id: newId, name: this.state.currentTodo, isComplete: false }
    const updatedTodos = addTodo(this.state.todos, newTodo)
    this.setState({
      todos: updatedTodos,
      currentTodo: '',
      errorMessage: ''
    })

    createTodo(newTodo)
  }
```