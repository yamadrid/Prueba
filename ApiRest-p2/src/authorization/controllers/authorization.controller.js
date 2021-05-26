const JWT_SECRET = require('../../common/config/env.config.js').jwt_secret,
    JWT = require('jsonwebtoken');
const CRYPTO = require('crypto');
const UUID = require('uuid');

exports.login = (req, res) => {
    try {
        let refreshId = req.body.userId + JWT_SECRET;
        let salt = CRYPTO.randomBytes(16).toString('base64');
        let hash = CRYPTO.createHmac('sha512', salt).update(refreshId).digest("base64");
        req.body.refreshKey = salt;
        let token = JWT.sign(req.body, JWT_SECRET);
        let b = Buffer.from(hash);
        let refresh_token = b.toString('base64');
        res.status(201).send({ accessToken: token, refreshToken: refresh_token });
    } catch (err) {
        res.status(500).send({ errors: err });
    }
};

exports.refresh_token = (req, res) => {
    try {
        req.body = req.jwt;
        let token = JWT.sign(req.body, JWT_SECRET);
        res.status(201).send({ id: token });
    } catch (err) {
        res.status(500).send({ errors: err });
    }
};