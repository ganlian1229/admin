# 说明

vue2.x+element-ui 
这个后台管理系统模板可扩展性大（就是里面啥也没有）
只提供了两种列表样式和一套基本结构、还有一些各种东西的用法
（用于刚刚接触vue全环境的朋友学习）

## 安装依赖

```
npm install
```

### 运行

```
npm run serve
默认运行在8085端口
可自己修改vue.config.js修改端口
```

### 打包
注：打包删除了console.log 不想删除可以在babel.config.js中自行修改
```
npm run build
添加环境变量 VUE_APP_CURRENTMODE == 'production'
```
```
npm run build:test
添加环境变量 VUE_APP_CURRENTMODE == 'test'
```
