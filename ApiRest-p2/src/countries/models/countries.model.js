const MONGOOSE = require('../../common/services/mongoose.service').mongoose;
const SCHEMA = MONGOOSE.Schema;

const countrySchema = new SCHEMA({
    name: String,
    flag: String,
    area: String,
    population: String
});

countrySchema.virtual('id').get(function() {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
countrySchema.set('toJSON', {
    virtuals: true
});


const Country = MONGOOSE.model('Contries', countrySchema);

exports.list = () => {
    return new Promise((resolve, reject) => {
        Country.find()
            .exec(function(err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};