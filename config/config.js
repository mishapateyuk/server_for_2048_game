const config = {
  app: {
    name: 'Server for the 2048 game',
    port: 8888,
    host: '0.0.0.0',
    ssl: {
      enabled: false,
      key: '',
      cert:'',
    },
  }
};

  /**
   * @param {string} name
   * @return {string|number|boolean|null|undefined}
   */
const get = (path) => {
  let result;
  path.split('.').forEach(name => {
    if (result !== undefined && result[name] !== undefined) {
      result = result[name];
      return;
    }
    if (config[name] !== undefined) {
      result = config[name]
    }
  });

  return result;
};

module.exports = {
  get,
};