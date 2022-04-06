const express = require('express');
const router = express.Router();
const {
    addNewProperty,
    getAllPropertiesOfCity,
    getAllPropertiesWithFilters,
    getSingleProperty,
    getAllRelatedProperties,
    getAllLatestProperties,
    getAllRecentPropertiesofUser,
    changeStatusOfProperty,
    deleteSingleProperty,
    getSellingPropertiesofUser,
    getSoldPropertiesofUser,
    updateSingleProperty,
    getAllPropertiesOfCityOfUsersOnly,
    getAllPropertiesOfCityOfAdminOnly,
    getAllSellPropertiesOfCity,
    getAllPropertiesWithFiltersSellOnly,
    getAllSellPropertiesOfCityOfUsersOnly,
    getAllPropertiesSellOfCityOfAdminOnly,
    getAllRentPropertiesOfCity,
    getAllRentPropertiesOfCityOfUsersOnly,
    getAllRentPropOfCityOfAdminOnly,
    gettingSubscription,
    makeStripePayment
} = require('../controllers/PropertiesControllers')
const multer = require("multer")
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './propertyImages/')
        //cb(null, '../products')
    },
    filename: function (req, file, cb) {
        cb(null, 'image-' + Date.now() + file.originalname)
    }
})
const upload = multer({
    storage: storage,
});

const cpUpload = upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 } , { name: 'image3', maxCount: 1 }])
// add new property
router.post('/api/properties/addNew', cpUpload , addNewProperty)

// update property
router.put('/api/properties/updateProperty/:id', cpUpload , updateSingleProperty)

// get all properties listed in a city
/router.get('/api/properties/getAllOfACity/:city', getAllPropertiesOfCity)

// get properties with filters
router.get('/api/properties/getPropertiesWithFilter', getAllPropertiesWithFilters);

// get single property
router.get('/api/properties/getSingleProperty/:id', getSingleProperty);

// get all related  properties
router.get('/api/properties/getAllRelatedProperties/:city/:user', getAllRelatedProperties);

// get all latest properties
router.get('/api/properties/getAllLatestProperties', getAllLatestProperties);

// get all recent properties of a user
router.get('/api/properties/getAllRecentProperties/:id', getAllRecentPropertiesofUser);

// change status of property
router.put('/api/properties/changeStatusOfProperty/:id/:properiter', changeStatusOfProperty);

// delete single property
router.delete('/api/properties/deleteSingleProperty/:id/:properiter', deleteSingleProperty);

// get all selling properties of a user
router.get('/api/properties/getAllSellPropertiesOfUser/:id', getSellingPropertiesofUser);

// get all sold properties of a user
router.get('/api/properties/getAllSoldPropertiesOfUser/:id', getSoldPropertiesofUser);

// get all properties of a city of users only
router.get('/api/properties/getAllPropertiesOfUsersOnly/:city', getAllPropertiesOfCityOfUsersOnly);

// get all properties of a city of admin only
router.get('/api/properties/getAllPropertiesOfAdminOnly/:city', getAllPropertiesOfCityOfAdminOnly);

// get all sell properties of a city of admin only
router.get('/api/properties/getAllSellProperties/:city', getAllSellPropertiesOfCity);

// get all sell properties with filters
router.get('/api/properties/getAllSellPropertiesFilters', getAllPropertiesWithFiltersSellOnly);

// get all sell properties by users only
router.get('/api/properties/getAllSellPropertiesByUsers/:city', getAllSellPropertiesOfCityOfUsersOnly);

// get all sell properties by admin only
router.get('/api/properties/getAllSellPropertiesByAdmin/:city', getAllPropertiesSellOfCityOfAdminOnly);

// get all rent properties by users only
router.get('/api/properties/getAllRentPropertiesByAdmin/:city', getAllRentPropertiesOfCity);

// get all rent properties by users only
router.get('/api/properties/getAllRentPropertiesByUsers/:city', getAllRentPropertiesOfCityOfUsersOnly);

// get all rent properties by admin only
router.get('/api/properties/getAllRentPropertiesByAdmin/:city', getAllRentPropOfCityOfAdminOnly);

// get subscription 
router.put('/api/properties/getSubscription/:id/:type/:userId', gettingSubscription);

// stripe payment
router.put('/api/properties/makePayments', makeStripePayment);


module.exports = router;