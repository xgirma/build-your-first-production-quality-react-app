# Keep Application State in Sync with Browser History

Using pushState and passing route data via context allows our application to respond to route changes made from Link components, but `using the back and forward buttons in the browser doesn’t update the application state` as we would expect. In this lesson, we’ll add event handling to our Router component to handle history popState events so routing behavior is maintained for the `back` and `forward` buttons.

Let's take a look at our `router component` and see why that is. 

We'll see that `the only time we set the RouteState property is on this handle link click`. That's only going to `happen when we click` on one of the links in the footer.

```javascript
  handleLinkClick = (route) => {
    this.setState({route})
    history.pushState(null, '', route) // eslint-disable-line
  }
```

In order to update the state when the `Back` and `Forward` buttons are used, we'll need to `register an event handler` for the `onpopstate event`. We'll do this in the **componentDidMount** life cycle method.

All I want to do here is I want to `redefine our route`, I'll use `this.setState`. Passing it the `route` key. Then, I need to `get the current location`, I'm going to use the `getCurrentPath` function that we have for our initial state.

```javascript
  componentDidMount() {
    // this will fire every time we use the Back and Forward button
    window.onpopstate = () => {
      this.setState({
        route: getCurrentPath()
      })
    }
  }
```

Everything works !!!