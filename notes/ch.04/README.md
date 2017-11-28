# Synchronize React UI and State with Controlled Components

> In React, our rendered view should be a function of the application state.

This means the `changes to our state should be reflected in the view`. As we see with the checkbox being checked, for todo where true is a complete flag. This `also means the changes that come from user input should be reflected in our state`.

If I type something into this text box, we'll see that displayed in the view, but it isn't tracked in our state anywhere. `We always want our state to be in sync with our view`. Let's go ahead and fix this.

<img width="412" alt="screen shot 2017-11-28 at 2 27 13 am" src="https://user-images.githubusercontent.com/5876481/33316783-0689c56c-d3ea-11e7-9951-19e0b1f95cd6.png">

Let's start by adding another property to our application state. I am going to create a value called "currentTodo."

```javascript
class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [
        {id: 1, name: 'Learn JSX', isComplete: true},
        {id: 2, name: 'Build an Awesome App', isComplete: false},
        {id: 3, name: 'Ship It!', isComplete: false},
      ],
      currentTodo: '' // ***
    }
  }

  render() {
    return (
      <div className="App"> 
        <div className="Todo-App">
          <form>
            <input type='text' value={this.state.currentTodo}/> // ***
          </form>
          // ...
        </div>
      </div>
    );
  }
}
```

Now, when I try to `type` into here, `nothing is going to happen`. That's because my value is set to that `empty string`, and currently, I have no way of changing that. 

<img width="314" alt="screen shot 2017-11-28 at 2 35 51 am" src="https://user-images.githubusercontent.com/5876481/33316784-06a0ea30-d3ea-11e7-942e-222f551e0252.png">

        :blossom: event handler :honeybee: :honeybee:

> In order to allow input, we need to create an `event handler` that can capture the input and assign the value to the `currentTodo` property in the component state.

Let's start by adding a method to the component. I'm going to call that `handleInputChange`. That's going to accept an `event`. It will get the value of the text input by calling `event.target.value`. We want to use this to reassign the `currentTodo` property in our state.

:blossom: event.target.value :honeybee: :honeybee:
        
Call the components, `setState` method and pass in a new value. In order for this method `to update our state`, we have to do two things. 

> 1. First, we need to `reference it in our constructor` and `bind` it to `this`.

`this.handleInputChange = this.handleInputChange.bind(this)` This is to ensure that when we call `this.setState` inside our method, this refers to the `correct context`.

> 2. The second thing we need to do in order for this handle input change method to update our state is to `set it as the handler for the onChange event over input`.

```javascript
class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [
        {id: 1, name: 'Learn JSX', isComplete: true},
        {id: 2, name: 'Build an Awesome App', isComplete: false},
        {id: 3, name: 'Ship It!', isComplete: false},
      ],
      currentTodo: '' // ***
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(evt){ // ***
    this.setState({
      currentTodo: evt.target.value
    })
  }

  render() {
    return (
      <div className="App">
        // ***
        <div className="Todo-App">
          <form>
            <input
              type='text'
              onChange={this.handleInputChange} // ***
              value={this.state.currentTodo}/>
          </form>
          // ...
        </div>
      </div>
    );
  }
}
```

I'm going to open up my `DevTools`. I'm going to the React DevTools. We'll see that `currentTodo` is part of my state.

As I type each character, we're going to see the `currentTodo` in our state down in DevTools gets updated to reflect the current value of our input.

By doing this, `we've ensured that our view as a function of state, keeping the rendered output and the state data in sync`.

<img width="425" alt="screen shot 2017-11-28 at 2 50 44 am" src="https://user-images.githubusercontent.com/5876481/33316785-06b5b9ba-d3ea-11e7-8ed2-b94281d9b2e6.png">

:sushi: our view as a function of state :bread:
     