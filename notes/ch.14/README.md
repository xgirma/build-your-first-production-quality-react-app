# Create a Pipe Function to Enable Function Composition

In this lesson, we’ll refactor a series of function calls into a functional pipeline, `making the code more declarative` and removing the need for intermediate variables. Rather than reaching for a utility library, we’ll start by building our own pipe function to gain a clear understanding of `how left-to-right function composition` is accomplished in JavaScript.

```javascript
  handleToggle = (id) => {
    const todo = findById(id, this.state.todos)
    const toggled = toggleTodo(todo)
    const updatedTodos = updateTodo(this.state.todos, toggled)

    this.setState({ todos: updatedTodos })
  }
```

Looking at this `handleToggle` method we can see that `findById` is called and result of that is passed into `toggleTodo`, and then the result of that is passed in as an argument to `updateTodo`. The constants `todo` and `toggled` are basically only there, so we can `ass them` along to the next line and then they're `never used again`.

> It would be nice if we could get rid of these intermediate values, since they're all useful until the next line of code runs.

We could do this by nesting our calls.

:scissors:
```javascript
  handleToggle = (id) => {
    // const todo = 
    const toggled = toggleTodo(findById(id, this.state.todos))
    const updatedTodos = updateTodo(this.state.todos, toggled)

    this.setState({ todos: updatedTodos })
  }
```

:scissors: :scissors:
```javascript
  handleToggle = (id) => {
    // const todo = 
    // const toggled = toggleTodo(findById(id, this.state.todos))
    const updatedTodos = updateTodo(this.state.todos, toggleTodo(findById(id, this.state.todos))

    this.setState({ todos: updatedTodos })
  }
```

```javascript
  handleToggle = (id) => {
    const updatedTodos = updateTodo(this.state.todos, toggleTodo(findById(id, this.state.todos))

    this.setState({ todos: updatedTodos })
  }
```

This works and it essentially allows us to get rid of these other two values. This is `really messy` and as soon as you add a fourth function or a fifth function this is going to get really hard to read.

To accommodate this behavior, but make it much more readable we're going to define a `pipe utility`.  `Pipe is going to let us take the results of one function and pass them in to the next function`.

Test. Then I have two test functions. The first one make sure that I can pass the results of increment to double. Then the other one does the inverse just to make sure that our pipe is going in the order we expect.

```javascript
import { partial, pipe } from './utils';

const inc = (num) => num + 1
const dbl = (num) => num * 2

test('pipe passes the result of inc to dbl', () => {
  const pipline = pipe(inc, dbl);
  const result = pipline(2);
  expect(result).toBe(6)
})

test('pipe passes the result of dbl to inc', () => {
  const pipline = pipe(dbl, inc);
  const result = pipline(2);
  expect(result).toBe(5)
})
```

Let's take another look at our test to see how we want to define pipe. If we look at our test in both cases we're calling pipe, `we're passing it two functions, and we're getting back another function` that we're calling later with an argument.

```javascript
export const pipe = (f, g) => (...args) => {}
```
Let's start defining our pipe function. In pipe the first two arguments are going to be a function `f` and a function which we'll just call `g`. That needs to return another function, so that's going to look something like this `(...args)`. That second function is going to take our arguments `whatever` that is.

```javascript
export const pipe = (f, g) => (...args) => g(f(...args));
```

In this case I'm going to just use the `rest operator` to take whatever arguments are passed in and wrap them up in an array called `args`. Now we need to get a result. A result is going to take our first function and it's going to call that first function with whatever arguments we have.

I'll use the `spread operator` to break that back out into a list of arguments. Then it needs to pass that result into our second function which in this case we're calling `g`. We'll do that by wrapping the results of `f` with the arguments in a call to `g`.

A new test, to verify that pipe works with more than two functions.

```javascript
import { partial, pipe } from './utils';

const add = (a, b) => a + b;
const addThree = (a, b, c) => a + b + c;

const inc = (num) => num + 1
const dbl = (num) => num * 2

test('pipe works with more than 2 functions', () => {
  const pipeline = pipe(add, inc, dbl, inc); // inc(dbl(inc(add(1,2))))
  const result = pipeline(1,2)
  expect(result).toBe(9)
})
```
Now, if I save this our test will fail, but the interesting thing to note here is that we expected nine and the result was four.

<img width="493" alt="screen shot 2017-12-02 at 3 35 32 am" src="https://user-images.githubusercontent.com/5876481/33515019-e9fa314a-d711-11e7-9850-6ccfaeae3703.png">

We did get a result back. The problem is that pipe took the first two functions (`pipe(add, inc);`) and `ignored the second two`, so let's fix that. The existing pipe function isn't exactly what we need, but it's useful.

```javascript
const _pipe = (f, g) => (...args) => g(f(...args));

export const pipe = (...fns) => fns.reduce(_pipe);
```
I'm just going to rename this to be `_pipe` so that we can use it inside of utils.js but we're `not going to export it`. Then we're going to replace that with a new `pipe` function, so export `const pipe`, and then we'll define that.

Pipe is going to `take in a list of functions` and instead of two specific functions now it's going to be a `variable length`. I'm going to use the `rest operator` to take in functions and wrap them up in an array we'll call functions.

:flags: **reduce**

Now, `we have an array of functions and we need to return a single function`. The way you take an array of anything and return a singular item is using `reduce`. I'm going to call `functions.reduce` and then I'm going to pass in our internal `_pipe function`.

By calling `reduce` without an initial value, it's going to take the first two items in our functions array, pass them to `_pipe` and pipe those together and return a function. Then it can take the next one along with the returned function from the first call `_pipe`, pass those into pipe and put them together.

It will go on and on until it runs out of functions returning a single function at the end that's just waiting to receive arguments at which point it will execute and pipe the values all the way through those functions.

All test passed. :clap:

Now let us update `handleToggle`

before
```javascript
  handleToggle = (id) => {
    const todo = findById(id, this.state.todos)
    const toggled = toggleTodo(todo)
    const updatedTodos = updateTodo(this.state.todos, toggled)

    this.setState({ todos: updatedTodos })
  }
```

after with pipe
```javascript
  handleToggle = (id) => {
    const getUpdatedTodos = pipe(findById, toggleTodo, partial(updateTodo, this.state.todos));
    const updatedTodos = getUpdatedTodos(id, this.state.todos);
    this.setState({ todos: updatedTodos })
  }
```
