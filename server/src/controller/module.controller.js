const Module = require('../model/module.model');

exports.findAll = (req, res) => {
  Module.find()
    .then((modules) => { res.send(modules); })
    .catch((err) => {
      res.status(500).send({
        message: err.message
      });
    });
};
exports.create=(req,res) => {
  const newMoudle =new Module(req.body);
  newModule
  save()
  then((date)=>{res.send(data); })
  catch((err) =>{
    res.status(500).send({message:err.message });
  });
};
