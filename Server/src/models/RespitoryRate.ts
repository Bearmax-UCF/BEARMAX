const mongoose = require('mongoose')

const RespitoryRate = new mongoose.Schema(
    {
        RRData: {type: Array},
        RRTime: {type: Array},
        EventTime: {type: Array},
        UserID: {type: String}
    },
    { 
        collection: 'RespitoryRate' 
    }
);

const model = mongoose.model('RespitoryRate', RespitoryRate)

module.exports = model