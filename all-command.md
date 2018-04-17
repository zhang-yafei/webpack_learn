1. demo1
新建src和public目录
在src里面新建index.js文件，public文件里面新建index.html文件，且引用不存在的bundle.js
执行命令
webpack src/index.js public/bundle.js
//hello world

2. demo2
public文件夹里面新建文件initPage.js
执行命令
webpack src/index.js public/bundle.js
//练习js模块化引用，可以看到index.js和initpage.js同时被编译了，且2个文件被打包在一起

3. demo3-增加配置文件
新建webpack.config.js文件
文件里面的__dirname 含义是指脚本当前所在的位置
命令行中切换到当前目录，运行webpack，即可看到文件已经成功被打包

4. demo4-打包方式
这就要提到一个属性devtool了，该属性有4个属性值
source-map
cheap-module-source-map
eval-source-map
cheap-module-eval-source-map
从上到下，打包的速度越来越快，但是代码压缩的越来越严重，调试起来也越来越麻烦。

5. demo5-配置热更新
热更新的话，这里使用的是webpack-dev-server,我们需要安装一下该模块
npm install --save-dev webpack-dev-server@2.*
在这里我们说一下为什么要安装2.*的版本，因为最新的webpack已经哼唧到了4.*，对应的webpack-dev-server是3.*
我们使用的webpack是3.11.0，对应的webpack-dev-server版本为2.*
这里，也有几项属性需要我们去配置
contentBase：需要启动的文件目录
port：端口名，我这里使用的是8090
inline：是否自动刷新页面，true自动刷新
historyApiFallback:是否指向同一个html页面
这个额是我的配置
devServer: {
	contentBase: "./demo6/public",
	port:"8090",
	inline:true,
	historyApiFallback:true
}
既然讲到这里，我们在谈一下关于热更新的话题。
webpack最遭的时候使用的是EventSource，在最近的版本中已经更新为WebSocket
EventSource是基于Http协议，通过轮询的方式，不断发送请求。来获取服务器端最新的信息，在console里面我们可以new EventSource('/getPage')，这里括号里面的值就是接口，浏览器中可以看到不断有请求对服务器发送。会对服务器造成巨大的负担。
WebSocket是基于TCP协议，使用的是一次握手。
关于热更新的内容可以参考https://my.oschina.net/zhangyafei/blog/1796337

6. 从这里开始我们就开始学习plugin和loader的使用
因为经常需要安装组件，就把demo写在一起，一点点的像上面放新功能
plugin是作用与整个构建过程，全部文件
loader是作用于单个符合正则的语法的文件。
我们先试一下加入css-loader和style-loder
css-loader：是我们能狗使用import和url（）语法把css引入进去
style-loader：能够把上面计算好的样式加入到页面的style标签中
因为同时使用这两个loader我们有2种写法
1.loader: "style-loader!css-loader"
2.use: [
            {
                loader: "style-loader"
            }, {
                loader: "css-loader",
            }
        ]

7. 插件
让我们先试用一个简单的插件，打印转悠的注释

webpack.BannerPlugin，是webpack自带的
我们只需要加入，即可在打包后的文件种看到这行文字
 plugins: [
    new webpack.BannerPlugin('This is webpack demo')
],

HtmlWebpackPlugin插件，这个插件使用的比较多，作用是根据一个idnex模板，动态生成新的html页面，并引入相应的script标签和link标签
先安装这个插件
npm install --save-dev html-webpack-plugin
new HtmlWebpackPlugin({
	title: 'Harry demo',
	template: __dirname + "/index.temp.html"
})

js代码压缩，我们可以使用这个插件
new webpack.optimize.UglifyJsPlugin(),

对于缓存，我们一般都是使用hash值去区别不同的文件。这块webpack已经自带生成hash功能
使用方式[hash]，这个语法编译后就是hash值

关于其他常用的插件
url-loader//用于引入图片
babel-loader babel-preset-es2015 //用于兼容es6语法
sass-loader 
less-loader
react-loaders
等
IgnorePlugin//忽略掉指定的模块
extract-text-webpack-plugin//分离css文件
CommonsChunkPlugin//合并公共模块的插件
ProvidePlugin//内置插件，使用以后将不再需要import和require进行引入


关于webpack4，
我们需要设置一下默认配置mode

3种配置可选
--none
--deveploment
--production
默认路径是.src/index.js
默认输出路径经dist
运行时，只需要输入webpack --mode development



以上内容参考
https://www.jianshu.com/p/42e11515c10f#
https://www.runoob.com/w3cnote/webpack-tutorial.html