const mongoose = require('mongoose')

const SensorCalibration = new mongoose.Schema(
    {
       BaseTemp: {type: double},
       BasePuls: {type: double},
       BaseResp: {type: double},
       BaseSCL: {type: double},
       BaseSCR: {type: double},
       BaseLat: {type: double},
       BaseRise: {type: double},
       BaseRecov: {type: double},
       BaseSamp: {type: double},
       UserID: {type: String}
    },
    { 
        collection: 'SensorCalibration' 
    }
);

const model = mongoose.model('SensorCalibration', SensorCalibration)

module.exports = model