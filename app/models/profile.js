var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfilesSchema = new Schema({
    firstName: String,
    lastName: String,
    nickname: String,
    sex: String,
    birth: Date,
    city: String,
    nationality: String,
    avatar: String,
    favoriteNumber: Number,
    position: String,
    profileSize: String,
    weight: Number,
    strongFoot: String,
    favoriteClub: String
});

module.exports = mongoose.model('Profiles', ProfilesSchema);