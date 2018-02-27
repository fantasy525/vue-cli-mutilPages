# multi-pages

> vue-cli改造的多页项目
### 修改的地方
+   
```javascript
   config/index.js
   // Template for index.html,多页面自动获取页面模板
    //index: path.resolve(__dirname, '../dist/index.html')// 注释掉默认的页面模板

  ```
+ webpack.base.conf.js
  修改入口起点，getEntry参数中的pages可以修改为views，可以自定义修改
```javascript 
 entry:utils.getEntry('./src/pages/**/*.js') 
```
+ webpack.dev.conf.js
  引入一下内容
```javascript
 const pages=utils.getEntry('./src/pages/**/*.js')//获取入口文件的路径，返回值为对象{index:'./src/pages/index/index.html'}
  const pageNames=Object.keys(pages)获取key值，也就是页面入口js的文件名
```
删除原devWebpackConfig对象中plugins中new HtmlWebpackPlugin()的配置
并在文件中添加
```javascript
  pageNames.forEach(function(pathname){
  var dirname=pages[pathname].split('.js')[0]
  console.log(dirname)
  var conf={
    filename: pathname+'.html',
      template: dirname+'.html',
      inject: true,
      chunks:['manifest','vendor',pathname]
  }
  devWebpackConfig.plugins.push(new HtmlWebpackPlugin(conf))
})
```
+ webpack.prod.conf.js
1.修改output配置
```javascript
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name]/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[name]/[id].[chunkhash].js')
  }//filename多加了个[name]，最终会为每个入口js增加一个文件夹区分
```
2.删除plugins中new HtmlWebpackPlugin()相关代码
3. 头部引入
```javascript
  const pages=utils.getEntry('./src/pages/**/*.js')
const pageNames=Object.keys(pages)
```
在webpackConfig配置后面插入一下代码
```javascript
  pageNames.forEach(function(pathname){
  var dirname=pages[pathname].split('.js')[0]
  console.log(dirname)
  var conf={
    filename: pathname+'.html',
      template: dirname+'.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      chunks:['manifest','vendor',pathname]
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf))
})

```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
