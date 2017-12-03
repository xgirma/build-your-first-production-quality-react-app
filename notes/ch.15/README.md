# Remove Items from a List without Mutations

In this lesson, we’ll add the ability to remove items from our list. We’ll add some css to show a delete link while hovered over an item and handle a click event from the component to remove the corresponding item from the list by its id.

**Test**
```javascript
test('removeTodo should remove an item by id', () => {
  const startTodos = [
    { id: 1, name: 'one', isComplete: false },
    { id: 2, name: 'two', isComplete: false },
    { id: 3, name: 'three', isComplete: false },
  ];
  const targetId = 2;
  const expectedTodos = [
    { id: 1, name: 'one', isComplete: false},
    { id: 3, name: 'three', isComplete: false},
  ];

  const result = removeTodo(startTodos, targetId);

  expect(result).toEqual(expectedTodos)
});

test('removeTodo should not mutate the original array', () => {
  const startTodos = [
    { id: 1, name: 'one', isComplete: false },
    { id: 2, name: 'two', isComplete: false },
    { id: 3, name: 'three', isComplete: false },
  ];
  const targetId = 2;

  const result = removeTodo(startTodos, targetId);

  expect(result).not.toBe(startTodos)
});
```

**removeTodo**
```javascript
export const removeTodo = (list, id) => {
  const removeIndex = list.findIndex(item => item.id === id)
  return [
    ...list.slice(0, removeIndex),
    ...list.slice(removeIndex+1)
  ]
};
```

I'm going to drop down here. I'll add `handleRemove`. I'm going to set that to equal a function that's going to take an `id` and an `event` object.
We're going to call handleRemove from the `onCclickable` link. To `prevent` that link from `updating the address bar`, we'll call `evt.preventDefault();` on the event object.

:sunflower: :dromedary_camel: app.js
```javascript
import {generateId, addTodo, findById, toggleTodo, updateTodo, removeTodo} from "./lib/todoHelpers";

  handleRemove = (id, evt) => {
    evt.preventDefault();
    const updatedTodos = removeTodo(this.state.todos, id)
    this.setState({ todos: updatedTodos })
  }
  
  render() {
      const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit;
  
      return (
        <div className="App">
          <div className="Todo-App">
            <TodoList
              handleToggle={this.handleToggle}
              todos={this.state.todos}
              handleRemove={this.handleRemove} // ***
            />
          </div>
        </div>
      );
    }
```

:sunflower: :dromedary_camel: :dromedary_camel: TodoList.js
```javascript
export const TodoList = (props) => (
    <div className='Todo-List'>
        <ul>
            {props.todos.map( todo => <TodoItem
              handleToggle={props.handleToggle}
              key={todo.id} {...todo}
              handleRemove={props.handleRemove}
            /> )}
        </ul>
    </div>
);
```

Now we can jump into `TodoItem`. Inside the list item, I'm going to create a hyperlink. This will give us something to click on to remove each item.

Because I had to pass the `id` of the `specific item` into `handleRemove`, I'm going to come up here to the top, and I'm going to declare a constant which I'll call `handleRemove`. I'm going to set that to equal a call to partial, which is going to partially apply our `props.handleRemove` function, basically preloading it with `props.id`.

:sunflower: :dromedary_camel: :dromedary_camel: :dromedary_camel: TodoItem.js
```javascript
export const TodoItem = (props) => {
  // const handleToggle = props.handleToggle.bind(null, props.id);
  const handleToggle = partial(props.handleToggle, props.id);
  const handleRemove = partial(props.handleRemove, props.id);

  return (
    <li>

      <span className='delete-item'>
        <a role="button" href="#"
           onClick={handleRemove}>X</a>
      </span>
      <input type="checkbox"
             onChange={ handleToggle }
             defaultChecked={props.isComplete}/> {props.name}
    </li>
  )
};
```

:warning: Warning :warning:

<img width="796" alt="screen shot 2017-12-03 at 1 30 25 am" src="https://user-images.githubusercontent.com/5876481/33524032-a2656864-d7c9-11e7-9b6e-f910ba4ccadd.png">

Solution thread [here](https://github.com/eslint/eslint/issues/7030) : `eslint-disable-line` and `eslint-disable-next-line` are supported in only line comments.

```javascript
export const TodoItem = (props) => {
  // const handleToggle = props.handleToggle.bind(null, props.id);
  const handleToggle = partial(props.handleToggle, props.id);
  const handleRemove = partial(props.handleRemove, props.id);

  return (
    <li>

      <span className='delete-item'>{
        // eslint-disable-next-line 
      }<a role="button" href="#"
           onClick={handleRemove}>X</a>
      </span>
      <input type="checkbox"
             onChange={ handleToggle }
             defaultChecked={props.isComplete}/> {props.name}
    </li>
  )
};
```

Warning is resolved.  