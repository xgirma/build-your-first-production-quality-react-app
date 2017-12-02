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

> We're defining this `arrow function inline` for this `onChange handler` (onChange={ () => props.handleToggle(props.id) }) because we need to `parse some data onto our handler that's not an event object`. 

This is something we'll need to do a lot in react components that deal with collections of data. Let's refactor this a bit to clean up the .jsx.

```javascript
export const TodoItem = (props) => {
  const handleToggle = () => props.handleToggle(props.id); // ***
  
  return (
    <li>
      <input type="checkbox"
             onChange={ handleToggle } // ***
             defaultChecked={props.isComplete}/> {props.name}
    </li>
  )
};
```

> We can take this one step further getting rid of this arrow function altogether. Instead using `bind` to partially apply this function. I'm going to call `props.handleToggle.bind`. My first argument is going to be `null`, because I'm not interested in `resetting the context`. My second argument will be `props.id`. This means `handleToggle` is now equal to a function that already knows what its `first argument's value` is, which is the `id` todo for this particular item.

```javascript
export const TodoItem = (props) => {
  const handleToggle = props.handleToggle.bind(null, props.id); // ***

  return (
    <li>
      <input type="checkbox"
             onChange={ handleToggle }
             defaultChecked={props.isComplete}/> {props.name}
    </li>
  )
};
```

Having the ability to partially apply a function through bind is great, but we're going to use this in multiple places. Let's wrap this up in a `utility function` that cleans this up even more.

```javascript
import {partial } from './utils';

const add = (a, b) => a + b;

test('partial applies the first argument ahead of time', () => {
  const inc = partial(add, 1);
  const result = inc(2);
  expect(result).toBe(3);
});
```

The test defines a constant called `inc` which is a function that's the result of partially applying add with the first argument `1`. We define the result which is a call to that `inc` function, parsing it `2`, and we expect the return result to be `3`, because that first argument in this case, `A` should already be equal to `1`. We set our expectation that we expect the result to be `3`.

```javascript
export const partial = (fn, ...args) => {};
```

First, we'll define our arguments. If you remember from the test we're parsing `Add` from the `first argument` which is our `function`. We're going to make this generic. We're going to use `fn` to represent our function and we're parsing our argument.

:rocket: rest operator :speedboat:

We want to be able to accept multiple arguments. What I am going to do is I'm going to use the `Rest operator` here, which is going to take `a comma separated list of arguments` or the rest of the arguments, anything that comes after that first one, and it's going to `bundle them up in an array`.

```javascript
export const partial = (fn, ...args) => fn.bind(null, ...args);
```

:airplane: spread operator :sailboat:

I'm going to reference that function, I'm going to call `Bind` on it. I'm going to pass it `null`, because I `don't want to change its contacts`. I need to pass those arguments into Bind. Bind takes its arguments as a comma separated list. We're going to use `...` again, but this time, it's the `spread operator`. 

These (`(fn, ...args)` `(null, ...args)`) look the same but they're serving two different purposes. `(fn, ...args)` is going to take multiple arguments turn them into an array. On the other side, `(null, ...args)`, we're going to spread that array back out as arguments parsed into Bind. 

This means we can partially apply functions with as many arguments as we want and call it later with additional arguments or without and it'll run as expected.

Let's go back to the `TodoItem` component and use newly created `partial` utility.

````javascript
import { partial } from '../../lib/utils';

export const TodoItem = (props) => {
  // const handleToggle = props.handleToggle.bind(null, props.id);
  const handleToggle = partial(props.handleToggle, props.id); // ***

  return (
    <li>
      <input type="checkbox"
             onChange={ handleToggle }
             defaultChecked={props.isComplete}/> {props.name}
    </li>
  )
};
````

