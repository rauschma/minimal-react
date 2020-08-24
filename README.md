# Minimal React project

## Installation

```
cd minimal-react
npm install
```

## Running the project

* Start the development server:
  ```
  cd minimal-react
  npm start
  ```
* The dev server prints root URLs to the console, e.g.: [`http://localhost:8080/`](http://localhost:8080/)
  * Open one of them in a web browser.
* The browser tab is refreshed automatically when you change either HTML or JavaScript code.

## Building the project

```js
npm run build
```

Afterwards, the complete web app is in directory `minimal-react/build`, ready to be deployed.

## Technologies used by the project

This is an exhaustive list of dependencies:

* [Snowpack](https://www.snowpack.dev): `snowpack`, `@snowpack/plugin-react-refresh`
* [React](https://reactjs.org): `react`, `react-dom`
* [HTM](https://github.com/developit/htm): `htm`
* [Immer](https://immerjs.github.io/immer/docs/introduction): `immer`