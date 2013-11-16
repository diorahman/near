var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var FeatureSchema = new Schema({
    id : String,
    date: {type: Date, default: Date.now},
    geometry : {
      "type" : { type : String},
      coordinates : [Number]
    },
    properties : {}
});

module.exports = mongoose.model('Feature', FeatureSchema);