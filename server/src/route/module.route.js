const modules = require('../controller/module.controller.js');

module.exports = (app) => {
  app.get('/module', modules.findAll);
  app.post('/module', modules.create);
  app.delete('/module/:id', modules.destroy);
<<<<<<< HEAD
  app.put('/module/:id', modules.update);
};
=======
  app.patch('/module/:id', modules.update);
};
>>>>>>> 4b1beb7c937490a9b7975242cf6af0770ca3294f
