# Add Data to a List without Mutations

In this lesson, we’ll create a utility function to add items to a list, avoiding mutation by returning a new array. We’ll verify this behavior by creating unit tests with Jest.

Right now, this list of todos is static. 

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
      currentTodo: ''
    }
  }
}
```
In order to start making it a little more dynamic, we need a way to add new todos to the list. For that, we'll create a helper function. Since Create React App comes preconfigured with Jest for testing, we'll build this helper function in a test driven style. Let's start by adding a lib directory under source.

I'm going to add a file to `lib`, which I'll call `todoHelpers.js`, and I'll add a second file to `lib` called `todoHhelpers.test.js`. At the top of the `todoHelpers.test.js` file, I'm going to add an import to add `addTodo` from todo helpers. With that in place, I'm going to jump into the terminal and run npm test to fire up `Jest.` 

todoHelpers.test.js
```javascript
import { addTodo } from './todoHelpers';
```

<img width="500" alt="screen shot 2017-11-29 at 3 40 15 am" src="https://user-images.githubusercontent.com/5876481/33373507-1396a05e-d4b7-11e7-8815-a75849afd4e8.png">

You see that I have a failing test, and that's because my `test suite must contain at least one test`. Let us add some test

```javascript
import { addTodo } from './todoHelpers';

test('addTodo should add the passed todo to the list', () => {
    const startTodo = [
        { id: 1, name: 'one', isComplete: false},
        { id: 2, name: 'two', isComplete: false},
    ]; // arrange 

    const newTodo = { id: 3, name: 'three', isComplete: false}; // arrange 

    const expected = [
        { id: 1, name: 'one', isComplete: false},
        { id: 2, name: 'two', isComplete: false},
        { id: 3, name: 'three', isComplete: false}
    ]; // arrange 

    const result = addTodo(startTodo, newTodo); // act

    expect(result).toEqual(expected); // assert 
});
```

This test file is a pretty standard structure, often referred to as `Arrange`, `Act`, `Assert`.

`Arrange`

If we look at this, we have the Arrange portion of our test where we have a start todos variable that has an array with two todo objects in it, a new todo, which is going to be the object that we're going to try to add to our list. Then a const called expected that represents what we want the list to look like at the end of running add todo.

`Act`

The second section is referred to as Act, and this is where we actually call the code that we're trying to test. Here we're assigning whatever comes out of add todo to result, and we're passing it in start todos and new todo.

`Assert`

Then finally, we have the Assert part of the test, where we actually set our expectation. This is what's going to determine if the test passes or fails.

With our test in place, I'm going to save that, Jest will automatically rerun our test. This time we're going to get a type error because `addTodo` is not a function. Because we haven't defined it yet. 

<img width="506" alt="screen shot 2017-11-29 at 3 50 14 am" src="https://user-images.githubusercontent.com/5876481/33373825-72365ea0-d4b8-11e7-9387-8193f60229eb.png">

Now that our function's defined, we can save the file. 

````javascript
export const addTodo = () => {}
````

:running: Jest will rerun, and we're still failing, but now we're failing for a different reason. We expected an array and we received undefined. We can scroll up a little bit here and we'll see that it actually expected a specific value, and that's based on what we assigned here to expect it.

<img width="1078" alt="screen shot 2017-11-29 at 3 53 19 am" src="https://user-images.githubusercontent.com/5876481/33373925-e1c16bd4-d4b8-11e7-90ee-bb0fe6459f36.png">

So let us make this test pass. :passport_control:

````javascript
export const addTodo = (list, item) => {
    list.push(item);
    return list;
};
````
Save, :running: Jest will rerun. 

<img width="411" alt="screen shot 2017-11-29 at 3 57 41 am" src="https://user-images.githubusercontent.com/5876481/33374084-7d9a837e-d4b9-11e7-8385-2a9ca7277f04.png">

I'm going to go back to todo helper, and I'm going to add a second test. Going to scroll down and I'll paste this in, and we'll see that this test is called add todo `should not mutate` the existing todo array.

````javascript
import { addTodo } from './todoHelpers';

test('addTodo should add the passed todo to the list', () => {
    const startTodo = [
        { id: 1, name: 'one', isComplete: false},
        { id: 2, name: 'two', isComplete: false},
    ];

    const newTodo = { id: 3, name: 'three', isComplete: false};

    const expected = [
        { id: 1, name: 'one', isComplete: false},
        { id: 2, name: 'two', isComplete: false},
        { id: 3, name: 'three', isComplete: false}
    ];

    const result = addTodo(startTodo, newTodo);

    expect(result).toEqual(expected);
});

test('addTodo should not mutate the existing todo array', () => {
    const startTodo = [
        { id: 1, name: 'one', isComplete: false},
        { id: 2, name: 'two', isComplete: false},
    ];

    const newTodo = { id: 3, name: 'three', isComplete: false};

    const result = addTodo(startTodo, newTodo); // ***

    expect(result).not.toBe(startTodo);
});
````

I have the same setup with start todos and new todo and my expected array. I'm calling add todo with the same arguments, getting the result back. But this time `I'm checking to make sure that start todos and result are not referring to the same array`.

<img width="1083" alt="screen shot 2017-11-29 at 4 03 47 am" src="https://user-images.githubusercontent.com/5876481/33374309-6cee83bc-d4ba-11e7-9272-2be578ad2b8a.png">

:trident:`list.push` 

If I save this, we'll see that a test fails, and the problem here is that by calling `list.push` in this function, I'm `mutating the original array`. 

What I need to do is get a new array back that has the items from the first array plus the new object.

:trident: `concat` 

````javascript
export const addTodo = (list, item) => list.concat(item);
````

We can accomplish this by updating our code here, and using concat rather than push. We can just return the result of that, because `concat` will `add the new item into a new array` and return it. I'll save that and now we have two passing tests.

<img width="435" alt="screen shot 2017-11-29 at 4 10 13 am" src="https://user-images.githubusercontent.com/5876481/33374476-3a86b934-d4bb-11e7-94d0-ac9fcc6c7320.png">

If the second assertion changed to `expect(result).toBe(startTodo);` we will get the test fails as shown below. 

<img width="1079" alt="screen shot 2017-11-29 at 4 13 46 am" src="https://user-images.githubusercontent.com/5876481/33374627-cd5be2ca-d4bb-11e7-8aca-987f642cde6a.png">

Now let's say I wanted to change the way I'm doing this. Instead of using concat, I want to use the `spread operator`.

:trident: `spread operator`

```javascript
export const addTodo = (list, item) => [...list, item];
```

I'm just going to do this, and I'm going to say, I want the list, including the new item at the end of the list, and I'll save it. Because my tests pass again, I know that this is a valid replacement that updates my array giving me the new item and also `doesn't mutate` the existing array.