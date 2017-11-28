# Render a React UI with JSX

I'm going to start by creating a div that I'm going to wrap everything else in, and I want to give this div a class so that I can style it later. And if you notice when we look at the existing code, we have `className` rather than `class` being used as the attribute. And the reason for this is simple -- classes are reserved for JavaScript.

```javascript
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Todos</h1>
        </header>
        <div className="Todo-App">
          <form>
              <input type='text' />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
```


