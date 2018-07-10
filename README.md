FE-VINE
====

fe-vine, 一个用来上传hybrid打包产物的命令行工具。

## 用法

```bash
# 全局安装
$ npm i fe-vine -g
# 测试
$ fe-vine --version
# 帮助命令
$ fe-vine --help
# 上传Android的arr包
$ fe-vine android
# 上传iOS的zip包
$ fe-vine ios
```

## 配置文件

上传时默认读取`fe-vine`项目根目录下的`oriente.config.json`文件。

```bash
# 查看fe-vine的安装目录
$ which fe-vine
```

请修改配置参数后再进行上传操作。
