var mongoose = require('mongoose');
var validators = require('mongoose-validators');
var Schema = mongoose.Schema;

// DOC : https://www.npmjs.com/package/mongoose-validators

var ProfilesSchema = new Schema({
    firstName:      {type: String, validate: validators.matches("^[a-zA-ZÀ-ÿ\s\' -]{1,60}$")},
    lastName:       {type: String, validate: validators.matches("^[a-zA-ZÀ-ÿ\s\' -]{1,60}$")},
    nickName:       {type: String, validate: validators.matches("^[a-zA-ZÀ-ÿ\s\' -]{1,60}$")},
    sex:            {type: String, validate: [validators.isAlpha(), validators.isLength(1)]},
    birth:          {type: String, validate: validators.isDate()},
    city:           {type: String, validate: [validators.isAlphanumeric(), validators.isLength(2, 60)]},
    nationality:    {type: String, validate: validators.matches({skipNull:true}, "^[a-zA-ZÀ-ÿ\s\' -]{1,60}$")},
    avatar:         {type: String, validate: validators.matches({skipNull:true}, "^.*\.(jpg|jpeg|gif|JPG|png|PNG)$")},
    favoriteNumber: {type: Number, validate: validators.isNumeric({skipNull:true})},
    position:       {type: String, validate: [validators.isAlphanumeric({skipNull:true}), validators.isLength({skipNull:true}, 2, 60)]},
    height:         {type: Number, validate: validators.isNumeric({skipNull:true})},
    weight:         {type: Number, validate: validators.isNumeric({skipNull:true})},
    strongFoot:     {type: String, validate: validators.isIn({skipNull:true}, ["droitier","gaucher"])},
    favoriteClub:   {type: String, validate: validators.matches({skipNull:true}, "^[a-zA-ZÀ-ÿ\s\' -]{1,60}$")}
});


module.exports = mongoose.model('Profiles', ProfilesSchema);