# Use React Context to Manage Application State Through Routes

We’ll create a `Router component` that will `wrap our application` and `manage all URL related state`. We’ll see how we can use `React’s built in context mechanism` to **pass** `data` and `functions` between components `without having to pass props all the way down through the component tree`.

JSX gives us the ability to specify content in between our component tags and then render that out in our render method using the `children property of props`. To render out children of our link component, we'll just reference `this.props.children`.

Link.js: we want to render hyperlink
```javascript
 import React, { Component } from 'react';
 
 export class Link extends Component {
 
   render () {
     return (
       <div>
         <a href="#">{this.props.children}</a>
       </div>
     )
   }
 }
```

Footer component to put our links. 

```javascript
import React from 'react'
import { Link } from '../router/index'

export const Footer = () => {
  return (
    <div className="Footer">
      <Link to='/'>All</Link>
      <Link to='/active'>Active</Link>
      <Link to='/complete'>Complete</Link>
    </div>
  )
}
```
Now I need to update `Link.js` so that our link component can do something with that to property. I'll start by putting in as the location for the `href`.

```javascript
import React, { Component } from 'react';

export class Link extends Component {

  render () {
    return (
      <div>
        <a href={this.props.to}>{this.props.children}</a>
      </div>
    )
  }
}
```

Now if I click on any of these links, we'll see that the `address bar updates`, but it's also going to do a `full page reload`. For a single page application, that's not what we want. I'm going to change this `href` back to a `hash`.

Now I want to give my component a `click handler` for that link.
 
        1. We'll start by preventing the default link behavior. 
        2. We want the link component to update the browser's address bar and history, 
        3. but we don't want a full page reload. 
        
To do that, we're going to use the `browser's history API`. 

We'll call ***history.pushState**. PushState takes `three arguments`, 

        1. The first is a state object, which we don't need, so we'll pass null. 
        2. The second represents a page title, we'll just use an empty string for now, and 
        3. The third is the location we want to add to the browser's history. For this, we're going to use this.props.to.
        
```javascript
import React, { Component } from 'react';

export class Link extends Component {
  handleClick = (evt) => {
    evt.preventDefault()
    history.pushState(null, '', this.props.to)
  }

  render () {
    return (
      <div>
        <a href='#' onClick={this.handleClick} >{this.props.children}</a>
      </div>
    )
  }
}
```

Failed to compile error

<img width="475" alt="screen shot 2017-12-05 at 3 36 14 am" src="https://user-images.githubusercontent.com/5876481/33605299-f7f0849e-d96d-11e7-8ff1-c484e8e484ba.png">

```javascript
  handleClick = (evt) => {
    evt.preventDefault()
    history.pushState(null, '', this.props.to) // eslint-disable-line
  }
```

<img width="800" alt="screen shot 2017-12-05 at 3 41 35 am" src="https://user-images.githubusercontent.com/5876481/33605356-438bd3a4-d96e-11e7-9d13-4fd2191bf169.png">

```javascript
render () {
    return (
      <div>{
        // eslint-disable-next-line
      }<a href='#' onClick={this.handleClick} >{this.props.children}</a>
      </div>
    )
  }
```