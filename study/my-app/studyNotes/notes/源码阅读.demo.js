/**
 * 【第一画】
 * 启动 npm run dev / npm start
 * 路径：webpack-dev-server/bin/webpack-dev-server.js
 */
const webpack = require('webpack');
const Server = require('../lib/Server');

function startDevServer(config, options) {
  // 启动webpack，生成compiler实例,compiler上有很多方法，比如可以启动 webpack 所有编译工作，以及监听本地文件的变化。
  compiler = webpack(config);
  // 使用express框架启动本地server，让浏览器可以请求本地的静态资源
  server = new Server(compiler, options, log);
  if (options.socket) {
    // 看看 这不就是client端的socket启动么！！
    server.listeningApp.on('error', (e) => {
      if (e.code === 'EADDRINUSE') {
        const clientSocket = new net.Socket();

        clientSocket.on('error', (err) => {
          if (err.code === 'ECONNREFUSED') {
            // No other server listening on this socket so it can be safely removed
            fs.unlinkSync(options.socket);

            server.listen(options.socket, options.host, (error) => {
              if (error) {
                throw error;
              }
            });
          }
        });

        clientSocket.connect({ path: options.socket }, () => {
          throw new Error('This socket is already used');
        });
      }
    })
    // 启动server端的socket
    server.listen(options.socket, options.host, (err) => {/** ... */});
  } else {
    // 一个平平无奇的监听
    server.listen(options.port, options.host, (err) => {
      if (err) {
        throw err;
      }
    });
  }
  
}

/**
 * 那么问题来了，
 */

/**
 * 【第零画】
 * 路径：webpack-dev-server/lib/Server.js
 */

 // 处理各种入口文件
Server.addDevServerEntrypoints = require('./utils/addEntries');

/**
 * 路径：webpack-dev-server/lib/Server.js
 */
class Server {
  constructor(compiler, options = {}, _log) {
    this.setupApp();
    this.createServer();

    this.setupHooks(); // Listening for events
  }

  setupApp() {
    this.app = new express()
  }

  createServer() {
    this.listeningApp = http.createServer(this.app);
  }

  // SocketServer 
  listen(port, hostname, fn) {
    this.hostname = hostname;

    return this.listeningApp.listen(port, hostname, (err) => {
      this.createSocketServer();
    });
  }
}

/**
 * 路径：./utils/addEntries.js
 */

function addEntries (config, options, server) { // webpack-config,dev-server-option,server
  const app = server || {
    address() {
      return { port: options.port };
    },
  };
  const sockHost = options.sockHost ? `&sockHost=${options.sockHost}` : '';
  const sockPath = options.sockPath ? `&sockPath=${options.sockPath}` : '';
  const sockPort = options.sockPort ? `&sockPort=${options.sockPort}` : '';
  // 获取websocket客户端代码
  const clientEntry = `${require.resolve(
    '../../client/'
  )}?${domain}${sockHost}${sockPath}${sockPort}`;
  
  // 根据配置获取热更新代码
  let hotEntry;
  if (options.hotOnly) {
    hotEntry = require.resolve('webpack/hot/only-dev-server');
  } else if (options.hot) {
    hotEntry = require.resolve('webpack/hot/dev-server');
  }

  [].concat(config).forEach((config) => {
    const webTarget = [
      'web',
      'webworker',
      'electron-renderer',
      'node-webkit',
      undefined, // eslint-disable-line
      null,
    ].includes(config.target);

    // check 注入 target
    const additionalEntries = checkInject(
      options.injectClient,
      config,
      webTarget
    )
      ? [clientEntry]
      : [];

    // handle hotEntry
    if (hotEntry && checkInject(options.injectHot, config, true)) {
      additionalEntries.push(hotEntry);
    }
    // 处理前缀
    config.entry = prependEntry(config.entry || './src', additionalEntries);

    // 如果开启hot 会自动安装 HotModuleReplacementPlugin 插件
    // 且 如果安装多个Plugin 为防止重名，检测了一下 构造函数
    if (options.hot || options.hotOnly) {
      config.plugins = config.plugins || [];
      if (
        !config.plugins.find(
          // Check for the name rather than the constructor reference in case
          // there are multiple copies of webpack installed
          (plugin) => plugin.constructor.name === 'HotModuleReplacementPlugin'
        )
      ) {
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
      }
    }
  }
};

// 经过 👆 修改后的entry入口文件
// 修改后的entry入口
{
  entry: 
  { index:
    [
      // 上面获取的clientEntry
      'xxx/node_modules/webpack-dev-server/client/index.js?http://localhost:8080',          
      // 上面获取的hotEntry
       'xxx/node_modules/webpack/hot/dev-server.js',
       // 开发配置的入口
       './src/index.js'
      ],  
  },
}




// 处理入口文件 by weback-config