var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/teman');

var Feature = require('../model/feature.js');
Feature.find({ "geometry.coordinates" : { $near : [119.02532584184,  -6.8193736998526], $maxDistance : 100/68.91} }, function (err, feature) {        
  console.log(err)
  console.log(feature)
})

Feature.findOne({_id : "52878c763c84cfa61fd04173"}, function(err, feature) {
  console.log(err)
  console.log(feature)
})