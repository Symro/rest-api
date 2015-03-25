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

// configure app to use bodyParser()
// this will let us get the data from a POST
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

    // creation utilisateur at POST http://localhost:8080/api/profiles)
    .post(function(req, res) {

        var profile = new Profile(); 		// Nouvelle instance d'utilisateur
        profile.name = req.body.name;  // nom de l'utilisateur

        // save de l'utilisateur et check des erreurs
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

router.route('/profiles/:profile_id')

    // Récupérer un profil par son id
    .get(function(req, res){
        Profile.findById(req.params.profile_id, function(err, profile){
            if(err)
                res.send(err);

            res.json(profil);
        });
    });

// Ensemble des routes
// prefix /api
app.use('/api', router);

// Démarrage server
app.listen(port);
console.log('ça envoie du lourd sur le port : ' + port);

// Utiliser POSTMAN