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
        var profile = new Profile({
            firstName      : req.body.firstName,
            lastName       : req.body.lastName,
            nickName       : req.body.nickName,
            sex            : req.body.sex,
            birth          : req.body.birth,
            city           : req.body.city,
            nationality    : req.body.nationality,
            avatar         : req.body.avatar,
            favoriteNumber : req.body.favoriteNumber,
            position       : req.body.position,
            height         : req.body.height,
            weight         : req.body.weight,
            strongFoot     : req.body.strongFoot,
            favoriteClub   : req.body.favoriteClub
        });

        // Exemple de JSON OBJECT à envoyer au serveur :
        //
        // {
        //     "firstName": "Prénom",
        //     "lastName": "Nom de famille",
        //     "nickName": "Pseudo",
        //     "sex": "M",
        //     "birth": "Thu Mar 26 2015 21:28:19 GMT+0100",
        //     "city": "Paris",
        //     "nationality": "Française",
        //     "avatar": "avatar.jpg",
        //     "favoriteNumber": "1",
        //     "position": "Attaquant",
        //     "height": 180,
        //     "weight": 80,
        //     "strongFoot": "droitier",
        //     "favoriteClub": "---"
        // }

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

                res.header('Content-Type', 'application/json; charset=utf-8');
                res.json(profiles);
        });
    });

router.route('/profiles/:profile_id')

    // Récupérer un profil par son id
    .get(function(req, res){
        Profile.findById(req.params.profile_id, function(err, profile){
            if(err)
                res.send(err);

            res.header('Content-Type', 'application/json; charset=utf-8');
            res.json(profile);
        });
    });

// Ensemble des routes
// prefix /
app.use('/', router);

// Démarrage server
app.listen(port);
console.log('ça envoie du lourd sur le port : ' + port);