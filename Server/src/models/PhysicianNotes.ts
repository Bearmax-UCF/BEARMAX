import mongoose from 'mongoose';

const PhysicianNotes = new mongoose.Schema(
    {
        Note: {type: String}
    },
    { 
        collection: 'PhysicianNotes' 
    }
);

const model = mongoose.model('PhysicianNotes', PhysicianNotes)

export default model