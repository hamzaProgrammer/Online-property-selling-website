const mongoose = require("mongoose");

const SavedSearchesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref : 'turkretailorsusers',
        required: true,
    },
    savedSearch: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});


const TurkRetailorsSavedSearches = mongoose.model('TurkRetailorsSavedSearches', SavedSearchesSchema);

module.exports = TurkRetailorsSavedSearches