# Filter Data on Property Values

We want to be able to show only items in a certain status so in this lesson, we’ll add a flag to indicate which items to show, and create a function to filter the todos based on that value. We’ll take advantage of route based state to control the filtering behavior.

I've created three tests for a function called `filterTodos`. We'll use these to create a function that `takes in a route value and returns a filtered to do list based on the route`.

```javascript
 test('filterTodos should return all items for the root route', () => {
   const startTodos = [
     {id: 1, name: 'one', isComplete: false},
     {id: 2, name: 'two', isComplete: true},
     {id: 3, name: 'three', isComplete: false}
   ]
 
   const result = filterTodos(startTodos, '/')
 
   expect(result).toEqual(startTodos)
 })
 
 test('filterTodos should return only completed items for the complete route', () => {
   const startTodos = [
     {id: 1, name: 'one', isComplete: false},
     {id: 2, name: 'two', isComplete: true},
     {id: 3, name: 'three', isComplete: false}
   ]
 
   const exepected = [
     {id: 2, name: 'two', isComplete: true}
   ]
 
   const result = filterTodos(startTodos, '/complete')
 
   expect(result).toEqual(exepected)
 })
 
 test('filterTodos should return only incompleted items for the active route', () => {
   const startTodos = [
     {id: 1, name: 'one', isComplete: false},
     {id: 2, name: 'two', isComplete: true},
     {id: 3, name: 'three', isComplete: false}
   ]
 
   const exepected = [
     {id: 1, name: 'one', isComplete: false},
     {id: 3, name: 'three', isComplete: false}
   ]
 
   const result = filterTodos(startTodos, '/active')
 
   expect(result).toEqual(exepected)
 })
```

<img width="667" alt="screen shot 2017-12-06 at 9 08 51 pm" src="https://user-images.githubusercontent.com/5876481/33699740-cbb1c066-dac9-11e7-8e2b-5f65da833289.png">

That should be all we need.

In order to use the filter function, we need `access to our route`. That route is going to `come from our context`, because it belongs to the router component that's surrounding our entire app.

I'm going to add a static value called context types. I'm going to set that to equal an object. I'm going to say that I want to be able to get the route and context. That is of type react.proptypes.string. That'll give me access to the route through context.

```javascript
  static contextTypes = {
    route: PropTypes.string
  }
```
 I'm going to scroll down to the `render` method. Above the return, I'm going to add a new constant. I'm going to call it `displayTodos`. I'm going to set that to equal a call to `filterTodos`.
 
