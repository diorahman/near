var request = require("request");
var url = require("url");
var qs = require("querystring");
var mongoose = require('mongoose');

var rootUrl = "http://167.205.81.172:8080/geoserver";
var workspace = "msop";
var serviceType = "WFS";
var version = "1.0.0";
var requestType = "GetFeature";

var typeNames = ["hotel", "museum", "objek_alam", "kultural", "kontemporer", "purbakala", "restaurant", "pantai", "bandara_sipil"];
var outputFormat = "json";

var maxNumber = 10000 // set to possible number of features for each type

function typeUrl(typeName, max){
  var url = rootUrl + "/" + workspace + "/" + "ows?service=" + serviceType;
  url += "&version=" + version;
  url += "&request=" + requestType;
  url += "&typeName=" + workspace + ":" + typeName;
  url += "&maxFeatures=" + max;
  url += "&outputFormat=" + outputFormat;
  return url;
}

mongoose.connect('mongodb://localhost/teman');

var Feature = require('../model/feature.js');

for (var i = 0; i < typeNames.length; i++) {
  
  var typeName = typeNames[i];

  request(typeUrl(typeName, maxNumber), function(err, res, body){
    var collection = JSON.parse(body);
    var href = url.parse(res.request.href);
    
    var q = qs.parse(href.query);
    
    // check exists, if not insert
    var features = collection.features;
    for (var j = 0; j < features.length; j++) {
      
      var feature = features[j];

      var point = new Feature({
        id : feature.id,
        geometry : feature.geometry,
        properties : feature.properties
      }); 

      point.properties.typeName = q.typeName;

      var obj = point.toObject();
      delete obj._id;

      Feature.findOneAndUpdate({ "geometry.coordinates" : feature.geometry.coordinates[0] }, obj, { upsert : true }, function(err){
        if (err) console.log(err)
        else {
          console.log("saved")
        }
      })
    }
  })  
}


