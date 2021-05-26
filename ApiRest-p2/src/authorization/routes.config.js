const VERIFY = require('./middlewares/verify.user.middleware');
const CONTROLLER = require('./controllers/authorization.controller');
const MIDDLEWARE = require('../common/middlewares/auth.validation.middleware');

exports.routesConfig = function(app) {

    app.post('/auth', [
        VERIFY.hasAuthValidFields,
        VERIFY.isPasswordAndUserMatch,
        CONTROLLER.login
    ]);

    app.post('/auth/refresh', [
        MIDDLEWARE.validJWTNeeded,
        MIDDLEWARE.verifyRefreshBodyField,
        MIDDLEWARE.validRefreshNeeded,
        CONTROLLER.login
    ]);
};