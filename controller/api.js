var Feature = require('../model/feature.js');

exports.post = function(req, res) {
}

exports.save = function(req, res) {
}

exports.list = function(req, res) {
  var query = req.params.type ? { "properties.typeName" : req.params.type} : {}
  Feature.find(query, function(err, features){
    res.send(features);
  })
}

exports.show = (function(req, res) {
  Feature.findOne({_id : req.params.id}, function(error, feature) {
      res.send(feature);
  })
});

exports.near = function(req, res) {
  Feature.find({coords : { $near : [req.params.lat, req.params.lon], $maxDistance : req.params.dist/68.91}}, function (error, feature) {        
      console.log(feature)
  })
}