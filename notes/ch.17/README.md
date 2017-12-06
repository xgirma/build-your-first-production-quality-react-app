# Use React Context to Manage Application State Through Routes

We’ll create a Router component that will wrap our application and manage all URL related state. We’ll see how we can use React’s built in context mechanism to pass data and functions between components without having to pass props all the way down through the component tree.

As it stands, the footer component is using this link component to render the hyperlinks in this app. It also responds to clicks by updating the URL through history.pushState.

This is fine for updating the URL and history, `but without querying the document location, we have no way of knowing what route the app is currently` on in our other components.

`We should put this information in our application state`, and we should do it `higher up in the component tree`, so it's more accessible to components that need it. For this, we'll create a **streamlined router component**.

Let's start by adding a file called router.js to our router directory. Give it a render method. Render is going to return a `div` that contains `children`, so we'll get that through `this.props.children`.

I also want to `give the router some state`, so we're going to just use **property initializer syntax**, so I can just say state equals and `assign an object at the class level`. 

The router is going to maintain a **single state property** that represents the `current route`, so we'll just define route on the state object.

To keep our router simple, we're just going to return `the last segment of the path name`. I'm going to return a call to `path.substring`, and we're going to start that substring at `path.lastIndexOf('/')`.

I skipped this chapter, legacy now, i think. 