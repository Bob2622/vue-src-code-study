## 参考资料
* [官方文档](https://mochajs.org/)
* [中文文档1](https://segmentfault.com/a/1190000011362879)
* [中文文档2](https://www.jianshu.com/p/9c78548caffa)

## QA

> 如何指定测试目录

```nodejs
// 运行 ./test/ 目录所有 js
$ mocha

// 指定目录
$ mocha ./xx/

// 指定 js 文件
$ mocha xxx.js

// 监听文件变化
$mocha xxx.js -w
```
<br/> 

> window.setImmediate / Process.nextTick / window.setTimeout

[知乎围观大神们讨论!](https://www.zhihu.com/question/23028843)
```nodejs
// TODO
```
<br/> 

> AMD / CMD / ES6 三种包引用方式不同

```
// TODO
```
<br/> 

> 如何使用 ES6 语法

安装 babel
```
$ npm install babel-core babel-preset-es2015 --save-dev
```
项目目录下新建 `.babelrc` 配置文件
```
{
    "presets": [ "es2015" ]
}
```
最后在 `package.json` 中使用 `--compilers` 参数指定测试脚本的转码器
```
{
    ...
    "scripts": {
        "test": "mocha --require babel-core/register ./mocha_learn"
    },
    ...
}
```
<br/>

> 使用 ES7 中 async/await

```
$ npm install --save-dev babel-plugin-transform-runtime babel-plugin-transform-async-to-generator
```

在 `.babelrc` 中配置
```
{
    ...
    plugins: [ "transform-runtime", "babel-plugin-transform-async-to-generator" ]
    ...
}
```
