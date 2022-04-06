const Users = require('../models/UserSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const URL = "http://localhost:8080"
const nodeMailer = require("nodemailer");



// Sign Up User
const SignUpUser = async (req, res) => {
    const {email , password} = req.body;

    if (!email || !password ) {
        return res.json({
            success: false,
            message: "Please Provide All Credentials"
        });
    } else {
        // if admin already exists
        const isExist = await Users.findOne({
            email: email
        })
        if (isExist) {
            return res.json({
                success: false,
                message : "User Already Exists With Same Email"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10); // hashing password

        const newUser = new Users({
            ...req.body,
            password: hashedPassword
        })

        try {
            await newUser.save();

            res.status(201).json({
                success: true,
                message: 'User SuccessFully Signed Up'
            })
        } catch (error) {
            console.log("Error in SignUpUser and error is : ", error)
            res.status(201).json({
                success: false,
                message : "Some Server Side Error Has Ocurred"
            })
        }
    }
}

// Logging In User
const LogInUser = async (req, res) => {
    const {email , password } = req.body

    if (!email || !password) {
        return res.json({
            success: false,
            message: "Please Provide All Credediantials"
        })
    } else {
        try {
            const isExist = await Users.findOne({
                email: email
            } , {createdAt : 0 , updatedAt : 0 , __v : 0});

            if (!isExist) {
                return res.json({
                    success: false,
                    message: "InValid Credientials"
                })
            }

            const isPasswordCorrect = await bcrypt.compare(password, isExist.password); // comparing password
            if (!isPasswordCorrect) {
                return res.json({
                    message: 'Invalid Credentials'
                })
            }

            const token = jwt.sign({id: isExist._id} , JWT_SECRET_KEY , {expiresIn: '24h'}); // gentating token
            return res.json({
                User : isExist ,
                success: true,
                token
            });
        } catch (error) {
            console.log("Error in LogInUser and error is : ", error)
            return res.json({
                success: false,
                message : "Some Server Side Error Ocurred"
            });
        }
    }

}

// sending mails
const sendMail = async(req,res) => {
    const {email} = req.params;
    const data = await Users.find({email: email});

    if(data.length > 0){
        let randomNo = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
        const curntDateTime = new Date();
        await Users.findOneAndUpdate({email : email},{ $set: {...data ,  codeSentTime : curntDateTime , otpCode : randomNo } }, {new: true })

        // step 01
        const transport= nodeMailer.createTransport({
            service : "gmail",
            auth: {
                user : 'doorstep1000@gmail.com', //own eamil
                pass: 'hamza_78674', // own password
            }
        })
        // setp 02
        const mailOption = {
            from: 'doorstep1000@gmail.com', // sender/own email
            to: email, // reciver eamil
            subject: "Secret Code for Changing Password of Trulia Website ",
            text : `Dear Member , Your Secret Code is ${randomNo}. This will expire in next 60 seconds.`
        }
        // step 03
        transport.sendMail(mailOption, (err, info) => {
            if (err) {
                console.log("Error occured : ", err)
                return res.json({ success: false, message : " Error in sending mail" , err})
            } else {
                console.log("Email Sent and info is : ", info.response)
                return res.json({success: true,  message: 'Email Sent SuccessFully' })
            }
        })
    }else{
        return res.json({ success : false , message : "User Not Found"})
    }
}

// Checking OtpCode
const checkOtpCode = async (req, res) => {
    const {email} = req.params;
    const data = await Users.find({email : email});

    const {otpCode } = req.body;
    if (data.length > 0){
        if(data[0].codeSentTime === null){
            return res.status(201).json({success : false , message: 'You have not sent any code yet'})
        }
        let curntDateTime = new Date();
        let diff = new Date(curntDateTime.getTime() - data[0].codeSentTime.getTime()) / 1000; //  getting time diff in seconds
        parseInt(diff)
        if (diff < 60) {  // checking if sent time is less than 60 seconds
                try{
                    if(otpCode == data[0].otpCode){
                        const update = await Users.findOneAndUpdate({email: email}  ,{ $set: { ...data.body , codeSentTime : null , otpCode : null }} , {new: true} )

                        if(update){
                            return res.status(201).json({success : true , message : "OTP Code Matched Successfully"})
                        }
                    }else{
                        return res.status(201).json({ success: false , message: 'InValid Token'})
                    }
                }catch (error) {
                    console.log("Error is :", error)
                    return res.status(201).json({success: false,  message: 'Some Error Ocurred' , error})
                }
            }else{
                return res.status(201).json({ success: false, message: 'Time for Your Token Expired' })
            }
        }else{
            return res.status(201).json({success: false ,  message: 'InValid Credientials' })
        }
}

// updating user password
const updatePassword = async (req, res) => {
    const {email} = req.params;
    const {myEmail} = req.body


    if (!email || !myEmail) {
        return res.json({
            success: false,
            message: "Please Provide All Credientials"
        })
    } else {
        try {
            let isExist = await Users.findOne({email : email});

            if (!isExist) {
                return res.json({
                    success: false,
                    message: "User Not Found"
                })
            }

            const hashedPassword = await bcrypt.hash(myEmail, 10); // hashing password
            isExist.password = hashedPassword;

            await Users.findOneAndUpdate(email, {$set : {...isExist}} , {new : true})

            return res.json({
                updatedImage : isExist.profilePic ,
                success: true,
                message : "User Password SuccessFully Updated"
            });
        } catch (error) {
            console.log("Error in updatePassword and error is : ", error)
            return res.json({
                success: false,
                message : "Could Not Update Password"
            });
        }
    }

}

// updating Profile Picture
const updateProfilePic = async (req, res) => {
    const {id} = req.params;

    if(!req.file){
        return res.json({
            success: false,
            message: "Image Not Sent"
        })
    }

    if ((req.file.mimetype  !== "image/jpeg" && req.file.mimetype  !== "image/jpg" && req.file.mimetype  !== "image/webP" && req.file.mimetype  !== "image/png")) {
        return res.json({
            success: false,
            message: "Only Image Type File is Allowed to Upload"
        });
    }

    if (!id || !req.file) {
        return res.json({
            success: false,
            message: "Please Provide All Credediantials"
        })
    } else {
        try {
            let isExist = await Users.findById(id , {createdAt : 0 , updatedAt : 0 , __v : 0});

            if (!isExist) {
                return res.json({
                    success: false,
                    message: "User Not Found"
                })
            }

            let lower = URL + "/userImages/" + req.file.filename.toLowerCase();
            isExist.profilePic = lower;

            await Users.findByIdAndUpdate(id, {$set : {...isExist}} , {new : true})

            return res.json({
                updatedImage : isExist.profilePic ,
                success: true,
                message : "User Profile Image SuccessFully Updated"
            });
        } catch (error) {
            console.log("Error in updateProfilePic and error is : ", error)
            return res.json({
                success: false,
                message : "Some Server Side Error Ocurred"
            });
        }
    }

}

// updating Profile of user
const updateProfileOfUser = async (req, res) => {
    const {id} = req.params;

    if (!id || !req.body) {
        return res.json({
            success: false,
            message: "Please Provide All Credentials"
        })
    } else {
        try {
            const isExist = await Users.findById(id);
            if(!isExist) {
                return res.json({
                    success: false,
                    message : "User Not Found"
                });
            }

            if(req.body.password){
                req.body.password = await bcrypt.hash(req.body.password, 10); // hashing password
            }

            await Users.findByIdAndUpdate(id , {$set : {...req.body}} , {new : true})

            const updatedUser = await Users.findById(id)

            return res.json({
                updatedProfile : updatedUser ,
                success: true,
                message : "User Profile SuccessFully Uploaded"
            });
        } catch (error) {
            console.log("Error in updateProfileOfUser and error is : ", error)
            return res.json({
                success: false,
                message : "Some Server Side Error Ocurred"
            });
        }
    }

}

//getting user info
const getUserInfo = async (req, res) => {
    const {id} = req.params;

    if (!id) {
        return res.json({
            success: false,
            message: "Please Provide All Credediantials"
        })
    } else {
        try {
            const isExist = await Users.findById(id);

            if (!isExist) {
                return res.json({
                    success: false,
                    message: "User Not Found"
                })
            }

            return res.json({
                User : isExist ,
                success: true,
                message : "User Profile SuccessFully Updated"
            });
        } catch (error) {
            console.log("Error in getUserInfo and error is : ", error)
            return res.json({
                success: false,
                message : "Some Server Side Error Ocurred"
            });
        }
    }

}



module.exports = {
    SignUpUser,
    LogInUser,
    updateProfilePic,
    updateProfileOfUser,
    getUserInfo,
    sendMail,
    checkOtpCode,
    updatePassword
}