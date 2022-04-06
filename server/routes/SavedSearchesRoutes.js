const express = require('express');
const router = express.Router();
const {
    SaveNewSearch,
    getMySavedSearches,
    deleteSingleSavedSearch
} = require('../controllers/SavedSearchesController')


// save New search
router.post('/api/savedSearches/addNew', SaveNewSearch)

// getting saved searches of user
router.get('/api/savedSearches/getAllSavedSearches/:user', getMySavedSearches)

// deleting single saved searches of user
router.delete('/api/savedSearches/deleteSingleSavedSearches/:user/:id', deleteSingleSavedSearch)


module.exports = router;