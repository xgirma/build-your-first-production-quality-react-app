# Prevent Empty Form Values with Conditional Submit Handlers

We’ll take advantage of the controlled nature of the todo input and the first class nature of javascript functions to dynamically assign the form submission handler. An empty todo will trigger a submission handler that is only concerned with handling an error state, and when the input is valid, the form will use the standard submit handler.

The submit handler for this form is pretty straight forward. We get a new ID, and we create a new todo using the current todo value on the state and we add it to the list. The submit handler does nothing about empty values though, so I can come into the form and I can press enter a bunch of times. It's going to generate todos with no name each time.

```javascript
  handleEmptySubmit(evt){
    evt.preventDefault();
  }
```

If this method gets `called` it means `you're trying to submit an empty todo or a todo without a name`. I'm going to call this.setState and I'm going to add an `error message` to the state. I will just make that say, "Please supply a todo name."

```javascript
  handleEmptySubmit(evt){
    evt.preventDefault();
    this.setState({
      errorMessage: 'Please supply a todo name'
    })
  }
```

Inside the `render` method

``` javascript
render() {
    + const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit; // ***

    return (
      <div className="App">
        <div className="Todo-App">
          <TodoForm
            handleInputChange={this.handleInputChange}
            currentTodo={this.state.currentTodo}
            - handleSubmit={this.handleSubmit} // #f03c15
            + handleSubmit={this.submitHandler}
          />
          <TodoList todos={this.state.todos}/>
        </div>
      </div>
    );
  }
```
