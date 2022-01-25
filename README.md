# assignment-1

## Introduction

This web app is a social media inspired by Twitter, posts are not allowed to include punctuation or capital letters - this is to attempt to increase informallity in speech (this is mainly to differentiate from Twitter).

## Documentation

[View the documentation for the API here](https://documenter.getpostman.com/view/16362168/UVe9SVQ5)

## Installation and setup

-`npm i`
-`npm start`
-Navigate to [http://localhost:3000/](http://localhost:3000/)

## Other commands

-`npm run build:css`
-`npm run seed`

## Firebase

For authentication, the web app uses Firebase. My creditials are public in the app, therefore I have trust you will not maliciously use them. 

### Firebase Accounts

I have generated 5 accounts using the email in the format i@test.com (i = 1-5) which all have the password `password`.
<br>
Example (Recommended)<br>
Email: `1@test.com`<br>
Password: `password`

## Design Inspirations

- Front-end renderer inspired by [React](https://reactjs.org/).

- Back-end Models inspired by Laravel, MVC architecture and Prisma, JSON database inspired by MongoDB

## Styling

-This app uses Tailwind css libary to style the front-end.

-Therefore I did modify premade components from https://v1.tailwindcss.com/components/.

## Front-end functionality explaination & notes

-Files stored in `public`

-To route around the site (change page) the front-end uses a function called rerender() which is stored in the scripts file in the js folder. This function removes the component render files (`index.js`) and adds it back again this enables another set of components to be rendered based on the get params. The rerender function is added to the window object.

-`index.js` is the main file for the front-end. This file renders all the components. Its type is a module, therefore the scope of functions are limited to the file they're stored in. To enable inline function calls, the functions are stored in the window, you will often see the code `window.function = function`, this enables the function to be called from anywhere in the code and therefore within rendered html. Functions are stored in the related component/feature for clarity.

## Back-end functionality explaination & notes

- Through out the whole project, camel case is used for naming conventions. However, within controllers snake case is used for function names to identify that they are endpoint functions rather than normal functions. Following https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
