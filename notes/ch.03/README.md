# Render a React UI Based on Initial State

Right now, the `App` component is rendering `static output`. In order to `render todos dynamically`, we need to give our component `state`. We'll start by `adding a constructor` to the add component class.

> I'll start by adding the constructor keyword at the top of the class, and then inside my constructor, I want to `call Super` to make sure that the constructor for the component class that we're `extending is called`.

Now, I can define the state for this component. I'm going to start with `this.state`. Then, I'm going to set that to equal an empty object. `The state object will contain whatever data structures or components needs to render properly`. In our case, this is going to includes a list of todos. I'm going to start by giving this a todos property.

I'm going to set that to equal an array. This array is going to be a list of objects, each object representing a todo. Each todo is going to have an ID or make that a number. It also going to have a name, which will be a string and I'll give it an is complete `flag` that will be a Boolean.


```javascript
import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            todos: [
                {id: 1, name: 'Learn JSX', isComplete: false},
                {id: 2, name: 'Build an Awesome App', isComplete: false},
                {id: 3, name: 'Ship It!', isComplete: false},
            ]
        }
    }

    render() {
        return (
            // ...
        );
    }
}                                           

export default App;
```

Now, I have three todos ready to go. Saving this will update the browser and we won't see any change, because we haven't actually updated the render. What we can do though is open up our `Chrome DevTools`. You'll see in my DevTools I have this `React tab`.

<img width="643" alt="screen shot 2017-11-28 at 1 46 26 am" src="https://user-images.githubusercontent.com/5876481/33312924-0d7c1886-d3de-11e7-95f2-5756ec8399a2.png">

Now, I want to update my component to render based on the state, rather than just rendering static todos. 

I'll do that `using curly braces` to separate my new JavaScript from the surrounding JSX with `this.state. todos`. For each todo, I want to return the JSX that's going to represent what we had in our static markup, which is a list item with an input and a name of our todo and in order to do that `I can use a map`. The map function will take its own function that will get a `todo`.

```javascript
import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            todos: [
                {id: 1, name: 'Learn JSX', isComplete: false},
                {id: 2, name: 'Build an Awesome App', isComplete: false},
                {id: 3, name: 'Ship It!', isComplete: false},
            ]
        }
    }

    render() {
        return (
            <div className="App">
                // ...
                <div className="Todo-App">
                    <form>
                        <input type='text'/>
                    </form>
                    <div className='Todo-List'>
                        <ul>
                            {this.state.todos.map(
                                todo => <li><input type="checkbox"/> {todo.name} </li>
                            )} // ***
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}                                           

export default App;
```

I brought my DevTools back up. I'll see over here I have some `errors` and some `warnings`. Let's go into the console and see what's going on. `The warning here is that each child in an array or iterator should have a unique key prop`.

> `iterator should have a unique key prop`. This is going to help react when it does its stiffing and Virtual DOM updates to perform better.

<img width="747" alt="screen shot 2017-11-28 at 1 52 57 am" src="https://user-images.githubusercontent.com/5876481/33313209-e7e91762-d3de-11e7-815f-c4b838e81c17.png">

What we need to is go into where we're creating our multiple LIs and give each LI a key property and it has to have a `unique value`. In this case, I'm just going to use `todo.id` and we'll save that. We'll see our warning goes away.

```html
<ul>     
    {this.state.todos.map(
        todo => <li key={todo.id}><input type="checkbox"/> {todo.name} </li> 
    )}   
</ul>    
```
The other crucial part of our todo is the is `completed flag`. Right now, `we're rendering a checkbox, but we're not checking or unchecking the box based on that is complete flag`. I'm going to jump back into the code and up the top of my class I'm going to update this `first item to be true`.

Now, I want to set my inputs check state based on the todos is complete flag. I'm just going to come in here and I'm going to say `checked= and in curly braces`, I'm going to say `todo.iscomplete`. I'm going to save that.

```javascript
import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [
        {id: 1, name: 'Learn JSX', isComplete: true}, // ***
        {id: 2, name: 'Build an Awesome App', isComplete: false},
        {id: 3, name: 'Ship It!', isComplete: false},
      ]
    }
  }

  render() {
    return (
      <div className="App">
        // ***
        <div className="Todo-App">
          <form>
            <input type='text'/>
          </form>
          <div className='Todo-List'>
            <ul>
              {this.state.todos.map(todo => <li key={todo.id}>
                  <input type="checkbox" checked={todo.isComplete}/> {todo.name} // ***
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
We'll see that our first item is now checked, but if we look at our `DevTools`, we have a `warning`. The warning is telling us that `we provided a checked property on a form without an onchange handler`. 

<img width="687" alt="screen shot 2017-11-28 at 2 08 49 am" src="https://user-images.githubusercontent.com/5876481/33313980-20151e22-d3e1-11e7-8475-edab45fb0a15.png">

At the moment, we don't have an onchange handler. The way we can get rid of this warning is to change that checked property to default checked (`defaultChecked`).

```html
{this.state.todos.map(todo => <li key={todo.id}>
  <input type="checkbox" defaultChecked={todo.isComplete}/> {todo.name}
</li>
)}
```