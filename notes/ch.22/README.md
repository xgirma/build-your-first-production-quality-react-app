# Show Temporary Messages in a React Application

We’ll add a message object to the application state and use that message to conditionally show a message component. We’ll also use a setTimeout to update our state and hide the message after a specified period of time.

When an item is added to our todos, we're performing an optimistic UI update, meaning we're updating the todos in our state without waiting for a response from a server. This gives us a responsive UI, but it would be nice to have some kind of confirmation that our save was successful.

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
      .then(() => this.setState({message: 'Todo added.'}))
  }
```

I'm going to say, if our message is defined then we'll render out a span with a class name of success, and its content will be `this.state.message`.

```javascript
<div className="Todo-App">
  {this.state.errorMessage && <span className='error'>{this.state.errorMessage}</span>}
  {this.state.message && <span className='success'>{this.state.message}</span>}
  <TodoForm
    handleInputChange={this.handleInputChange}
    currentTodo={this.state.currentTodo}
    handleSubmit={submitHandler}
  />
  <TodoList
    handleToggle={this.handleToggle}
    // todos={this.state.todos}
    todos={displayTodos}
    handleRemove={this.handleRemove}
  />
  <Footer/>
</div>
```

The problem with this is that message is going to `sit there and it won't go away`.

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
      .then(() => this.showTempMessage('Todo added.'))
  }

  showTempMessage = (msg) => {
    this.setState({message: msg})
    setTimeout(() => this.setState({message: ''}), 2500)
  }
```
