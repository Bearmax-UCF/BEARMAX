const mongoose = require('mongoose')

const EmotionRecognition = new mongoose.Schema(
    {
        Correct: {type: Array},
        Wrong: {type: Array},
        TotalPlays: {type: int},
        NumCorrect: {type: int}
    },
    { 
        collection: 'EmotionRecognition' 
    }
);

const model = mongoose.model('EmotionRecognition', EmotionRecognition)

module.exports = model