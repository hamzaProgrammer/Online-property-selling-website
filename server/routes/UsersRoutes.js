const express = require('express');
const router = express.Router();
const {
    SignUpUser,
    LogInUser,
    updateProfilePic,
    updateProfileOfUser,
    getUserInfo,
    sendMail,
    checkOtpCode,
    updatePassword
} = require('../controllers/UsersControllers')
const multer = require("multer")
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './userImages/')
        //cb(null, '../products')
    },
    filename: function (req, file, cb) {
        cb(null, 'image-' + Date.now() + file.originalname)
    }
})
const upload = multer({
    storage: storage,
});


// Sign Up user
router.post('/api/users/signup', SignUpUser)

// Sign In user
router.post('/api/users/signin', LogInUser)

// send amil in case of forget password
router.put('/api/users/sendMail/:email', sendMail)

// check code sent
router.put('/api/users/checkSentCode/:email', checkOtpCode)

// update password
router.put('/api/users/updatePassword/:email', updatePassword)

// upload profile picture
router.put('/api/users/uploadProfilePic/:id', upload.single("profilePic") ,  updateProfilePic);

// update profiler info
router.put('/api/users/updateProfileInfo/:id', updateProfileOfUser);

// get profiler info
router.get('/api/users/getProfileInfo/:id', getUserInfo);


module.exports = router;