# Create a Stateless Functional Component for an Input Form
We're going to take the todo form that is currently defined in the app component and place in its own component.

Instead of creating a class that extends component like an App.js, we can define this component as a `plain JavaScript function`.

I'm going to declare constant call todo form and I'll just define this as an arrow function, and our return value will go inside these parenthesis.. `const TodoForm = () => ( // return value );`

TodoForm component: :frog: :cat: stateless functional component :dog: :mouse:
```javascript
import React from 'react';

export const TodoForm = () => (
  <form>
    <input
      type='text'
      onChange={this.handleInputChange}
      value={this.state.currentTodo}/>
  </form>
);
```

App component
```javascript
import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { TodoForm } from "./components/todo/TodoForm"; // ***

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
  }

  handleInputChange(evt){
    this.setState({
      currentTodo: evt.target.value
    })
  }

  render() {
    return (
      <div className="App">
        // ...
        <div className="Todo-App">

          <TodoForm/> // **
          <div className='Todo-List'>
            <ul>
              {this.state.todos.map(todo => <li key={todo.id}>
                  <input type="checkbox" defaultChecked={todo.isComplete}/> {todo.name}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
```

I'm going to save this. When the browser refreshes it's going to show `error` and `warning`. The problem here is that we have some errors that we have to handle.

<img width="599" alt="screen shot 2017-11-28 at 3 36 30 am" src="https://user-images.githubusercontent.com/5876481/33317942-af41fb5e-d3ed-11e7-9d84-371d82333720.png">

If we take a look at DevTools, we'll see that we have this error, `"Cannot read property. Handle input change among defined."`

<img width="743" alt="screen shot 2017-11-28 at 3 39 26 am" src="https://user-images.githubusercontent.com/5876481/33317981-cd515874-d3ed-11e7-984e-4d158a736a4e.png">

This is because when we took that form out of our app component and put it in its own stateless functional component, we lost access to things that were defined on app through `this`. `handleInputChange` still lives in App.js and `this.state` inside this `TodoForm` doesn't exist.

We need to pass data into our component that's defined as a `stateless functional component`. We need to :frog: :cat: pass that down through `props` :dog: :mouse: We're going to update this function to accept a single argument which we'll call props. Then, we're going to update these references to this, we'll say, `props.handleInputChange`, and instead of this.state this will also become props.

```javascript
import React from 'react';

export const TodoForm = (props) => ( // ***
  <form>
    <input
      type='text'
      onChange={props.handleInputChange} // ***
      value={props.currentTodo}/> // ***
  </form>
);
```
 In order for this update to work, I need to pass these props into the todo form component. I'll switch back to App.js and find my todo form tag. I'm going to add a couple of properties in the form of attributes.
 
````javascript
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
  }

  handleInputChange(evt){
    this.setState({
      currentTodo: evt.target.value
    })
  }

  render() {
    return (
      <div className="App">
        // ...
        <div className="Todo-App">

          <TodoForm
            handleInputChange={this.handleInputChange}
            currentTodo={this.state.currentTodo}
          />
         
        </div>
      </div>
    );
  }
}
````

If I come into my React DevTools, I should be able to enter text into the form and see that it updates my application state.