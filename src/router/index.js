const fs = require('fs');

const useRouter = (app) => {
  fs.readdirSync(__dirname).forEach((file) => {
    if (file !== 'index.js') {
      const routers = require(`./${file}`);
      app.use(routers.routes());
      app.use(routers.allowedMethods());
    }
  })
};

module.exports = useRouter;