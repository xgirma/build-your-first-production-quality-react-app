import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { TodoForm, TodoList } from './components/todo/index';
import { generateId, addTodo} from "./lib/todoHelpers";

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
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(evt){
    this.setState({
      currentTodo: evt.target.value
    })
  }

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

  handleEmptySubmit(evt){
    evt.preventDefault();
    this.setState({
      errorMessage: 'Please supply a todo name'
    })
  }

  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit;

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
            handleSubmit={this.handleSubmit}
          />
          <TodoList todos={this.state.todos}/>
        </div>
      </div>
    );
  }
}

export default App;
