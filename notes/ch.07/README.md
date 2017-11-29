# Validate Component Input with Prop Types in React
React gives us a mechanism called `PropTypes` to ensure that the property values passed into components are of the correct 
type. By ensuring the correct data is passed to our components, we can `avoid potential bugs` and more `confidently share 
components with a team` or as open source libraries.

```javascript
import React from 'react';

export const TodoForm = (props) => (
  <form>
    <input
      type='text'
      onChange={props.handleInputChange}
      value={props.currentTodo}/>
  </form>
);
```

This `TodoForm` component represents a form that we can use to create new todo items. In order for it to function properly, it receives a `prop` that is used to set the `value` of the input. It also receives a `function` as a prop and that's how we pass event information, input change events in this case to its parent component.

If another member of our team wanted to use this component in another part of the application we'd like to be able to ensure they are `passing in the correct props`. Luckily, React has `a mechanism for validating our component input called prop types`. 

The first step in defining prop types for a component is to reference that component and call its prop types property. That's going to be equal to an `object`. This object will have keys that match our property name.

```javascript
import { PropTypes } from 'prop-types';

TodoForm.propTypes = { currentTodo: PropTypes.string}
```

It's important to note when we're referencing prop types off of React to pick the type for our property we want to make sure we use the prop types here with a `capital P`.

```javascript
import React from 'react';

export const TodoForm = (props) => (
  <form>
    <input
      type='text'
      onChange={props.handleInputChange}
      value={props.currentTodo}/>
  </form>
);

TodoForm.propTypes = {
    handleInputChange: React.PropTypes.func,
    currentTodo: React.PropTypes.string
};
```

I'm preventing properties from being passed that are of the wrong data type. Let say we pass `32` for `currentTodo`

<img width="938" alt="screen shot 2017-11-29 at 2 39 31 am" src="https://user-images.githubusercontent.com/5876481/33371190-b93607f6-d4ae-11e7-93e1-540ce17f329f.png">

If you absolutely have to have those properties and in this case we do for this component to do anything want to make sure those things are passed in and not left out.

I can just come in here and I can take on an `isRequired` to any of the properties that I define in prop types. 

```javascript
import { PropTypes } from 'prop-types';

TodoForm.propTypes = { currentTodo: PropTypes.string.isRequired}
```

What if, We'll say we're just not going to pass `currentTodo` at all. When the browser reloads, we'll see the current todo is `marked as required but its value is undefined`.

<img width="1094" alt="screen shot 2017-11-29 at 2 48 03 am" src="https://user-images.githubusercontent.com/5876481/33371506-d17f3930-d4af-11e7-850c-0aa2df7ee3c1.png">

```javascript
import React from 'react';
import { PropTypes } from 'prop-types';

export const TodoForm = (props) => (
  <form>
    <input
      type='text'
      onChange={props.handleInputChange}
      value={props.currentTodo}/>
  </form>
);

TodoForm.propTypes = {
    currentTodo: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired
};
```

`Todoitem` receives an entire `todo` object, so that's going to have `three` properties. 

> 1. `name`, which is going to be a string. We'll save it as required. 

> 2. We're also going to have `isComplete`. That's going to be a `Boolean` value, so we'll specify that with `bool`. `We're not going to make this required because if it's undefined it will default to falsey.`

> 3. We're not using it in the component yet, but we are going to need the ID from the todo, so we'll also accept an ID of type number. We'll say that is required as well.

```javascript
import React from 'react';
import { PropTypes } from 'prop-types';

export const TodoItem = (props) => (
    <li>
        <input type="checkbox" defaultChecked={props.isComplete}/> {props.name}
    </li>
);

TodoItem.propTypes = {
    name: PropTypes.string.isRequired,
    isComplete: PropTypes.bool, // ***
    id: PropTypes.number.isRequired
};
```

:warning: :warning: :warning: For a `Boolean` value we'll give `bool`. We're not going to make a `bool` required because `if it's undefined` it will `default to falsey`. :warning: :warning: :warning: