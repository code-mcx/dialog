# mcx-dialog

<p>
  <a href="https://github.com/code-mcx/mcx-dialog"><img src="https://img.shields.io/badge/language-javascript-green.svg" alt="mcx-dialog"></a>
  <a href="https://github.com/code-mcx/mcx-dialog"><img src="https://img.shields.io/badge/npm-v0.1.0-blue.svg" alt="mcx-dialog"></a>
</p>
<p>
  <a href="https://github.com/code-mcx/mcx-dialog/blob/master/README_zh.md">中文文档</a>
</p>

A dialog plugin for web page based on primary javascript 

# Description

This dialog is implemented with primary javascript and it is not dependent on jquery.Css3 animation is used in this dialog box, 
when you use it in lower version browser environment and without css preprocessor,some animation may be not take effect. It can
be use with vue, react

# Getting started

## Browser

First lead into css and js, they are in dist directory. You can't move any things under the dist directory

```
<!DOCTYPE html>
<html>
  <head>
    ...
    <link rel="stylesheet" type="text/css" href="dist/css/mcx-dialog.css"/>
  </head>
  <body>
    ...
    <script type="text/javascript" src="dist/mcx-dialog.min.js"></script>
  </body>
</html>
```

Then you can get an object named `mcxDialog`

```
<script type="text/javascript">
  // Alert
  mcxDialog.alert("hi, 我是alert");

  // Confirm
  mcxDialog.confirm("hi, 我是confirm");

  // Msg
  mcxDialog.msg("hi, 我是message");

  // Tips
  mcxDialog.tips("hi, 我是tips", "dom's id");

  // Loading
  mcxDialog.loading({src: "dist/img"});
</script>
```
More use see the examples directory: [examples](https://github.com/code-mcx/mcx-dialog/tree/master/examples)

## Npm

If you are useing npm, first install this package

```
npm install mcx-dialog
```

Import dependency

```
// CommonJS
let McxDialog = require("mcx-dialog").default

// ES6
import McxDialog from "mcx-dialog"
```

### Vue

mcx-dialog provided better operations in Vue

```
import McxDialog from "mcx-dialog"
// Install as Vue's plugin
Vue.use(McxDialog)
```

In single page application, call it in any where

```
<template>
  <div id="app">
    <button @click="alert">alert</button>
    <button @click="confirm">confirm</button>
    <button @click="msg">msg</button>
    <button @click="tip" id="tip">tip</button>
    <button @click="loading">loading</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    alert() {
      this.$mcxDialog.alert("hi, 我是alert");
    },
    confirm() {
      this.$mcxDialog.confirm("hi, 我是confirm");
    },
    msg() {
      this.$mcxDialog.msg("hi, 我是message");
    },
    tip() {
      this.$mcxDialog.tips("hi, 我是tips", "tip");
    },
    loading() {
      this.$mcxDialog.loading();
    }
  }
}
</script>
```
### React

In react, you mast import it when you need to use

```
handleClick = (type) => {
  switch (type) {
    case "alert":
      mcxDialog.alert("hi, 我是alert");
      break;
    case "confirm":
      mcxDialog.confirm("hi, 我是confirm");
      break;
    case "msg":
      mcxDialog.msg("hi, 我是message");
      break;
    case "tip":
      mcxDialog.tips("hi, 我是tips", "tip");
      break;
    case "loading":
      mcxDialog.loading();
      break;
  }
}
render() {
  return (
    <div className="App">
      <p>
        <button onClick={() => { this.handleClick("alert") }}>alert</button>
        <button onClick={() => { this.handleClick("confirm") }}>confirm</button>
        <button onClick={() => { this.handleClick("msg") }}>msg</button>
        <button onClick={() => { this.handleClick("tip") }} id="tip">tip</button>
        <button onClick={() => { this.handleClick("loading") }}>loading</button>
      </p>
    </div>
  );
}
```
