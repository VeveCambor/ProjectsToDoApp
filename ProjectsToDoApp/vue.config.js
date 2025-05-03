// const { defineConfig } = require('@vue/cli-service')
// const webpack = require('webpack')

// module.exports = defineConfig({
//   transpileDependencies: true,
//   devServer: {
//     proxy: {
//       '/api': {
//         target: 'https://sdaapi.glabazna.eu',
//         changeOrigin: true,
//         secure: false,
//         pathRewrite: {
//           '^/api': '/js4'
//         },
//         logLevel: 'debug'
//       }
//     }
//   },
//   configureWebpack: {
//     resolve: {
//       fallback: {
//         "https": require.resolve("https-browserify"),
//         "http": require.resolve("stream-http"),
//         "stream": require.resolve("stream-browserify"),
//         "util": require.resolve("util/"),
//         "url": require.resolve("url/"),
//         "buffer": require.resolve("buffer/"),
//         "assert": require.resolve("assert/")
//       }
//     },
//     plugins: [
//       new webpack.ProvidePlugin({
//         process: 'process/browser',
//         Buffer: ['buffer', 'Buffer']
//       })
//     ]
//   }
// })
