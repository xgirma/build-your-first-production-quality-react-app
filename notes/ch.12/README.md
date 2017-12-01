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

test.skip('toggleTodo should toggle the isComplete prop of a todo', () => {});
````
`ReferenceError: findById is not defined`

<img width="491" alt="screen shot 2017-12-01 at 12 53 33 am" src="https://user-images.githubusercontent.com/5876481/33475130-20f47e48-d632-11e7-8808-a2747db6d02c.png">

```javascript
import { addTodo, findById } from './todoHelpers';

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

export const findById = () => {}
```

`Comparing two different types of values. Expected object but received undefined.`

<img width="614" alt="screen shot 2017-12-01 at 12 59 20 am" src="https://user-images.githubusercontent.com/5876481/33475335-e82cde38-d632-11e7-82cb-d72ffc884475.png">

```javascript
export const addTodo = (list, item) => [...list, item];

export const generateId = () => Math.floor(Math.random()*100000);

export const findById = (id, list) => list.find(item => item.id === id )
```

<img width="324" alt="screen shot 2017-12-01 at 1 01 50 am" src="https://user-images.githubusercontent.com/5876481/33475531-98b1c282-d633-11e7-8ebb-ed85f9924b03.png">

