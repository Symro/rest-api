var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UsersSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Users', UsersSchema);