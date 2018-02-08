# mcx-dialog

<p>
  <a href="https://github.com/code-mcx/mcx-dialog"><img src="https://img.shields.io/badge/language-javascript-green.svg" alt="mcx-dialog"></a>
  <a href="https://github.com/code-mcx/mcx-dialog"><img src="https://img.shields.io/badge/npm-v0.1.0-blue.svg" alt="mcx-dialog"></a>
</p>

一个基于原生javascript的网页对话框插件 

# 说明

这个对话框是用原生javascript实现的，它不依赖于jquery。在这个对话框中使用了css3动画，在较低版本的浏览器环境中使用它并且没有CSS预处理器时，一些动画可能不会生效。它可以与vue、react一起使用

# 入门

## 浏览器

首先引入CSS和js，它们位于Dist目录中。您不能在Dist目录下移动任何东西

```html
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

然后，你可以得到一个名为“mcxdialogs”的对象

```javascript
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
更多使用请参见示例目录：[examples](https://github.com/code-mcx/mcx-dialog/tree/master/examples)

## Npm

如果你正在使用npm，先安装此插件包

```
npm install mcx-dialog
```

导入依赖

```javascript
// CommonJS
let McxDialog = require("mcx-dialog").default

// ES6
import McxDialog from "mcx-dialog"
```

### Vue

mcx-dialog 在vue中提供了更好的操作

```javascript
import McxDialog from "mcx-dialog"
// Install as Vue's plugin
Vue.use(McxDialog)
```

在单页应用程序中，在任何地方调用它 

```javascript
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

在React中，你需要在使用时导入它

```javascript
import mcxDialog from "mcx-dialog"
```

```javascript
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
