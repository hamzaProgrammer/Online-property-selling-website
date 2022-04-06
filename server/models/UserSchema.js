const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    listedProperties: {
        type : mongoose.Types.ObjectId,
        ref : 'turkretailorsproperties',
    },
    soldProperties: {
        type : mongoose.Types.ObjectId,
        ref : 'turkretailorsproperties',
    },
    savedSearches: {
        type: [String],
    },
    profilePic: {
        type: String,
        default : ''
    },
    address: {
        type: String,
        default : ''
    },
    phoneNo: {
        type: String,
        default : ''
    },
    otpCode : {
        type : Number,
        default : ''
    },
    codeSentTime : {
        type : Date,
        default : null
    }
}, {
    timestamps: true
});


const TurkRetailorsUsers = mongoose.model('TurkRetailorsUsers', UserSchema);

module.exports = TurkRetailorsUsers