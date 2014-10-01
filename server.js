/**
 * Setup
 */

// Needed packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var User = require('./app/models/user');

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

router.route('/users')

    // creation utilisateur at POST http://localhost:8080/api/users)
    .post(function(req, res) {

        var user = new User(); 		// Nouvelle instance d'utilisateur
        user.name = req.body.name;  // nom de l'utilisateur

        // save de l'utilisateur et check des erreurs
        user.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'User créé !' });
        });

    });

// Ensemble des routes
// prefix /api
app.use('/api', router);

// Démarrage server
app.listen(port);
console.log('ça envoie du lourd sur le port : ' + port);

// Utiliser POSTMAN