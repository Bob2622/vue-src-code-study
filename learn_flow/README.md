### 官网
https://github.com/facebook/flow

#### 安装
```
// 局部安装
npm i flow-bin --save-dev
// 全局安装
npm i flow-bin -g
// brew 安装
brew install flow
```

#### 静态类型检查
1. 初始化项目: 进入项目根目录
```
flow init
```

2. 添加被测试文件: 在被测试文件头部添加
```
/* @flow */
```
3. 运行测试
```
flow check
```
