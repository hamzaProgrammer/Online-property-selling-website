const axios = require('axios');

const API = axios.create({
    baseURL: 'http://localhost:8080'
    //baseURL: ' https://oturq-trading-app.herokuapp.com'
});

// this is for using local storage in headers, otherwise it will not work
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});


// Admin Routes
const signInAdmin = (data) => API.post(`/api/users/signin`, data);
const signUpAdmin = (data) => API.post(`/api/users/signup`, data);
const sendMail = (email) => API.put(`/api/users/sendMail/${email}`);
const checkOtp = (email , userEmail) => API.put(`/api/users/checkSentCode/${userEmail}` , email );
const updatePassword = (email , userEmail) => API.put(`/api/users/updatePassword/${userEmail}` , email );



// getting all properties by city
const getPropertiesByCity = (city) => API.get(`/api/properties/getAllOfACity/${city}`);
const getSingleProperty = (id) => API.get(`/api/properties/getSingleProperty/${id}`);
const getRelatedProperties = (id) => API.get(`/api/properties/getAllRelatedProperties/${id}`);
const getAllSellPropertiesOfUser = (id) => API.get(`/api/properties/getAllSellPropertiesOfUser/${id}`);
const getAllSoldPropertiesOfUser = (id) => API.get(`/api/properties/getAllSoldPropertiesOfUser/${id}`);
const addUserProperty = (data) => API.post(`/api/properties/addNew`, data);
const updateProperty = (data , id) => API.put(`/api/properties/updateProperty/${id}`, data);
const deleteMyProperty = (id , properiter) => API.delete(`/api/properties/deleteSingleProperty/${id}/${properiter}`);
const getUsersPropertiesOnly = (city) => API.get(`/api/properties/getAllPropertiesOfUsersOnly/${city}`);
const getAdminsPropertiesOnly = (city) => API.get(`/api/properties/getAllPropertiesOfAdminOnly/${city}`);
const getAllSellPropertiesOfCity = (city) => API.get(`/api/properties/getAllSellProperties/${city}`);
const getAllSellPropertiesOfCityByUsers = (city) => API.get(`/api/properties/getAllSellPropertiesByUsers/${city}`);
const getAllSellPropertiesOfCityByAdmin = (city) => API.get(`/api/properties/getAllSellPropertiesByAdmin/${city}`);
const getAllRentPropertiesOfCity = (city) => API.get(`/api/properties/getAllRentPropertiesByAdmin/${city}`);
const getAllRentPropertiesOfCityByUsers = (city) => API.get(`/api/properties/getAllRentPropertiesByUsers/${city}`);
const getAllRentPropertiesOfCityByAdmin = (city) => API.get(`/api/properties/getAllRentPropertiesByAdmin/${city}`);
const makeStripePayment = (data) => API.put(`/api/properties/makePayments` , data);
const getSubscription = (id, type, userId) => API.put(`/api/properties/getSubscription/${id}/${type}/${userId}`);
const sendMailForChatting = (data , id) => API.put(`/api/properties/sendMailToOwnerAndUser/${id}` , data);



// Users Routes
const getUserInfo = (id) => API.get(`/api/users/getProfileInfo/${id}`);
const updateUserInfo = (data, id) => API.put(`/api/users/updateProfileInfo/${id}` , data);
const uploadUserProfilePic = (data, id) => API.put(`/api/users/uploadProfilePic/${id}` , data);


//  Saved Searches Routes
const addNewSavedSearch = (data) => API.post(`/api/savedSearches/addNew`, data);
const getAllSavedSearches = (user) => API.get(`/api/savedSearches/getAllSavedSearches/${user}`);
const deleteSavedSearch = (user , id) => API.delete(`/api/savedSearches/deleteSingleSavedSearches/${user}/${id}`);


// Saved Later Properties
const addNewSavedLater = (data) => API.post(`/api/savaLater/addNew`, data);
const getAllSavedLaterOfUser = (user) => API.get(`/api/savedLater/getAllSavedLater/${user}`);
const deleteSavedLater = (user , id) => API.delete(`/api/savedLater/deleteSingleSavedLater/${user}/${id}`);



module.exports = {
    signUpAdmin,
    signInAdmin,
    getPropertiesByCity,
    getSingleProperty,
    getRelatedProperties,
    getAllSellPropertiesOfUser,
    getAllSoldPropertiesOfUser,
    getUserInfo,
    addUserProperty,
    updateProperty,
    deleteMyProperty,
    updateUserInfo,
    uploadUserProfilePic,
    getUsersPropertiesOnly,
    getAdminsPropertiesOnly,
    getAllSellPropertiesOfCity,
    getAllSellPropertiesOfCityByUsers,
    getAllSellPropertiesOfCityByAdmin,
    addNewSavedSearch,
    getAllSavedSearches,
    deleteSavedSearch,
    getAllRentPropertiesOfCity,
    getAllRentPropertiesOfCityByUsers,
    getAllRentPropertiesOfCityByAdmin,
    addNewSavedLater,
    getAllSavedLaterOfUser,
    deleteSavedLater,
    makeStripePayment,
    getSubscription,
    sendMail,
    checkOtp,
    updatePassword,
    sendMailForChatting
}