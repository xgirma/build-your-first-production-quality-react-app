# Use React Context to Manage Application State Through Routes

We’ll create a Router component that will wrap our application and manage all URL related state. We’ll see how we can use React’s built in context mechanism to pass data and functions between components without having to pass props all the way down through the component tree.

As it stands, the footer component is using this link component to render the hyperlinks in this app. It also responds to clicks by updating the URL through `history.pushState`.

> This is fine for updating the URL and history, `but without querying the document location, we have no way of knowing what route the app is currently` on in our other components.

> `We should put this information in our application state`, and we should do it `higher up in the component tree`, so it's more accessible to components that need it. For this, we'll create a **streamlined router component**.

Let's start by adding a file called router.js to our router directory. Give it a render method. Render is going to return a `div` that contains `children`, so we'll get that through `this.props.children`.

I also want to `give the router some state`, so we're going to just use **property initializer syntax**, so I can just say state equals and `assign an object at the class level`. 

> The router is going to maintain a **single state property** that represents the `current route`, so we'll just define route on the state object.

:dizzy: `Initially`, we're going to have to calculate our route`, so I'm going to do that in a function I'll call `getCurrentPath`.

        const path = document.location.pathname;

To keep our router simple, we're just going to return `the last segment of the path name`. I'm going to return a call to `path.substring`, and we're going to start that substring at `path.lastIndexOf('/')`.

        const path = document.location.pathname;
        return path.substring(path.lastIndexOf('/'))

:anguished: This was at the state's route property when this `component is loaded`, but `it won't be updated when we click on a link`.

Let's create a method that will `update the route` and `update history.pushState` in this component. 

Update state:

        this.setState({route})
 
Update browser history:
  
        history.pushState(null, '', route)
        
```javascript
import React, { Component } from 'react';

const getCurrentPath = () => {
  const path = document.location.pathname;
  return path.substring(path.lastIndexOf('/'))
}

export class Router extends Component {
  state = {
    route: getCurrentPath()
  }

  handleLinkClick = (route) => {
    this.setState({route})
    history.pushState(null, '', route)
  }

  render () {
    return (<div>{this.props.children}</div>)
  }
}
```

Include `Router` inside `index.js`.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Router } from './components/router/index';

ReactDOM.render(
  <Router>
    <App/>
  </Router>, document.getElementById('root'));
registerServiceWorker();
``` 

Now that we have `router wrapped around our app`, we want to `use it to updated state and call history.pushState` when one of our link components is clicked.

The links are nested in the app inside the footer component, so you might think we would pass the router's handling click method down via props.

There are two problems with this. 

 > One, in a complex app, that could potentially mean passing the same item down many levels. This could mean a lot of maintenance if things need to change.
 
 > The second problem is that, in this setup, app is being placed inside the router through a call to this.props.children. We can't just add props onto the app component in our render function.
 
The way we're going to handle this is through React's context mechanism.

## React's context mechanism

> 1. The first thing we need to do to use context is to expose the types that we want available to our child components.

```javascript
  static childContextTypes = {
    route: PropTypes.string,
    linkHandler: PropTypes.func
  }
```

Now that our types are defined, we need to define `a method that'll actually get these values out of our component`. 

```javascript
  getChildContext() {
    return {
      route: this.state.route,
      linkHandler: this.handleLinkClick
    }
  }
```

Router.js
```javascript
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

const getCurrentPath = () => {
  const path = document.location.pathname;
  return path.substring(path.lastIndexOf('/'))
}

export class Router extends Component {
  state = {
    route: getCurrentPath()
  }

  handleLinkClick = (route) => {
    this.setState({route})
    history.pushState(null, '', route) // eslint-disable-line
  }

  static childContextTypes = {
    route: PropTypes.string,
    linkHandler: PropTypes.func
  }

  getChildContext() {
    return {
      route: this.state.route,
      linkHandler: this.handleLinkClick
    }
  }

  render () {
    return (<div>{this.props.children}</div>)
  }
}
```

Then we want to go into link.js and we want to be able to consume the context in our link component. In order to use context in this component, we're going to come up to the top of the class and we're going to define a static value.

This'll define the keys and their data types, just like the way we expose child context sites from routers. I can actually come to router, and we're going to borrow these, because they're going to be the same exact values.

Link.js
```javascript
  static contextTypes = {
    route: PropTypes.string,
    linkHandler: PropTypes.func
  }
```
This is all we really have to do in order to consume context.

Since `history.pushState` is already taken care of in our `link handler` in the `router` component, I'm going to take that out of there, and instead, I want to call that `link handler` function. To do that, we're going to reference that through `this.context.linkHandler(this.props.to)`.

```javascript
import React, { Component } from 'react';
import { PropTypes } from 'prop-types'

export class Link extends Component {
  static contextTypes = {
    route: PropTypes.string,
    linkHandler: PropTypes.func
  }

  handleClick = (evt) => {
    evt.preventDefault()
    this.context.linkHandler(this.props.to)
  }

  render () {
    const activeClass = this.context.route === this.props.to ? 'active' : ''
    return (
      <div>{
        // eslint-disable-next-line
      }<a href='#'
          className={activeClass}
          onClick={this.handleClick} >{this.props.children}</a>
      </div>
    )
  }
}

Link.propTypes = {
  to: PropTypes.string.isRequired
};
```
