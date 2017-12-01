# Update Data in a List without Mutations

We’ll build small, focused functions to select an object from a list, apply updates to an object and replace an item in a list, avoid mutations to those objects along the way by returning new items that reflect our changes. We’ll verify this behavior by following a test driven approach using Jest.

In order to update the `isComplete` status on a todo we need to be able to do a couple of things. First we need to get the existing todo from an array of todos. Then we need to toggle the `isComplete` property on that todo and finally we need to update the list to reflect the change todo item. When we do this we also need to be sure to `avoid mutating` the existing todo object with the original array.

In Jest you can follow the test keyword with `.skip` to keep those tests from being executed.

````javascript
import { addTodo } from './todoHelpers';

test('findById should return the expected item from an array', () => {
  const startTodos = [
    { id: 1, name: 'one', isComplete: false },
    { id: 2, name: 'two', isComplete: false },
    { id: 3, name: 'three', isComplete: false },
  ]

  const expected = { id: 2, name: 'two', isComplete: false }

  const result = findById(2, startTodos)

  expect(result).toEqual(expected)
});

test.skip('toggleTodo should toggle the isComplete prop of a todo', () => {}); // ***
````
`ReferenceError: findById is not defined`

<img width="491" alt="screen shot 2017-12-01 at 12 53 33 am" src="https://user-images.githubusercontent.com/5876481/33475130-20f47e48-d632-11e7-8808-a2747db6d02c.png">

```javascript
import { addTodo, findById } from './todoHelpers'; // ***

test('findById should return the expected item from an array', () => {
  const startTodos = [
    { id: 1, name: 'one', isComplete: false },
    { id: 2, name: 'two', isComplete: false },
    { id: 3, name: 'three', isComplete: false },
  ]

  const expected = { id: 2, name: 'two', isComplete: false }

  const result = findById(2, startTodos)

  expect(result).toEqual(expected)
});
```

`TypeError: (0 , _todoHelpers.findById) is not a function`

<img width="490" alt="screen shot 2017-12-01 at 12 56 25 am" src="https://user-images.githubusercontent.com/5876481/33475227-80ad4d74-d632-11e7-809b-8225897d992d.png">

```javascript
export const addTodo = (list, item) => [...list, item];

export const generateId = () => Math.floor(Math.random()*100000);

export const findById = () => {} // ***
```

`Comparing two different types of values. Expected object but received undefined.`

<img width="614" alt="screen shot 2017-12-01 at 12 59 20 am" src="https://user-images.githubusercontent.com/5876481/33475335-e82cde38-d632-11e7-82cb-d72ffc884475.png">

```javascript
export const findById = (id, list) => list.find(item => item.id === id); // ***
```

We can setup our arguments here with `id` and we'll refer to the ID as list, and for the implementation we can refer to `list.find` just using the build in array method. Then we compare a set of predicate where it's going to receive the item from the list and we're going to compare `item.id` and make sure it equals the passed in `id`.

<img width="324" alt="screen shot 2017-12-01 at 1 01 50 am" src="https://user-images.githubusercontent.com/5876481/33475531-98b1c282-d633-11e7-8ebb-ed85f9924b03.png">

Test
```javascript
test('toggleTodo should toggle the isComplete prop of a todo', () => {
  const startTodo = { id: 2, name: 'two', isComplete: false }

  const expected = { id: 2, name: 'two', isComplete: true }

  const result = toggleTodo(startTodo)

  expect(result).toEqual(expected)
});
```

Helper
```javascript
export const toggleTodo = (todo) => ({...todo, isComplete: !todo.isComplete});
```

As we saw from the way `toggleTodo` is being used in our test, it takes in a single argument that represents a `todo` object. We're going to update this to take in a todo object, and then from my result I'm going to return an object. To get that object, I'm going to `spread the passed in todos` properties into this new object.

I'm going to `overwrite` the `isComplete` with the opposite of the existing `todo.isComplete` property. When I save that, our test will pass.

The other thing we want to ensure is that by doing this `we don't mutate the passed in todo` but we get a brand new object back.

```javascript
test('toggleTodo should not mutate the original todo', () => {
  const startTodo = { id: 2, name: 'two', isComplete: false };

  const result = toggleTodo(startTodo);

  expect(result).not.toBe(startTodo);
});
```

We'll take a look at it and we'll see that all we're doing here is making sure that whatever we get back from `toggleTodo` is not a reference to the same object that was passed in.

```javascript
export const updateTodo = (list, updated) => {
  const updatedIndex = list.findIndex(item => item.id === updated.id)
  console.log('updatedIndex: ', ...list.slice(updatedIndex+1))
  return [
    ...list.slice(0, updatedIndex),
    updated,
    ...list.slice(updatedIndex+1)
  ]
};
```

We're going to return a new array and I'm going to take the existing list with a call to `slice` starting at zero up to the `updatedIndex` (`...list.slice(0, updatedIndex)`). That's going to take all the items before the item that we want to update and `spread` them out into this array followed by the updated item, followed by whatever is left  `...list.slice(updatedIndex+1)` of the array.