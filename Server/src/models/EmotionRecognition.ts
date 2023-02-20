const mongoose = require('mongoose')

const EmotionRecognition = new mongoose.Schema(
    {
        Correct: {type: Array},
        Wrong: {type: Array},
        NumCorrect: {type: Number},
        GameFin: {type: Number}
    },
    { 
        collection: 'EmotionRecognition' 
    }
);

const model = mongoose.model('EmotionRecognition', EmotionRecognition)

module.exports = model
