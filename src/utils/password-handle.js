const crypto = require('crypto');

const md5Word = (name) => {
  const hash = crypto.createHash('md5')
                .update(name)
                .digest('hex');
  return hash;
};


module.exports = {
  md5Word,
}