# Build your first production quality React app

Based on [Andrew Van Slaars course on egghead.io](https://egghead.io/courses/build-your-first-production-quality-react-app)

Github link [todo-react-egghead](https://github.com/uuzaix/todo-react-egghead)

## Content
[01. Bootstrap a React Application through the CLI with Create React App](https://github.com/xgirma/build-your-first-production-quality-react-app/tree/ch.01)

We’ll go from an empty directory to a solid foundation for an application by running a single command. The create-react-app tool handles all of the complicated setup for us so we can focus on building our application.

[02. Render a React UI with JSX](https://github.com/xgirma/build-your-first-production-quality-react-app/tree/ch.02)

We’ll dive right into JSX by rendering a static version of what our application will look like. We’ll cover the basic syntax of JSX and point out where it differs from html.

[03. Render a React UI Based on Initial State](https://github.com/xgirma/build-your-first-production-quality-react-app/tree/ch.03)

We’ll define a simple state object in the constructor of the App Component class. Once the state has been defined, we’ll replace the static elements in our rendered output with values from the component’s state. We’ll move from static items to an array, seeing how we can use functions like map to render our UI.

[04. Synchronize React UI and State with Controlled Components](https://github.com/xgirma/build-your-first-production-quality-react-app/tree/ch.04)

We’ll make the input field a “controlled component” by reacting to each change of the input and capturing it in the component state. Following this model gives us assurance that the UI is always a representation of the current application state.

[05. Create a Stateless Functional Component for an Input Form](https://github.com/xgirma/build-your-first-production-quality-react-app/tree/ch.05)

We’ll refactor our existing code, making the todo form a separate component. We’ll pass values from the App container into the new component via props. We’ll look at the differences between state and props in React and see how state can be passed down to other components as props.

[06. Refactor React Components to be Stateless Functional Components](https://github.com/xgirma/build-your-first-production-quality-react-app/tree/ch.06)

We’ll continue the refactoring effort and break the remaining pieces of the application into their own stateless functional components and see how components can be used within other components.

[07. Validate Component Input with Prop Types in React](https://github.com/xgirma/build-your-first-production-quality-react-app/tree/ch.07)

React gives us a mechanism called PropTypes to ensure that the property values passed into components are of the correct type. By ensuring the correct data is passed to our components, we can avoid potential bugs and more confidently share components with a team or as open source libraries.

[08. Add Data to a List without Mutations](https://github.com/xgirma/build-your-first-production-quality-react-app/tree/ch.08)

In this lesson, we’ll create a utility function to add items to a list, avoiding mutation by returning a new array. We’ll verify this behavior by creating unit tests with Jest.

[09. Update React Application State from Form Input](https://github.com/xgirma/build-your-first-production-quality-react-app/tree/ch.09)

We’ll add a handler to the form so we can take new input and use it to update the application state. We’ll append new items to the list with the AddTodo function and replace the todos list in state. We’ll also clear out our form so it can accept new todos.

[10. Prevent Empty Form Values with Conditional Submit Handlers](https://github.com/xgirma/build-your-first-production-quality-react-app/tree/ch.10)

We’ll take advantage of the controlled nature of the todo input and the first class nature of javascript functions to dynamically assign the form submission handler. An empty todo will trigger a submission handler that is only concerned with handling an error state, and when the input is valid, the form will use the standard submit handler.

[11. Use ES2016 Property Initializer Syntax in ES6 classes](https://github.com/xgirma/build-your-first-production-quality-react-app/tree/ch.11)

Create react app provides support for es2016 property initializer syntax out of the box. In this lesson, we’ll refactor the App component to use property initializers and look at the advantages of this syntax.

[12. Update Data in a List without Mutations](https://github.com/xgirma/build-your-first-production-quality-react-app/tree/ch.12)

We’ll build small, focused functions to select an object from a list, apply updates to an object and replace an item in a list, avoid mutations to those objects along the way by returning new items that reflect our changes. We’ll verify this behavior by following a test driven approach using Jest.

[13. Pass Data To Event Handlers with Partial Function Application](https://github.com/xgirma/build-your-first-production-quality-react-app/tree/ch.13)

In this lesson we’ll see how to pass an item’s id value in an event handler and get the state to reflect our change. We’ll also create a helper function that allows us to use partial function application to clean up the event handler code and make it more “functional”

[14. Create a Pipe Function to Enable Function Composition](https://github.com/xgirma/build-your-first-production-quality-react-app/tree/ch.14)

In this lesson, we’ll refactor a series of function calls into a functional pipeline, `making the code more declarative` and removing the need for intermediate variables. Rather than reaching for a utility library, we’ll start by building our own pipe function to gain a clear understanding of `how left-to-right function composition` is accomplished in JavaScript.

[15. Remove Items from a List without Mutations](https://github.com/xgirma/build-your-first-production-quality-react-app/tree/ch.15)

In this lesson, we’ll add the ability to remove items from our list. We’ll add some css to show a delete link while hovered over an item and handle a click event from the component to remove the corresponding item from the list by its id.

[16. Use React Context to Manage Application State Through Routes](https://github.com/xgirma/build-your-first-production-quality-react-app/tree/ch.16)

We’ll create a Router component that will wrap our application and manage all URL related state. We’ll see how we can use React’s built in context mechanism to pass data and functions between components without having to pass props all the way down through the component tree.

[17. Use React Context to Manage Application State Through Routes](https://github.com/xgirma/build-your-first-production-quality-react-app/tree/ch.17)

We’ll create a Router component that will wrap our application and manage all URL related state. We’ll see how we can use React’s built in context mechanism to pass data and functions between components without having to pass props all the way down through the component tree.

[18. Filter Data on Property Values](https://github.com/xgirma/build-your-first-production-quality-react-app/tree/ch.18) 

We want to be able to show only items in a certain status so in this lesson, we’ll add a flag to indicate which items to show, and create a function to filter the todos based on that value. We’ll take advantage of route based state to control the filtering behavior.

[19. Keep Application State in Sync with Browser History](https://github.com/xgirma/build-your-first-production-quality-react-app/tree/ch.19)

Using pushState and passing route data via context allows our application to respond to route changes made from Link components, but `using the back and forward buttons in the browser doesn’t update the application state` as we would expect. In this lesson, we’ll add event handling to our Router component to handle history popState events so routing behavior is maintained for the `back` and `forward` buttons.

[20. Load Data From a Server with fetch](https://github.com/xgirma/build-your-first-production-quality-react-app/tree/ch.20)

We’ll fire up json-server so we can run our application against a server. We’ll take advantage of the fetch polyfill provided by create-react-app and leverage the componentDidMount lifecycle event to load our initial todo list. We’ll also add an error message to our UI in the case that the server is unavailable.

[21. Save Data to the Server with fetch](https://github.com/xgirma/build-your-first-production-quality-react-app/tree/ch.21)

We’ll cover posting new data to the server using fetch and the `POST` http method. We’ll also update the UI with a success message once the save has completed successfully.

[22. Show Temporary Messages in a React Application](https://github.com/xgirma/build-your-first-production-quality-react-app/tree/ch.22)

We’ll add a message object to the application state and use that message to conditionally show a message component. We’ll also use a `setTimeout` to update our state and hide the message after a specified period of time.

[23. Update data on the Server with fetch](https://github.com/xgirma/build-your-first-production-quality-react-app/tree/ch.23)

We’ll use fetch and refactor our client-side task completion logic to send an update to the server, and update the UI with a success message once the save has completed successfully.

[24. Delete Data on the Server with fetch](https://github.com/xgirma/build-your-first-production-quality-react-app/tree/ch.24)

We’ll use fetch to delete items on the server when the client triggers a removal, and update the UI with a success message once the delete operation on the server has succeeded.