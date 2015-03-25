var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfilesSchema = new Schema({
    firstName: String,
    lastName:String
});

module.exports = mongoose.model('Profiles', ProfilesSchema);