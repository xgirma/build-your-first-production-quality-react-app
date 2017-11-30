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

```javascript
render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit; // +

    return (
      <div className="App">
        <div className="Todo-App">
          <TodoForm
            handleInputChange={this.handleInputChange}
            currentTodo={this.state.currentTodo}
            // handleSubmit={this.handleSubmit} // -
            handleSubmit={submitHandler} // +
          />
          <TodoList todos={this.state.todos}/>
        </div>
      </div>
    );
  }
```

:honeybee: :honeybee: :honeybee: With that in place I can save the file and we'll take a look at how this works in the browser. Take a look at React DevTools and I'm going to expand this out. I'm going to find my `TodoForm` component. We'll see that it has a `handleSubmit` property that's `bound to handleEmptySubmit`. That's because we have `no value` in here.

<img width="1059" alt="screen shot 2017-11-30 at 12 56 51 am" src="https://user-images.githubusercontent.com/5876481/33422152-8b80ff8a-d569-11e7-96fc-143a7cbb6ff8.png">

:dolphin: :dolphin: :dolphin: As soon as I add a value the binding to `handleSubmit` property becomes `bound to handleSubmit`. That binding will stay put as long as I have content in currentTodo.

<img width="1053" alt="screen shot 2017-11-30 at 12 57 23 am" src="https://user-images.githubusercontent.com/5876481/33422153-8b95e896-d569-11e7-93fe-bc8d68e6dab6.png">

```javascript
import React from 'react';
import {PropTypes} from 'prop-types';

export const TodoForm = (props) => (
  <form onSubmit={props.handleSubmit}> // ***
    <input
      type='text'
      onChange={props.handleInputChange}
      value={props.currentTodo}/>
  </form>
);

TodoForm.propTypes = {
  currentTodo: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};
```

:pig: :pig: :pig: If I go to the form and I try to submit and empty todo, we'll see that our state is updated and it now has the error message that we specified in our `handleEmptySubmit` method.

At page load

<img width="1059" alt="screen shot 2017-11-30 at 12 56 51 am" src="https://user-images.githubusercontent.com/5876481/33422553-ed7dc67c-d56a-11e7-87af-30bdb9e128fb.png">

After trying to enter empty todo

<img width="1081" alt="screen shot 2017-11-30 at 1 07 41 am" src="https://user-images.githubusercontent.com/5876481/33423069-97488380-d56c-11e7-9b7d-651ea77f4e7b.png">

Entering a todo

<img width="1053" alt="screen shot 2017-11-30 at 12 57 23 am" src="https://user-images.githubusercontent.com/5876481/33422554-ed91c528-d56a-11e7-928b-3e5716129625.png">

If that's true I'm just going to use `double ampersand` here, so `if it evaluates to true it will then evaluate the statement that comes after it`.

````javascript
<div className="Todo-App">
  {this.state.errorMessage && <span className='error'>{this.state.errorMessage}</span>} // ***
  <TodoForm
    handleInputChange={this.handleInputChange}
    currentTodo={this.state.currentTodo}
    handleSubmit={submitHandler}
  />
  <TodoList todos={this.state.todos}/>
</div>
````

The only problem with our current setup is once I'm showing an error message and I put in a valid entry and submit it the submission will work, but the error message hangs around.

Solution

```javascript
handleSubmit(evt) {
    evt.preventDefault();
    const newId = generateId();
    const newTodo = { id: newId, name: this.state.currentTodo, isComplete: false }
    const updatedTodos = addTodo(this.state.todos, newTodo)
    this.setState({
      todos: updatedTodos,
      currentTodo: '',
      errorMessage: ''
    })
  }
```

Now an invalid submission will show the error message, but a valid one will add the new value and hide the error message.