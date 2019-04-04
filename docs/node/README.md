# express框架
## 简介

`express`是一个保持最小规模的灵活的`node.js` Web应用程序开发框架，为Web和移动应用程序提供一组强大的功能。
更多相关信息：[erpress](http://www.expressjs.com.cn/)

## 快速入门

首先假定你已经安装了Nodejs，接下来为你的应用创建一个目录，然后进入此目录并将其作为当前工作目录
``` 
mkdir myapp
cd myapp
```

接着通过`npm init`命令创建一个`package.json`文件，`package.json`如果起作用，参考[Specifics of npm’s package.json handling.](https://docs.npmjs.com/files/package.json)

``` 
npm init
```
在这个过程中有要求输出参数，例如此应用的名称和版本。你可以直接选择`回车`接受大部分默认即可

接下来在**myapp**目录下安装`Express`并将其保存到依赖列表中：如下：
```Shell
npm install express --save
```