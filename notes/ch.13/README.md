# Pass Data To Event Handlers with Partial Function Application

In this lesson we’ll see how to pass an item’s id value in an event handler and get the state to reflect our change. We’ll also create a helper function that allows us to use partial function application to clean up the event handler code and make it more “functional”

Let's `findById, toggleTodo, updateTodo` wire them up to handle marking todos as complete in our app.

1. :camel: App.js 
````javascript
import { generateId, addTodo, findById, toggleTodo, updateTodo } from "./lib/todoHelpers";

  handleToggle = (id) => {
    const todo = findById(id, this.state.todos)
    const toggled = toggleTodo(todo)
    const updatedTodos = updateTodo(this.state.todos, toggled)

    this.setState({ todos: updatedTodos })
  }

  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit;

    return (
      <div className="App">
        // ...
        <div className="Todo-App">
          // ...
          <TodoList handleToggle={this.handleToggle} todos={this.state.todos}/> // **1**
        </div>
      </div>
    );
  }
````

2. :camel: :camel: TodoList.js
````javascript
export const TodoList = (props) => (
    <div className='Todo-List'>
        <ul>
            {props.todos.map( todo => <TodoItem handleToggle={props.handleToggle} key={todo.id} {...todo}/> )} // **2**
        </ul>
    </div>
);
````

3. :camel: :camel: :camel: TodoItem.js
```javascript
export const TodoItem = (props) => (
    <li>
        <input type="checkbox"
               onChange={props.handleToggle} // **3**
               defaultChecked={props.isComplete}/> {props.name}
    </li>
);
```
We'll define `onChange` and we'll set that to equal `props.handleToggle`. 

The problem here is that `handleToggle` is going to receive an `event` object by default through this `onChange`. We need to do is we actually need to define an `inline function` here, and have that function call `props.handleToggle` parsing in the `id` from the `todo`, which is `props.id`.

The other change we can make here is we can take this `defaultChecked` now that we have an `onChange` handler. We can change this to `checked` and it will update appropriately when `onChange` is called.

```javascript
export const TodoItem = (props) => (
    <li>
        <input type="checkbox"
               onChange={ () => props.handleToggle(props.id) }
               // defaultChecked={props.isComplete}/> {props.name}
               checked={props.isComplete}/> {props.name}
    </li>
);
```

<img width="947" alt="screen shot 2017-12-01 at 2 41 28 am" src="https://user-images.githubusercontent.com/5876481/33479241-3c07c744-d641-11e7-854f-2a3ff4c77ef7.png">

> We're defining this `arrow function inline` for this `onChange handler` because we need to `parse some data onto our handler that's not an event object`. 

This is something we'll need to do a lot in react components that deal with collections of data. Let's refactor this a bit to clean up the .jsx.