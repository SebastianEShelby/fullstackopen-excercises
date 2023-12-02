const path = require('path')

const config = () => {
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js'
    }
  }
}

// We can also define config as an object instead of a function:
// const config = {
//   entry: './src/index.js',
//   output: {
//     path: path.resolve(__dirname, 'build'),
//     filename: 'main.js'
//   }
// }


module.exports = config