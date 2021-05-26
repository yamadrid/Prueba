const CONTROLLER = require('./controllers/users.controller');
const PERMISSION = require('../common/middlewares/auth.permission.middleware');
const VALIDATION = require('../common/middlewares/auth.validation.middleware');
const CONFIG = require('../common/config/env.config');

const ADMIN = CONFIG.permissionLevels.ADMIN;
const FREE = CONFIG.permissionLevels.NORMAL_USER;

exports.routesConfig = function(app) {
    app.post('/users', [
        CONTROLLER.insert
    ]);
    app.get('/users', [
        VALIDATION.validJWTNeeded,
        PERMISSION.minimumPermissionLevelRequired(FREE),
        CONTROLLER.list
    ]);
    app.get('/users/:userId', [
        VALIDATION.validJWTNeeded,
        PERMISSION.minimumPermissionLevelRequired(FREE),
        PERMISSION.onlySameUserOrAdminCanDoThisAction,
        CONTROLLER.getById
    ]);
    app.patch('/users/:userId', [
        VALIDATION.validJWTNeeded,
        PERMISSION.minimumPermissionLevelRequired(FREE),
        PERMISSION.onlySameUserOrAdminCanDoThisAction,
        CONTROLLER.patchById
    ]);
    app.delete('/users/:userId', [
        VALIDATION.validJWTNeeded,
        PERMISSION.minimumPermissionLevelRequired(ADMIN),
        CONTROLLER.removeById
    ]);
};