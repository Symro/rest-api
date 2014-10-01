/**
 * Setup
 */

// Needed packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Port du server
var port = process.env.PORT || 8080;

// Routes
var router = express.Router();

// route test GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'Comme sur des roulettes !' });
});

// Ensemble des routes
// prefix /api
app.use('/api', router);

// Démarrage server
app.listen(port);
console.log('ça envoie du lourd sur le port : ' + port);

// Utiliser POSTMAN