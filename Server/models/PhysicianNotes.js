const mongoose = require('mongoose')

const PhysicianNotes = new mongoose.Schema(
    {
        Note: {type: String}
    },
    { 
        collection: 'PhysicianNotes' 
    }
);

const model = mongoose.model('PhysicianNotes', PhysicianNotes)

module.exports = model