FE-VINE
====

fe-vine, 一个用来上传hybrid打包产物的命令行工具。

## 用法

```bash
# 全局安装
$ npm i fe-vine -g
# local 安装
$ npm i fe-vine
# 测试
$ fe-vine -v
# 帮助命令
$ fe-vine -h
# 上传Android的arr包
$ fe-vine android
# 上传iOS的zip包
$ fe-vine ios
```

## 配置文件

`fe-vine`默认读取 *项目工程根目录下* 的`fe-vine.config.json`文件，如果所在项目工程根目录没有该文件的话，会再次尝试读取用户根目录下的`~/.fe-vine.config.json`文件，如果仍然找不到，则提示报错。

```bash
# 查看fe-vine的安装目录
$ which fe-vine
```

请修改配置参数后再进行上传操作。


## 本地开发、调试
```bash
# 编译ES6->ES5
$ npm run compile
# 执行cli
$ node bin/cli android
$ node bin/cli ios
# 开启watch模式
$ npm start
# 调试node程序
# 在VSCode中猛击F5即可
```