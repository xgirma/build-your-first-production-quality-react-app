# Use ES2016 Property Initializer Syntax in ES6 classes

Create react app provides support for es2016 property initializer syntax out of the box. In this lesson, we’ll refactor the App component to use property initializers and look at the advantages of this syntax.

In this component, we're `using the constructor to define this application's initial state`. We're also binding the custom methods that we've defined to this, ensuring that those methods have the correct context when reading state and calling `set state for updates`.

These binding statements are a bit `redundant`.

```javascript
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEmptySubmit = this.handleEmptySubmit.bind(this)
```

Let's convert the code in this constructor into `property initializers`.

I'm going to start by grabbing the entire initial state object, and cutting that, and putting it above the constructor. I'm going to `remove the reference to this`.

> With property initializer syntax, `state is now an instance property of this class just like it was before`, and it's still `available as this.state` in this component's methods.

Let's take a look at these method `bindings`. Each one of these is `simply binding this to the method so that we have access to this.setState` and `this.state within those methods`.

If we `initialize these methods` (i.e. handleInputChange, handleSubmit, handleEmptySubmit) `as properties`, then `we don't need to add this extra binding`. For this, all we have to do is update each of these to equal an `arrow function`.

````javascript
class App extends Component {
  state = {
    todos: [
      {id: 1, name: 'Learn JSX', isComplete: true},
      {id: 2, name: 'Build an Awesome App', isComplete: false},
      {id: 3, name: 'Ship It!', isComplete: false},
    ],
    currentTodo: ''
  }

  constructor() { // ****
    super();
  }

  handleInputChange = (evt) => {
    this.setState({
      currentTodo: evt.target.value
    })
  }

  handleSubmit = (evt) => {
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

  handleEmptySubmit = (evt) => {
    evt.preventDefault();
    this.setState({
      errorMessage: 'Please supply a todo name'
    })
  }

  render() {}
}
````

If I save this, and without the browser reload, we can come over here and I'm going to open up the dev tools. We'll see in the console that there's a warning that we have a useless constructor.

<img width="697" alt="screen shot 2017-11-30 at 1 48 14 am" src="https://user-images.githubusercontent.com/5876481/33424465-c93449f2-d570-11e7-8c2a-bce1aa4b346e.png">

We can just go in here and we can take the constructor out, because we're no longer doing anything unique to our component limit.

````javascript
class App extends Component {
  state = {
    todos: [
      {id: 1, name: 'Learn JSX', isComplete: true},
      {id: 2, name: 'Build an Awesome App', isComplete: false},
      {id: 3, name: 'Ship It!', isComplete: false},
    ],
    currentTodo: ''
  }

  handleInputChange = (evt) => {
    this.setState({
      currentTodo: evt.target.value
    })
  }

  handleSubmit = (evt) => {
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

  handleEmptySubmit = (evt) => {
    evt.preventDefault();
    this.setState({
      errorMessage: 'Please supply a todo name'
    })
  }

  render() {}
}
````

We can save that again. When the browser reloads the useless constructor warning goes away.