const mongoose = require('mongoose')

const GalvanicSkinResponse = new mongoose.Schema(
    {
       GSRData: {type: Array},
       GSRTime: {type: Array},
       EventTime: {type: Array},
       UserID: {type: String}
    },
    { 
        collection: 'GalvanicSkinResponse' 
    }
);

const model = mongoose.model('GalvanicSkinResponse', GalvanicSkinResponse)

module.exports = model