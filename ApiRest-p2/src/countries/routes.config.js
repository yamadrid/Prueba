const CONTROLLER = require('./controllers/countries.controller');
const PERMISSION = require('../common/middlewares/auth.permission.middleware');
const VALIDATION = require('../common/middlewares/auth.validation.middleware');
const CONFIG = require('../common/config/env.config');

const ADMIN = CONFIG.permissionLevels.ADMIN;

exports.routesConfig = function(app) {
    app.get('/countries', [
        VALIDATION.validJWTNeeded,
        PERMISSION.minimumPermissionLevelRequired(ADMIN),
        CONTROLLER.list
    ]);
};