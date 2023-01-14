const mongoose = require('mongoose')

const Temperature = new mongoose.Schema(
    {
        TempData: {type: Array},
        TempTime: {type: Array},
        EventTime: {type: Array},
        UserID: {type: String}
    },
    { 
        collection: 'Temperature' 
    }
);

const model = mongoose.model('Temperature', Temperature)

module.exports = model