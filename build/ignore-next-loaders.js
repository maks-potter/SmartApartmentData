const { getOptions } = require('loader-utils');
/**
 * This is loader, which remove loaders from loaders array before its index
 * or after this.loaderIndex - options.skipCount, because loaders are executing from right to left
 */
module.exports = function (content) {
  const { skipCount = 0 } = getOptions(this);

  this.loaders = this.loaders.slice(this.loaderIndex - skipCount);

  if (this.cacheable) {
    this.cacheable();
  }

  return content;
};
