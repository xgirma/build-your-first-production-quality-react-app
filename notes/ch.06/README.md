# 06. Refactor React Components to be Stateless Functional Components

We’ll continue the refactoring effort and break the remaining pieces of the application into their own stateless functional 
components and see how components can be used within other components.

Creating a `TodoList` stateless-component.

TodoList.js
`````javascript
import React from 'react';

export const TodoList = (props) => (
  <div className='Todo-List'>
    <ul>
      {props.todos.map(todo => <li key={todo.id}>
          <input type="checkbox" defaultChecked={todo.isComplete}/> {todo.name}
        </li>
      )}
    </ul>
  </div>
);
````` 

We're going to use `index.js` to import all of our components and `re-export` them, so they're coming from a single source. 
We'll start with an export and we'll say were going to export `TodoForm` and `TodoList`.

```javascript
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';

export {
  TodoForm,
  TodoList
}
```

app.js
````javascript
import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { TodoForm, TodoList } from './components/todo/index'; // ***

class App extends Component {
  // ...

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">React Todos</h1>
        </header>
        <div className="Todo-App">
          <TodoForm
            handleInputChange={this.handleInputChange}
            currentTodo={this.state.currentTodo}
          />
          <TodoList todos={this.state.todos}/>
        </div>
      </div>
    );
  }
}
````

Let's create a component that represents an `individual todo list` item, so that we can map over that and make this code easier to read.

TodoItem.js
```javascript
import React from 'react';

export const TodoItem = (props) => (
    <li key={props.id}>
        <input type="checkbox" defaultChecked={props.isComplete}/> {props.name}
    </li>
);
```

I need to get my properties from my `TodoList` into the `TodoItem` component. If you remember we reference `props.name` and 
`props.id` to get those `todo` properties. 

```javascript
import React from 'react';
import { TodoItem} from "./TodoItem";

export const TodoList = (props) => (
    <div className='Todo-List'>
        <ul>
            {props.todos.map( todo => (
                <TodoItem 
                    id={todo.id} 
                    isComplete={todo.isComplete}
                    name={todo.name}/>)  // *** bad
            )}
        </ul>
    </div>
);
```
This would work, but it's going to get very verbose. There's a much faster way to do this. :open_mouth: :star: :collision: 
... the `spread operator` :fire: :ok_hand: That's going to take all the properties of `todo` and spread them out and pass them 
into this component as their own individual properties.

`````javascript
import React from 'react';
import { TodoItem} from "./TodoItem";

export const TodoList = (props) => (
    <div className='Todo-List'>
        <ul>
            {props.todos.map( todo => <TodoItem {...todo}/> )}
        </ul>
    </div>
);
`````

When the browser reloads we'll see everything is still working. We haven't broken anything and all of our refactoring 
has been successful. There is one exception though. If I go into the browser and I open up the `DevTools` we're going to see 
that I have a `warning about looping over items without a unique key prop`.

<img width="751" alt="screen shot 2017-11-29 at 1 51 01 am" src="https://user-images.githubusercontent.com/5876481/33368902-d2141684-d4a7-11e7-9ce1-2682c0f5b96c.png">

We took care of that before, but if we go back into our `TodoItem` we'll see that the `key` is on this `li` (`<li key={props.id}>`). 
That worked when the `li` was directly in the `loop`, but because it's in its own component that's not where we want it anymore. 
I'm going to `cut` that out of `TodoItem.js`.

TodoItem.js before cut
```javascript
import React from 'react';

export const TodoItem = (props) => (
    <li key={props.id}> // *** before
        <input type="checkbox" defaultChecked={props.isComplete}/> {props.name}
    </li>
);
````

TodoItem.js after cut
```javascript
import React from 'react';

export const TodoItem = (props) => (
    <li> // after 
        <input type="checkbox" defaultChecked={props.isComplete}/> {props.name}
    </li>
);
```

TodoList.js
````javascript
import React from 'react';
import { TodoItem} from "./TodoItem";

export const TodoList = (props) => (
    <div className='Todo-List'>
        <ul> 
            {props.todos.map( todo => <TodoItem key={todo.id} {...todo}/> )} // *** have key
        </ul>
    </div>
);
````

This time when the browser reloads, the error goes away. :v: :v: :v: