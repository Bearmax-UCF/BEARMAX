const mongoose = require('mongoose')

const ExtraChildInfo = new mongoose.Schema(
    {
        BearName: {type: String},
        UserName: {type: String},
        UserID: {type: String}
    },
    { 
        collection: 'ExtraChildInfo' 
    }
);

const model = mongoose.model('ExtraChildInfo', ExtraChildInfo)

module.exports = model