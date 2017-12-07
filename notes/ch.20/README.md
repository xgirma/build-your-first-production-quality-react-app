# Load Data From a Server with fetch

We’ll fire up `json-server` so we can run our application against a server. We’ll take advantage of the `fetch polyfill` provided by `create-react-app` and leverage the `componentDidMount` lifecycle event to load our initial todo list. We’ll also add an `error` message to our UI in the case that the server is unavailable.

As it stands, the todos in this app are hard coded into the app's initial state and any changes are maintained in memory and lost when the application reloads. Let's integrate a server API for our todos so we can persist our updates.

        $ npm i --save-dev json-server
        
db.json
```json
{
  "todos": [
    {"id": 1, "name": "Setup Server", "isComplete": true},
    {"id": 2, "name": "Start Server", "isComplete": true},
    {"id": 3, "name": "Connect to Server", "isComplete": true},
    {"id": 4, "name": "Setup fetch", "isComplete": true}
  ]
}
```

        $ ./node_modules/.bin/json-server -p 8080 db.json --watch
  

<img width="480" alt="screen shot 2017-12-06 at 11 10 29 pm" src="https://user-images.githubusercontent.com/5876481/33702962-b9bf8602-dada-11e7-8c63-5da1e4aacd01.png">

        $ curl localhost:8080/todos
        

I'm going to export a function that I'm going to call `loadTodos`, and this function's going to return a call to fetch with our base URL. Fetch is going to return a response object. Since `we want the JSON formatted data` out of that, we're going to call .then, because we're going to get a `promise back`, and that's going to accept a response. We're going to call response.json. That's going to `return another promise` with just the JSON formatted data.

```javascript
const baseUrl = 'http://localhost:8080/todos'

export const loadTodos = () => {
  return fetch(baseUrl)
    .then(res => res.json())
}
```

Since we're going to load our todos from the server, I'm going to `take this initial todos array that was hard coded` and we'll just start with our initial state, having an `empty` todos array.

```javascript
  state = {
    todos: [
      // {id: 1, name: 'Learn JSX', isComplete: true},
      // {id: 2, name: 'Build an Awesome App', isComplete: false},
      // {id: 3, name: 'Ship It!', isComplete: false},
    ],
    currentTodo: ''
  }
```

We want to call our load todos function when our component mounts.

```javascript
  componentDidMount(){
    loadTodos()
      .then(todos => this.setState({todos}))
  }

```

We'll let the browser reload, and our new tasks show up, so we know everything is working.