var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/teman');

var Feature = require('../model/feature.js');
/*Feature.find({ "geometry.coordinates" : { $near : [119.02532584184,  -6.8193736998526], $maxDistance : 100/68.91} }, function (err, feature) {        
  console.log(err)
  console.log(feature)
})

Feature.findOne({_id : "52878c763c84cfa61fd04173"}, function(err, feature) {
  console.log(err)
  console.log(feature)
})*/

var near = [
  { $geoNear: { near: [118.7249836260268, -8.616607370834329], 
    distanceField: "dist.calculated", 
    maxDistance: 0.005, // ~30 km 
    query: {$or : [{ "properties.typeName" : "msop:objek_alam"}]}, 
    includeLocs: "dist.location", 
    distanceMultiplier : 6371,
    uniqueDocs: true, num: 5 }
  }];

Feature.aggregate(agg, function(err, res){
  console.log(err)
  console.log(JSON.stringify(res))
})