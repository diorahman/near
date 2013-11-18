var Feature = require('../model/feature.js');

exports.post = function(req, res) {
}

exports.save = function(req, res) {
}


function typeName(category){

  // sejarah/purbakala -> purbakala 
  // alam/objek alam -> objek_alam
  // air/pantai -> pantai, sungai, danau
  // kontemporer -> kontemporer
  // budaya/kultural -> kultural, museum
  // kuliner/restaurant -> restaurant
  // sekunder -> bandara_sipil, terminal, pelabuhan, hotel

  var types = []

  switch (category) {
    case 'purbakala' : types.push("msop:purbakala"); break;
    case 'alam' : types.push("msop:objek_alam"); break;
    case 'air' : types.push("msop:pantai"); break;
    case 'kontemporer' : types.push("msop:kontemporer"); break;
    case 'kultural' : types.push("msop:kultural"); types.push("msop:museum"); break;
    case 'kuliner' : types.push("msop:restaurant"); break;
    case 'sekunder' : types.push("msop:bandara_sipil"); types.push("msop:terminal"); types.push("msop:pelabuhan"); types.push("msop:hotel"); break;
    default: break;
  }

  return types;
}

exports.list = function(req, res) {
  var query = req.params.type ? { "properties.typeName" : req.params.type} : {}
  Feature.find(query, function(err, features){
    res.send(features);
  })
}

exports.show = (function(req, res) {
  Feature.findOne({_id : req.params.id}, function(err, feature) {
    if (err) return res.send({})
    else {
      res.send(feature);
    }
      
  })
});

exports.near = function(req, res) {

  var latlng = req.query.latlng || "118.7249836260268,-8.616607370834329";
  var maxDistance = req.query.dist || 500 //~30km
  var num = req.query.num || 10
  var category = req.params.category || "alam"

  var query = []
  var types = typeName(category);

  for (var i = 0; i < types.length; i++) {
    query.push({ "properties.typeName" : types[i]})
  }

  var near = latlng.split(",");

  var geoNear = [
  { $geoNear: { near: [parseFloat(near[0]), parseFloat(near[1])], 
    distanceField: "dist.calculated", 
    maxDistance: maxDistance / 6371, // ~30 km 
    query: {$or : query}, 
    includeLocs: "dist.location", 
    distanceMultiplier : 6371,
    spherical : true,
    uniqueDocs: true, 
    limit : parseInt(num) }
  }];

  Feature.aggregate(geoNear, function(err, features){
    if (err) return res.send([]);
    else {
      res.send(features);
    }
  })
}