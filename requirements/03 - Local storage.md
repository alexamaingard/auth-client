# Local storage

Now that you've implemented user registration and login, the next step is to actually *use* the JSON Web Token for our user. Right now, it's just being saved in state via the `setLoginResponse` function. That means it'll disappear if we refresh the page - not ideal!

To make sure our user can leave the website, come back at a later time and still be logged in, we need to save the JWT. We can do this with the browser's local storage.

`localStorage` is an object provided by the DOM, and it contains some useful methods that allows us to create and read data. Think of it like a tiny database for the client - but don't store anything sensitive (like passwords) in it.

[Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

The important methods to know are:
1. `localStorage.setItem(key, value)`
2. `localStorage.getItem(key)`

## Requirement

1. Modify the `login` function to save the JWT to local storage
2. Answer the questions below

### Q1

The user has logged in and now has a valid bearer token saved in local storage. Which header do we need to put this token into when requesting a protected resource from a server?

Answer: Authorization header when creating the fetch request.

### Q2

Imagine the below code gets profile information for a user by ID but requires a valid token to access. What would you add to include the token from local storage?

```js
fetch('http://localhost:4000/user-profile/1', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem(userToken)
    }
})
```