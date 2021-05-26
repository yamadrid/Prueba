const COUNTRY = require('../models/countries.model');

exports.list = (req, res) => {
    COUNTRY.list()
        .then((result) => {
            res.status(200).send(result);
        })
};