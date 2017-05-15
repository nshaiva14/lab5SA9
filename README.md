<!-- # starter express app template

* node with babel
* expressjs
* airbnb eslint rules

Procfile set up to run on [heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app) -->

My backend API has a post-controller, user-controller, post-model, and user-model that routes to the respective pages. Password hashing and comparing is supported in passport.js. The backend can search the database for pre-existing users when a user tries to sign in with an account he/she made. Passwords are compared to ensure that a user enters the right password upon sign in. Once a user signs out, he/she is no longer authenticated.
