# Build your first production quality React app

Based on [Andrew Van Slaars course on egghead.io](https://egghead.io/courses/build-your-first-production-quality-react-app)

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