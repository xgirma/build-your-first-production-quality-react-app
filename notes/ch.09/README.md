# Update React Application State from Form Input
Right now, we have no way of submitting our `TodoForm`. Let's wire up the `TodoForm`, along with the `addTodo` function that we have in `todoHelpers` so that we can `submit` the form add new items to our todo list.

app.js
```javascript
import { generateId, addTodo } from "./lib/todoHelpers"; // ***

class App extends Component {
  constructor() {
      super();
      this.state = {
        todos: [
          {id: 1, name: 'Learn JSX', isComplete: true},
          {id: 2, name: 'Build an Awesome App', isComplete: false},
          {id: 3, name: 'Ship It!', isComplete: false},
        ],
        currentTodo: ''
      }
      this.handleInputChange = this.handleInputChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this) // ***
    }

  handleSubmit(evt){ // ***
    evt.preventDefault(); // ***

  }
  
  render() {
      return (
        <div className="App">
          <div className="Todo-App">
            <TodoForm
              handleInputChange={this.handleInputChange}
              currentTodo={this.state.currentTodo}
              handleSubmit={this.handleSubmit} // ***
            />
            <TodoList todos={this.state.todos}/>
          </div>
        </div>
      );
    }
}
```

Handle submit is going to accept an event object as its first argument. I'm going to use that to call `event.preventDefault` and this is going to prevent the form from trying to `submit through a GET`, which would `refresh the page`. 

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
  handleSubmit: PropTypes.func.isRequired // ***
};
```

Generating random number for ID: 

todoHelpers.js
```javascript
export const generateId = () => Math.floor(Math.random()*100000);
```
Now, we'll use our `updatedTodos` to update our application state. We'll call `this.setState`. We'll pass in an object and we'll pass it the todos key with a value of `updatedTodos`. Let's also clear out the input in our form. We'll do that by setting `currentTodo` to an empty string.

```javascript
  handleSubmit(evt){
    evt.preventDefault();
    const newId = generateId();
    const newTodo = { id: newId, name: this.state.currentTodo, isComplete: false }
    const updatedTodos = addTodo(this.state.todos, newTodo)
    this.setState({
      todos: updatedTodos,
      currentTodo: ''
    })
  }
```