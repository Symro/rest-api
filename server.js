/**
 * Setup
 */

// Needed packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Profile = require('./app/models/profile');

// this will let us get the data from a POST
// parse the body to access parameters in requests like req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Port du server
var port = process.env.PORT || 8080;

// Routes
var router = express.Router();

// On passe toujours par ici pour n'importe quelle requête
router.use(function(req, res, next) {
    // do logging
    console.log('Il y a du monde sur les routes');
    next();
});

// route test GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'Comme sur des roulettes !' });
});

router.route('/profiles')

    // creation profil at POST http://localhost:8080/api/profiles)
    .post(function(req, res) {

        // Nouvelle instance
        var profile = new Profile();
        profile.firstName = req.body.firstName;
        profile.lastName = req.body.lastName;
        profile.sex = req.body.sex;
        profile.birth = req.body.birth;
        profile.city = req.body.city;
        profile.nationality = req.body.nationality;
        profile.avatar = req.body.avatar;
        profile.favoriteNumber = req.body.favoriteNumber;
        profile.position = req.body.position;
        profile.profileSize = req.body.profileSize;
        profile.weight = req.body.weight;
        profile.strongFoot = req.body.strongFoot;
        profile.favoriteClub = req.body.favoriteClub;

        // save du profil et check des erreurs
        profile.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Profil créé !' });
        });

    })
    .get(function(req, res){
        Profile.find(function(err, profiles){
            if(err)
                res.send(err);

                res.json(profiles);
        });
    });

router.route('/profile/:profile_id')

    // Récupérer un profil par son id
    .get(function(req, res){
        Profile.findById(req.params.profile_id, function(err, profile){
            if(err)
                res.send(err);

            res.json(profile);
        });
    });

// Ensemble des routes
// prefix /
app.use('/', router);

// Démarrage server
app.listen(port);
console.log('ça envoie du lourd sur le port : ' + port);