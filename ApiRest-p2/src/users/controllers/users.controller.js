const USER = require('../models/users.model');
const CRYPTO = require('crypto');

exports.insert = (req, res) => {
    let salt = CRYPTO.randomBytes(16).toString('base64');
    let hash = CRYPTO.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
    req.body.permissionLevel = 1;
    USER.createUser(req.body)
        .then((result) => {
            res.status(201).send({ id: result._id });
        });
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    USER.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    USER.findById(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};
exports.patchById = (req, res) => {
    if (req.body.password) {
        let salt = CRYPTO.randomBytes(16).toString('base64');
        let hash = CRYPTO.createHmac('sha512', salt).update(req.body.password).digest("base64");
        req.body.password = salt + "$" + hash;
    }

    USER.patchUser(req.params.userId, req.body)
        .then((result) => {
            res.status(204).send({});
        });

};

exports.removeById = (req, res) => {
    USER.removeById(req.params.userId)
        .then((result) => {
            res.status(204).send({});
        });
};