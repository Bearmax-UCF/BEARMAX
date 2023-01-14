const mongoose = require('mongoose')

const User = new mongoose.Schema(
    {
        FirstName: {type: String, required: true},
        LastName: {type: String, required: true},
        Email: {type: String, required: true, unique: true},
        Password: {type: String, required: true},

        OldPass: {type: Array},
        AccountType: {type: Boolean}
    },
    { 
        collection: 'UserAccount' 
    }
);

const model = mongoose.model('UserData', User)

module.exports = model