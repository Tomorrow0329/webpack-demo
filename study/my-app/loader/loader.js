// import { getOptions } from 'loader-utils';
const loaderUtils = require('loader-utils');
// import validateOptions from 'schema-utils';

const schema = {
  type: 'object',
  properties: {
    test: {
      type: 'string'
    }
  }
}

module.exports = function(source) {
  const options = loaderUtils.getOptions(this);

  const result = source.replace('World', options.name);
  // 对资源应用一些转换……

  return result;
};