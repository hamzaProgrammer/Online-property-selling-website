const express = require('express');
const router = express.Router();
const {
    addNewSaveLater,
    getMySavedLaterProperties,
    deleteSingleSavedLater
} = require('../controllers/SaveLaterControllers')


// save New save later
router.post('/api/savaLater/addNew', addNewSaveLater)

// getting saved later of user
router.get('/api/savedLater/getAllSavedLater/:user', getMySavedLaterProperties)

// deleting single saved later of user
router.delete('/api/savedLater/deleteSingleSavedLater/:user/:id', deleteSingleSavedLater)


module.exports = router;