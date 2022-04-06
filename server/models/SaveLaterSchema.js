const mongoose = require("mongoose");

const SavedLaterSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref : 'turkretailorsusers',
        required: true,
    },
    property: {
        type: mongoose.Types.ObjectId,
        ref : 'turkretailorsusers',
        required: true,
    },
}, {
    timestamps: true
});


const TurkRetailorsSavedLater = mongoose.model('TurkRetailorsSavedLater', SavedLaterSchema);

module.exports = TurkRetailorsSavedLater