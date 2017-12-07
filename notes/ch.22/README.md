# Show Temporary Messages in a React Application

We’ll add a message object to the application state and use that message to conditionally show a message component. We’ll also use a setTimeout to update our state and hide the message after a specified period of time.

When an item is added to our todos, we're performing an optimistic UI update, meaning we're updating the todos in our state without waiting for a response from a server. This gives us a responsive UI, but it would be nice to have some kind of confirmation that our save was successful.

...