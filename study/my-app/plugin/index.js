function HellowWordPlugin(options) {};

HellowWordPlugin.prototype.apply = function(compiler){
  compiler.plugin('done', () => {
    console.log(`********  Hellow Word ! *********`)
  })
  compiler.plugin('compilation', (compilation) => {
    compilation.plugin('optimize', () => {
      console.log('Assets are being optimized.');
    })
  })
}

module.exports = HellowWordPlugin;