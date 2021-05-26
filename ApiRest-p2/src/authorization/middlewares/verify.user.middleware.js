const USER = require('../../users/models/users.model');
const CRYPTO = require('crypto');

exports.hasAuthValidFields = (req, res, next) => {
    let errors = [];

    if (req.body) {
        if (!req.body.email) {
            errors.push('Campo de correo electrónico faltante');
        }
        if (!req.body.password) {
            errors.push('Campo de contraseña faltante');
        }

        if (errors.length) {
            return res.status(400).send({ errors: errors.join(',') });
        } else {
            return next();
        }
    } else {
        return res.status(400).send({ errors: 'Campos de correo electrónico y contraseña faltantes' });
    }
};

exports.isPasswordAndUserMatch = (req, res, next) => {
    USER.findByEmail(req.body.email)
        .then((user) => {
            if (!user[0]) {
                res.status(404).send({});
            } else {
                let passwordFields = user[0].password.split('$');
                let salt = passwordFields[0];
                let hash = CRYPTO.createHmac('sha512', salt).update(req.body.password).digest("base64");
                if (hash === passwordFields[1]) {
                    req.body = {
                        userId: user[0]._id,
                        email: user[0].email,
                        permissionLevel: user[0].permissionLevel,
                        provider: 'email',
                        name: user[0].firstName + ' ' + user[0].lastName,
                    };
                    return next();
                } else {
                    return res.status(400).send({ errors: ['Correo electrónico o contraseña invalida'] });
                }
            }
        });
};