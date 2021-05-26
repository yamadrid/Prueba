const config = require('./src/common/config/env.config.js');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const AuthorizationRouter = require('./src/authorization/routes.config');
const UsersRouter = require('./src/users/routes.config');
const CountriesRouter = require('./src/countries/routes.config');

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

app.use(bodyParser.json());
AuthorizationRouter.routesConfig(app);
UsersRouter.routesConfig(app);
CountriesRouter.routesConfig(app);


app.listen(config.port, function() {
    console.log('Corriendo en el puerto %s', config.port);
});