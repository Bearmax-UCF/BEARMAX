import mongoose from 'mongoose';

/*
Correct/Wrong Index Correlations:
0: Happy
1: Sad
2: Angry
3: Neutral
*/

const EmotionRecognition = new mongoose.Schema(
    {
        Correct: { type: Array },
        Wrong: { type: Array },
        GameFin: Date,
        UserID: String
    },
    {
        collection: 'EmotionRecognition'
    }
);

const model = mongoose.model('EmotionRecognition', EmotionRecognition)

export default model
