const Properties = require('../models/PropertiesSchema')
const Users = require('../models/UserSchema')
const Admins = require('../models/AdminSchema')
const URL = "http://localhost:8080"
const cron = require('node-cron');
const stripe = require('stripe')(process.env.Stripe_Secret_key)
const nodeMailer = require("nodemailer");


// node geo coder
const NodeGeocoder = require('node-geocoder');
const options = {
  provider: 'google',
  apiKey: 'AIzaSyDbvQuvGbCB0ghywwsM2tjlKBIPfXUSpHg', // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};
const geocoder = NodeGeocoder(options);


// add new property
const addNewProperty = async (req, res) => {
    const {name , address , price , beds , baths, rooms , bedrooms , totalArea , desc , properiter , city , houseType } = req.body;

    if(!req.files){
        console.log("files not got")
        return res.json({
            success: false,
            message: "Please Provide Images of Property Also"
        });
    }

    if(req.files.length > 3){
        return res.json({
            success: false,
            message: "You can upload maximum 3 images only"
        });
    }

    //for(let i = 0; i !== req.files.length; i++){
        if ((req.files.image1[0].mimetype  !== "image/jpeg" && req.files.image1[0].mimetype  !== "image/jpg" && req.files.image1[0].mimetype  !== "image/webP" && req.files.image1[0].mimetype  !== "image/png")) {
            return res.json({
                success: false,
                message: "First Image must of of Image Type Only"
            });
        }
        if ((req.files.image2[0].mimetype  !== "image/jpeg" && req.files.image2[0].mimetype  !== "image/jpg" && req.files.image2[0].mimetype  !== "image/webP" && req.files.image2[0].mimetype  !== "image/png")) {
            return res.json({
                success: false,
                message: "Second Image must of of Image Type Only"
            });
        }
        if ((req.files.image3[0].mimetype  !== "image/jpeg" && req.files.image3[0].mimetype  !== "image/jpg" && req.files.image3[0].mimetype  !== "image/webP" && req.files.image3[0].mimetype  !== "image/png")) {
            return res.json({
                success: false,
                message: "Third Image must of of Image Type Only"
            });
        }
    //}

        if (!name || !address || !price || !beds || !baths  || !bedrooms || !totalArea || !desc  || !properiter  || !city || !houseType) {
            return res.json({
                success: false,
                message: "Please Provide All Credentials"
            });
        } else {
            let isExistAdmin = null;
            let isExistUser = await Users.findById(properiter)
            if (!isExistUser) {
                isExistAdmin = await Admins.findById(properiter)
                if(!isExistAdmin){
                    return res.json({
                        success: false,
                        message : "Sorry, Only Admin or Registered Users Can Upload Property"
                    });
                }
            }

            const isExist = await Properties.findOne({
                name: name,
                address : address,
                price : price,
                properiter : properiter,
                status : 'sell'
            })
            if(isExist) {
                if (isExist.length > 0) {
                    return res.json({
                        success: false,
                        message : "Property Already Exists"
                    });
                }
            }

            // Using callback
            const result = await geocoder.geocode(address);

            req.body.coordinates = [result[0].latitude , result[0].longitude ]

            req.body.status = "sell";
            req.body.city = city.toLowerCase();
            req.body.images = []
            //for(let i = 0; i !== req.files.length; i++){
            let lower = URL + "/propertyImages/" + req.files.image1[0].filename.toLowerCase();
            req.body.images.push(lower)
            lower = URL + "/propertyImages/" + req.files.image2[0].filename.toLowerCase();
            req.body.images.push(lower)
            lower = URL + "/propertyImages/" + req.files.image3[0].filename.toLowerCase();
            req.body.images.push(lower)
            //}
            const newProperty = new Properties({
                ...req.body,
            })

            try {
                const newProp = await newProperty.save();
                if(isExistUser){
                    await Users.findByIdAndUpdate(properiter , {$push : {listedProperties :newProp._id.toString() }} , {new : true})
                }
                if(isExistAdmin){
                    await Admins.findByIdAndUpdate(properiter , {$push : {listedProperties : newProp._id}} , {new : true})
                }


                res.status(201).json({
                    success: true,
                    message: 'New Property Added SuccessFully'
                })
            } catch (error) {
                console.log("Error in addNewProperty and error is : ", error)
                res.status(504).json({
                    success: false,
                    message : "Some Server Side Error Has Ocurred"
                })
            }
        }
}

// update property
const updateSingleProperty = async (req, res) => {
    const {id} = req.params;
    if(!id){
        return res.json({
            success: false,
            message: "Id of Property is Required"
        });
    }
    if(req.files){
        if(req.files.image1){
            if (req.files.image1[0].mimetype  !== "image/jpeg" && req.files.image1[0].mimetype  !== "image/jpg" && req.files.image1[0].mimetype  !== "image/webP" && req.files.image1[0].mimetype  !== "image/png") {
                return res.json({
                    success: false,
                    message: "First Image must of of Image Type Only"
                });
            }
        }
        if(req.files.image2){
            if (req.files.image2[0].mimetype  !== "image/jpeg" && req.files.image2[0].mimetype  !== "image/jpg" && req.files.image2[0].mimetype  !== "image/webP" && req.files.image2[0].mimetype  !== "image/png") {
                return res.json({
                    success: false,
                    message: "Second Image must of of Image Type Only"
                });
            }
        }
        if(req.files.image3){
            if (req.files.image3[0].mimetype  !== "image/jpeg" && req.files.image3[0].mimetype  !== "image/jpg" && req.files.image3[0].mimetype  !== "image/webP" && req.files.image3[0].mimetype  !== "image/png") {
                return res.json({
                    success: false,
                    message: "Third Image must of of Image Type Only"
                });
            }
        }
    }

    if (!req.body && !req.files) {
        return res.json({
            success: false,
            message: "No Data Sent For Updation"
        });
    } else {
        let isExistAdmin = null;
        let isExistUser = await Users.findById(req.body.properiter)
        if (!isExistUser) {
            isExistAdmin = await Admins.findById(req.body.properiter)
            if(!isExistAdmin){
                return res.json({
                    success: false,
                    message : "Sorry, Only Admin or Registered Users Can Upload Property"
                });
            }
        }

        let isExist = await Properties.findById(id)
        if(!isExist) {
            if (isExist.length > 0) {
                return res.json({
                    success: false,
                    message : "Property Does Not Exists"
                });
            }
        }
        req.body.images = []
        if (req.files.image1) {
            let lower = URL + "/propertyImages/" + req.files.image1[0].filename.toLowerCase();
            req.body.images.push(lower)
        }else if(!req.files.image1){
            req.body.images[0] = isExist.images[0]
        }

        if (req.files.image2) {
            let lower = URL + "/propertyImages/" + req.files.image2[0].filename.toLowerCase();
            req.body.images.push(lower)
        }else if(!req.files.image2){
            req.body.images[1] = isExist.images[1]
        }

        if (req.files.image3) {
            let lower = URL + "/propertyImages/" + req.files.image3[0].filename.toLowerCase();
            req.body.images.push(lower)
        }else if(!req.files.image3){
            req.body.images[2] = isExist.images[2]
        }

        try {
            let updated = await Properties.findByIdAndUpdate(id, {$set : {...req.body}} , {new : true})

            res.status(201).json({
                success: true,
                Property : updated,
                message: 'New Property Added SuccessFully'
            })
        } catch (error) {
            console.log("Error in updateSingleProperty and error is : ", error)
            res.status(504).json({
                success: false,
                message : "Some Server Side Error Has Ocurred"
            })
        }
    }
}

// getting all properties of a city
const getAllPropertiesOfCity = async (req, res) => {
    const {city} = req.params;

    if (!city) {
        return res.json({
            success: false,
            message: "Please Provide All Credentials"
        })
    } else {
        try {
            const myCity = city.toLowerCase();
            let getAllSubsProperties = await Properties.find({subsType : {$ne : ""} , city : myCity} , {createdAt : 0 , updatedAt : 0 , __v : 0});

            // if any subscribe property is found
            if(getAllSubsProperties.length > 0){
                for(let i = 0; i !== getAllSubsProperties.length; i++){
                    let gotProp = await Properties.findOne({
                        city: myCity,
                        subsType : "",
                        _id : {$ne : getAllSubsProperties[i]._id }
                    });
                    if(gotProp){
                        getAllSubsProperties.push(gotProp);
                    }
                }
            }

            if (getAllSubsProperties.length < 1) {
                return res.json({
                    success: false,
                    message: "No Properties Found Listed in This City"
                })
            }

            return res.json({
                AllProperties : getAllSubsProperties ,
                success: true,
            });
        } catch (error) {
            console.log("Error in getAllPropertiesOfCity and error is : ", error)
            return res.json({
                success: false,
                message : "Could Not get Properties"
            });
        }
    }

}

// getting all properties of a city with filters
const getAllPropertiesWithFilters = async (req, res) => {
    let myFilter = {};

    if(req.query.city){
        myFilter = {...myFilter , city : req.query.city}
    }
    if(req.query.bedrooms){
        let myBed = Number(req.query.bedrooms)
        myFilter = {...myFilter , bedrooms : Number(myBed)}
    }
    if(req.query.houseType){
        myFilter = {...myFilter , houseType : req.query.houseType}
    }
    if(req.query.minPrice){
        //myFilter = {...myFilter , minPrice : Number(req.query.minPrice)}
    }
    // if(req.query.maxPrice){
    //     myFilter = {...myFilter , maxPrice : Number(req.query.maxPrice)}
    // }
    

    console.log("filters : ", myFilter )

    if (!req.query) {
        return res.json({
            success: false,
            message: "Please Provide Some Filters"
        })
    } else {
        try {
            
            const isExist = await Properties.find(myFilter   , {createdAt : 0 , updatedAt : 0 , __v : 0});

            if (isExist.length < 1) {
                return res.json({
                    success: false,
                    message: "No Properties Found Listed in This City"
                })
            }

            return res.json({
                AllProperties : isExist ,
                success: true,
            });
        } catch (error) {
            console.log("Error in getAllPropertiesWithFilters and error is : ", error)
            return res.json({
                success: false,
                message : "Could Not get Properties"
            });
        }
    }

}

// getting single property
const getSingleProperty = async (req, res) => {
    const {id} = req.params;
    if (!id) {
        return res.json({
            success: false,
            message: "Please Provide Some Filters"
        })
    } else {
        try {
            const isExist = await Properties.findById(id, {createdAt : 0 , updatedAt : 0 , __v : 0});

            if (!isExist) {
                return res.json({
                    success: false,
                    message: "Property Not  Found"
                })
            }

            return res.json({
                Property : isExist ,
                success: true,
            });
        } catch (error) {
            console.log("Error in getSingleProperty and error is : ", error)
            return res.json({
                success: false,
                message : "Could Not get Properties"
            });
        }
    }

}

// getting all properties related
const getAllRelatedProperties = async (req, res) => {
    const {id} = req.params;

    if (!id) {
        return res.json({
            success: false,
            message: "Please Provide All Required Fields"
        })
    } else {
        const prop = await Properties.findById(id);
        if(!prop){
                return res.json({
                success: false,
                message: "Property Not Found"
            })
        }

        try {
            let allProperties = [];
            let allIds = [];

            // getting same city properties
            const isExist = await Properties.find({city : prop.city, _id : {$ne : id }}, {createdAt : 0 , updatedAt : 0 , __v : 0}).limit(3);
            if(isExist.length > 0){
                for(let i = 0; i !== isExist.length ; i++){
                    allIds.push(isExist[i]._id);
                    allProperties.push(isExist[i]);
                }
            }
            allIds.push(id);

            // getting all other properties of user
            for(let i = 0; i !== allProperties.length; i++){
                let isEx = await Properties.findOne({_id : {$nin : allIds } , properiter : prop.properiter ,  city : prop.city}, {createdAt : 0 , updatedAt : 0 , __v : 0});
                if(isEx){
                    allProperties.push(isEx);
                    allIds.push(isEx._id)
                }
            }

            // getting all other properties of same city
            for(let i = 0; i !== allProperties.length; i++){
                let isEx = await Properties.findOne({_id : {$nin : allIds } ,  city : prop.city}, {createdAt : 0 , updatedAt : 0 , __v : 0});
                if(isEx){
                    allProperties.push(isEx);
                }
            }

            return res.json({
                Property : allProperties,
                success: true,
            });
        } catch (error) {
            console.log("Error in getAllRelatedProperties and error is : ", error)
            return res.json({
                success: false,
                message : "Could Not get Properties"
            });
        }
    }

}

// getting all latest properties related
const getAllLatestProperties = async (req, res) => {
    try {
        const allProp = await Properties.find({});
        let getAllSubsProperties = await Properties.find({subsType : {$ne : ""}} , {createdAt : 0 , updatedAt : 0 , __v : 0}).limit(10).sort(0);

        // if any subscribe property is found
        if(getAllSubsProperties.length > 0){
            for(let i = 0; i !== allProp.length; i++){
                let gotProp = await Properties.findOne({
                    subsType : "",
                    _id : {$ne : allProp[i]._id }
                });
                if(gotProp){
                    getAllSubsProperties.push(gotProp);
                }
            }
        }

        if (getAllSubsProperties.length < 1) {
            return res.json({
                success: false,
                message: "No Latest Properties Found"
            })
        }

        return res.json({
            LatestProperties : getAllSubsProperties ,
            success: true,
        });
    } catch (error) {
        console.log("Error in getAllLatestProperties and error is : ", error)
        return res.json({
            success: false,
            message : "Could Not get Properties"
        });
    }
}

// getting all recently uploaded properties of a user
const getAllRecentPropertiesofUser = async (req, res) => {
    const {id} = req.params;
    try {
        // getting same city properties
        const isExist = await Properties.find({properiter : id}, {createdAt : 0 , updatedAt : 0 , __v : 0}).limit(10).sort(0);

        return res.json({
            RecentProperties : isExist,
            success: true,
        });
    } catch (error) {
        console.log("Error in getAllRecentPropertiesofUser and error is : ", error)
        return res.json({
            success: false,
            message : "Could Not get Properties"
        });
    }
}

// chnage status of property to sold
const changeStatusOfProperty = async (req, res) => {
    const {id , properiter} = req.params;
    try {
        let isExist = await Properties.find({properiter : properiter , _id : id}, {createdAt : 0 , updatedAt : 0 , __v : 0}).limit(10).sort(0);

        if(!isExist){
            return res.json({
                success: false,
                message : "Property Not Found or You are Not Athurorized to Perform this Task"
            });
        }

        const checkUser = await Users.findById(properiter);
        if(checkUser){
            await Users.findByIdAndUpdate(properiter , {$push : {soldProperties : id} , $pull : {listedProperties : id}} , {new : true})
        }
        
        const checkAdmin = await Admins.findById(properiter);
        if(checkAdmin){
            await Admins.findByIdAndUpdate(properiter , {$push : {soldProperties : id} , $pull : {listedProperties : id}} , {new : true})
        }
        
        // updating property status
        isExist.status = "sold";
        await Properties.findByIdAndUpdate(id , {$set : {isExist}} , {new : true})

        return res.json({
            UpdatedProperty : isExist,
            success: true,
        });
    } catch (error) {
        console.log("Error in changeStatusOfProperty and error is : ", error)
        return res.json({
            success: false,
            message : "Could Not get Properties"
        });
    }
}

// delete single property
const deleteSingleProperty = async (req, res) => {
    const {id , properiter} = req.params;
    try {
        let isExist = await Properties.find({properiter : properiter , _id : id}, {createdAt : 0 , updatedAt : 0 , __v : 0}).limit(10).sort(0);

        if(!isExist){
            return res.json({
                success: false,
                message : "Property Not Found or You are Not Athurorized to Perform this Task"
            });
        }

        const checkUser = await Users.findById(properiter);
        if(checkUser){
            await Users.findByIdAndUpdate(properiter , {$pull : {soldProperties : id} , $pull : {listedProperties : id}} , {new : true})
        }

        const checkAdmin = await Admins.findById(properiter);
        if(checkAdmin){
            await Admins.findByIdAndUpdate(properiter , {$pull : {soldProperties : id} , $pull : {listedProperties : id}} , {new : true})
        }

        // deleting property
        await Properties.findByIdAndDelete(id)

        return res.json({
            message : "Property Deleted SuccessFully",
            success: true,
        });
    } catch (error) {
        console.log("Error in deleteSingleProperty and error is : ", error)
        return res.json({
            success: false,
            message : "Could Not delete Property"
        });
    }
}

// getting all listed for sell properties of a user
const getSellingPropertiesofUser = async (req, res) => {
    const {id} = req.params;
    try {
        const allProp = await Properties.find({});
        let getAllSubsProperties = await Properties.find({subsType : {$ne : ""} , properiter : id , status : 'sell'} , {createdAt : 0 , updatedAt : 0 , __v : 0}).limit(10).sort(0);

        // if any subscribe property is found
        if(getAllSubsProperties.length > 0){
            for(let i = 0; i !== allProp.length; i++){
                let gotProp = await Properties.findOne({
                    subsType : "",
                    properiter : id ,
                    status : 'sell',
                    _id : {$ne : allProp[i]._id }
                });
                if(gotProp){
                    getAllSubsProperties.push(gotProp);
                }
            }
        }

        if (getAllSubsProperties.length < 1) {
            return res.json({
                success: false,
                message: "No Latest Properties Found"
            })
        }

        return res.json({
            Properties : getAllSubsProperties ,
            success: true,
        });
    } catch (error) {
        console.log("Error in getSellingPropertiesofUser and error is : ", error)
        return res.json({
            success: false,
            message : "Could Not get Properties"
        });
    }
}

// getting all listed for sold properties of a user
const getSoldPropertiesofUser = async (req, res) => {
    const {id} = req.params;
    try {
        // getting same city properties
        const isExist = await Properties.find({properiter : id , status : 'sold'}, {createdAt : 0 , updatedAt : 0 , __v : 0}).limit(10).sort(0);

        return res.json({
            Properties : isExist,
            success: true,
        });
    } catch (error) {
        console.log("Error in getSoldPropertiesofUser and error is : ", error)
        return res.json({
            success: false,
            message : "Could Not get Properties"
        });
    }
}

// getting all properties of users of a city
const getAllPropertiesOfCityOfUsersOnly = async (req, res) => {
    const {city} = req.params;
    const AllAdmins = await Admins.find({} , {_id : 1});

    if (!city) {
        return res.json({
            success: false,
            message: "Please Provide All Credentials"
        })
    } else {
        try {
            const myCity = city.toLowerCase();
            const allProp = await Properties.find({});

            let getAllSubsProperties = await Properties.find({subsType : {$ne : ""} , city : myCity , properiter : {$nin : AllAdmins._id}} , {createdAt : 0 , updatedAt : 0 , __v : 0}).limit(10).sort(0);

            // if any subscribe property is found
            if(getAllSubsProperties.length > 0){
                for(let i = 0; i !== allProp.length; i++){
                    let gotProp = await Properties.findOne({
                        subsType : "",
                        city : myCity ,
                        properiter : {$nin : AllAdmins._id},
                        _id : {$ne : allProp[i]._id }
                    });
                    if(gotProp){
                        getAllSubsProperties.push(gotProp);
                    }
                }
            }

            if (getAllSubsProperties.length < 1) {
                return res.json({
                    success: false,
                    message: "No Properties Found Listed in This City By Users"
                })
            }

            return res.json({
                AllProperties : getAllSubsProperties ,
                success: true,
            });
        } catch (error) {
            console.log("Error in getAllPropertiesOfCityOfUsersOnly and error is : ", error)
            return res.json({
                success: false,
                message : "Could Not get Properties"
            });
        }
    }

}

// getting all properties of admin of a city
const getAllPropertiesOfCityOfAdminOnly = async (req, res) => {
    const {city} = req.params;
    const AllUsers = await Users.find({} , {_id : 1});

    if (!city) {
        return res.json({
            success: false,
            message: "Please Provide All Credentials"
        })
    } else {
        try {
            const allProp = await Properties.find({});
            const myCity = city.toLowerCase();
            let getAllSubsProperties = await Properties.find({subsType : {$ne : ""} , city: myCity , properiter : {$nin : AllUsers}} , {createdAt : 0 , updatedAt : 0 , __v : 0}).limit(10).sort(0);

            // if any subscribe property is found
            if(getAllSubsProperties.length > 0){
                for(let i = 0; i !== allProp.length; i++){
                    let gotProp = await Properties.findOne({
                        subsType : "",
                        city:  myCity,
                        properiter : {$nin : AllUsers},
                        _id : {$ne : allProp[i]._id }
                    });
                    if(gotProp){
                        getAllSubsProperties.push(gotProp);
                    }
                }
            }

            if (getAllSubsProperties.length < 1) {
                return res.json({
                    success: false,
                    message: "No Properties Found Listed in This City By Admins"
                })
            }

            return res.json({
                AllProperties : getAllSubsProperties ,
                success: true,
            });
        } catch (error) {
            console.log("Error in getAllPropertiesOfCityOfAdminOnly and error is : ", error)
            return res.json({
                success: false,
                message : "Could Not get Properties"
            });
        }
    }

}

// getting all sell properties of admin of a city
const getAllSellPropertiesOfCity = async (req, res) => {
    const {city} = req.params;

    if (!city) {
        return res.json({
            success: false,
            message: "Please Provide All Credentials"
        })
    } else {
        try {
            const allProp = await Properties.find({});
            const myCity = city.toLowerCase();
            let getAllSubsProperties = await Properties.find({subsType : {$ne : ""} , city: myCity , status : 'sell'} , {createdAt : 0 , updatedAt : 0 , __v : 0}).limit(10).sort(0);

            // if any subscribe property is found
            if(getAllSubsProperties.length > 0){
                for(let i = 0; i !== allProp.length; i++){
                    let gotProp = await Properties.findOne({
                        subsType : "",
                        city: myCity ,
                        status : 'sell',
                        _id : {$ne : allProp[i]._id }
                    });
                    if(gotProp){
                        getAllSubsProperties.push(gotProp);
                    }
                }
            }

            if (getAllSubsProperties.length < 1) {
                return res.json({
                    success: false,
                    message: "No Properties Found Listed in This City By Admins"
                })
            }

            return res.json({
                AllProperties : getAllSubsProperties ,
                success: true,
            });
        } catch (error) {
            console.log("Error in getAllSellPropertiesOfCity and error is : ", error)
            return res.json({
                success: false,
                message : "Could Not get Properties"
            });
        }
    }

}

// getting all properties of a city with filters for sell only
const getAllPropertiesWithFiltersSellOnly = async (req, res) => {
    console.log("rnning")
    let myFilter = {};

    if(req.query.city){
        myFilter = {...myFilter , city : req.query.city}
    }
    if(req.query.bedrooms){
        let myBed = Number(req.query.bedrooms)
        myFilter = {...myFilter , bedrooms : Number(myBed)}
    }
    if(req.query.houseType){
        myFilter = {...myFilter , houseType : req.query.houseType}
    }
    if(req.query.minPrice){
        //myFilter = {...myFilter , minPrice : Number(req.query.minPrice)}
    }
    // if(req.query.maxPrice){
    //     myFilter = {...myFilter , maxPrice : Number(req.query.maxPrice)}
    // }
    myFilter = {...myFilter , status : "sell"}
    console.log("filters : ",myFilter )
    if (!req.query) {
        return res.json({
            success: false,
            message: "Please Provide Some Filters"
        })
    } else {
        try {
            const isExist = await Properties.find(myFilter , {createdAt : 0 , updatedAt : 0 , __v : 0});

            if (isExist.length < 1) {
                return res.json({
                    success: false,
                    message: "No Properties Found For Sell"
                })
            }

            return res.json({
                AllProperties : isExist ,
                success: true,
            });
        } catch (error) {
            console.log("Error in getAllPropertiesWithFiltersSellOnly and error is : ", error)
            return res.json({
                success: false,
                message : "Could Not get Properties"
            });
        }
    }

}

// getting all properties of users of a city for sell
const getAllSellPropertiesOfCityOfUsersOnly = async (req, res) => {
    const {city} = req.params;
    const AllAdmins = await Admins.find({} , {_id : 1});

    if (!city) {
        return res.json({
            success: false,
            message: "Please Provide All Credentials"
        })
    } else {
        try {
            const allProp = await Properties.find({});
            const myCity = city.toLowerCase();
            let getAllSubsProperties = await Properties.find({subsType : {$ne : ""} , city: myCity,  properiter : {$nin : AllAdmins._id}, status : 'sell'} , {createdAt : 0 , updatedAt : 0 , __v : 0}).limit(10).sort(0);

            // if any subscribe property is found
            if(getAllSubsProperties.length > 0){
                for(let i = 0; i !== allProp.length; i++){
                    let gotProp = await Properties.findOne({
                        subsType : "",
                        city: myCity,
                        properiter : {$nin : AllAdmins._id},
                        status : 'sell',
                        _id : {$ne : allProp[i]._id }
                    });
                    if(gotProp){
                        getAllSubsProperties.push(gotProp);
                    }
                }
            }

            if (getAllSubsProperties.length < 1) {
                return res.json({
                    success: false,
                    message: "No Properties Found Listed in This City By Users"
                })
            }

            return res.json({
                AllProperties : getAllSubsProperties ,
                success: true,
            });
        } catch (error) {
            console.log("Error in getAllSellPropertiesOfCityOfUsersOnly and error is : ", error)
            return res.json({
                success: false,
                message : "Could Not get Properties"
            });
        }
    }

}

// getting all properties of admin of a city for sell
const getAllPropertiesSellOfCityOfAdminOnly = async (req, res) => {
    const {city} = req.params;
    const AllUsers = await Users.find({} , {_id : 1});

    if (!city) {
        return res.json({
            success: false,
            message: "Please Provide All Credentials"
        })
    } else {
        try {
            const myCity = city.toLowerCase();
            const isExist = await Properties.find({
                city: {$eq : myCity} ,
                properiter : {$nin : AllUsers},
                status : 'sell'
            } , {createdAt : 0 , updatedAt : 0 , __v : 0});

            if (isExist.length < 1) {
                return res.json({
                    success: false,
                    message: "No Properties Found Listed in This City By Admins"
                })
            }

            return res.json({
                AllProperties : isExist ,
                success: true,
            });
        } catch (error) {
            console.log("Error in getAllPropertiesOfCityOfAdminOnly and error is : ", error)
            return res.json({
                success: false,
                message : "Could Not get Properties"
            });
        }
    }

}

// getting all rent properties of admin of a city
const getAllRentPropertiesOfCity = async (req, res) => {
    const {city} = req.params;

    if (!city) {
        return res.json({
            success: false,
            message: "Please Provide All Credentials"
        })
    } else {
        try {
            const allProp = await Properties.find({});
            const myCity = city.toLowerCase();
            let getAllSubsProperties = await Properties.find({subsType : {$ne : ""} , city: myCity ,status : 'rent'} , {createdAt : 0 , updatedAt : 0 , __v : 0}).limit(10).sort(0);

            // if any subscribe property is found
            if(getAllSubsProperties.length > 0){
                for(let i = 0; i !== allProp.length; i++){
                    let gotProp = await Properties.findOne({
                        subsType : "",
                        city: myCity ,
                        status : 'rent',
                        _id : {$ne : allProp[i]._id }
                    });
                    if(gotProp){
                        getAllSubsProperties.push(gotProp);
                    }
                }
            }

            if (getAllSubsProperties.length < 1) {
                return res.json({
                    success: false,
                    message: "No Properties Found Listed in This City By Users"
                })
            }

            return res.json({
                AllProperties : getAllSubsProperties ,
                success: true,
            })
        } catch (error) {
            console.log("Error in getAllRentPropertiesOfCity and error is : ", error)
            return res.json({
                success: false,
                message : "Could Not get Properties"
            });
        }
    }

}

// getting all properties of users of a city for rent
const getAllRentPropertiesOfCityOfUsersOnly = async (req, res) => {
    const {city} = req.params;
    const AllAdmins = await Admins.find({} , {_id : 1});

    if (!city) {
        return res.json({
            success: false,
            message: "Please Provide All Credentials"
        })
    } else {
        try {
            const allProp = await Properties.find({});
            const myCity = city.toLowerCase();
            let getAllSubsProperties = await Properties.find({subsType : {$ne : ""} , city: myCity, properiter : {$nin : AllAdmins._id}, status : 'rent'} , {createdAt : 0 , updatedAt : 0 , __v : 0}).limit(10).sort(0);

            // if any subscribe property is found
            if(getAllSubsProperties.length > 0){
                for(let i = 0; i !== allProp.length; i++){
                    let gotProp = await Properties.findOne({
                        subsType : "",
                        city: myCity,
                        properiter : {$nin : AllAdmins._id},
                        status : 'rent',
                        _id : {$ne : allProp[i]._id }
                    });
                    if(gotProp){
                        getAllSubsProperties.push(gotProp);
                    }
                }
            }

            if (getAllSubsProperties.length < 1) {
                return res.json({
                    success: false,
                    message: "No Properties Found Listed in This City By Users"
                })
            }

            return res.json({
                AllProperties : getAllSubsProperties ,
                success: true,
            })
        } catch (error) {
            console.log("Error in getAllRentPropertiesOfCityOfUsersOnly and error is : ", error)
            return res.json({
                success: false,
                message : "Could Not get Properties"
            });
        }
    }

}

// getting all properties of admin of a city for rent
const getAllRentPropOfCityOfAdminOnly = async (req, res) => {
    const {city} = req.params;
    const AllUsers = await Users.find({} , {_id : 1});

    if (!city) {
        return res.json({
            success: false,
            message: "Please Provide All Credentials"
        })
    } else {
        try {
            const myCity = city.toLowerCase();
            const isExist = await Properties.find({
                city: {$eq : myCity} ,
                properiter : {$nin : AllUsers},
                status : 'rent'
            } , {createdAt : 0 , updatedAt : 0 , __v : 0});

            if (isExist.length < 1) {
                return res.json({
                    success: false,
                    message: "No Properties Found Listed in This City By Admins"
                })
            }

            return res.json({
                AllProperties : isExist ,
                success: true,
            });
        } catch (error) {
            console.log("Error in getAllRentPropOfCityOfAdminOnly and error is : ", error)
            return res.json({
                success: false,
                message : "Could Not get Properties"
            });
        }
    }

}

// getting subscription of 15 days
const gettingSubscription = async (req, res) => {
    const {id , type , userId } = req.params;

    // curent date
    const curentDate = new Date();
    let sendingDate = curentDate.getFullYear() + "-" + (curentDate.getMonth() + 1) + "-" + curentDate.getDate();

    // got date
    const newGotDate = new Date()
    let gotMonth = newGotDate.getMonth() + 1;
    let gotYear = newGotDate.getFullYear();
    let gotDay = newGotDate.getDate();

    let newDiff = 0;
    if(type === "7Days"){
        let diff = gotDay + 7;
        newDiff = diff;
        console.log("new Diff : ", newDiff)
        if (diff > 31) {
            gotMonth = newGotDate.getMonth() + 2;
            //  checking last date of month to subtract
            if (gotMonth === 0 || gotMonth === 2 || gotMonth === 4 || gotMonth === 6 || gotMonth === 7 || gotMonth === 9 || gotMonth === 11) {
                newDiff = newDiff - 31;
            }
            if (gotMonth === 3 || gotMonth === 5 || gotMonth === 8 || gotMonth === 10 ) {
                newDiff = newDiff - 30;
            }
            if (gotMonth === 1) {
                newDiff = newDiff - 28;
            }

            if (newGotDate.getMonth() === 0){
                newGotDate.setMonth(11)
                newGotDate.setFullYear(newGotDate.getFullYear() - 1);
                gotYear = newGotDate.getFullYear();
            }else{
                console.log("Inner inner")
                newGotDate.setMonth(newGotDate.getMonth())
            }
        }
    }

    let finalGotDate = gotYear + "-" + gotMonth + "-" + newDiff;
    console.log("Udates : ", "ending date : " , finalGotDate, "current date : ", sendingDate)
    console.log("-------------------------")

    if (!id || !userId || !type) {
        return res.json({
            success: false,
            message: "Please Provide All Credentials"
        })
    } else {
        try {
            const isUserExist = await Users.findById(userId);
            if (!isUserExist) {
                return res.json({
                    success: false,
                    message: "User Not Found"
                })
            }

            let isExist = await Properties.findOne({
                _id:  id ,
                properiter : userId,
            } , {createdAt : 0 , updatedAt : 0 , __v : 0});

            if (!isExist) {
                return res.json({
                    success: false,
                    message: "No Property Found"
                })
            }else{
                if(isExist.subsEndDate){
                    if(isExist.subsEndDate >= finalGotDate ){
                        return res.json({
                            success: false,
                            message: "You Already have Subscribed This Property"
                        })
                    }
                }else{
                    isExist.subsEndDate = finalGotDate;
                    isExist.subsType = "7 Days";
                    await Properties.findByIdAndUpdate(id , {$set : {...isExist}} , {new : true});
                    return res.json({
                        success: true,
                        SubsEndDate : finalGotDate,
                        message: "SuccessFully Subscribed",
                    })
                }
            }
        } catch (error) {
            console.log("Error in gettingSubscription and error is : ", error)
            return res.json({
                success: false,
                message : "Could Not get Properties"
            });
        }
    }

}

// calling un subscribe every day at night 12 am
cron.schedule('0 23 * * *', function() {
    console.log('running a task every day at night 12 am');

    // curent date
    const curentDate = new Date();
    let sendingDate = curentDate.getFullYear() + "-" + (curentDate.getMonth() + 1) + "-" + curentDate.getDate();

    const deleteSubs = async () => {
        const getAllProperties = await Properties.find({subsType : {$ne : ""}});
        for(let i = 0; i !== getAllProperties.length; i++){
            if(getAllProperties[i].subsEndDate == sendingDate){
                try {
                    let isExist = await Properties.findById(getAllProperties[i]._id);
                    if (!isExist) {
                        return res.json({
                            success: false,
                            message: "No Property Found"
                        })
                    }else{
                        if((isExist.subsEndDate == "") && (isExist.subsType == "")){
                            return res.json({
                                success: false,
                                message: "You have Not Subscribed This Property"
                            })
                        }else{
                            isExist.subsEndDate = "";
                            isExist.subsType = "";
                            await Properties.findByIdAndUpdate(getAllProperties[i]._id , {$set : {...isExist}} , {new : true});
                        }
                    }
                } catch (error) {
                    console.log("Error in gettingSubscription and error is : ", error)
                    return res.json({
                        success: false,
                        message : "Could Not get UnSubscribe Property"
                    });
                }
            }
        }
    }
    deleteSubs();
});

// Stripe Payments
const makeStripePayment = async (req,res) => {
    const {cardNumber, expMM, expYY, cvv , email , name , amount} = req.body;
    Number(expMM);
    Number(expYY);
    Number(cardNumber);
    Number(amount);

    const createdUser = await stripe.customers.create({
        email: email || 'testUser@gmail.com',
        name: name || "123"
    })

    //console.log("createdUser", createdUser)
    if (createdUser)
    {
        try {
            const token = await stripe.tokens.create({ card: {
                number: cardNumber, exp_month: expMM, exp_year: expYY, cvc: cvv } })
           //console.log("token : ", token)
            const AddingCardToUser = await stripe.customers.createSource(createdUser.id, { source: token.id })
            //console.log("AddingCardToUser : ", AddingCardToUser)

            const charge = await stripe.charges.create({
                amount: amount * 100,
                description: 'Tulia Subscriptions Charges',
                currency: 'USD',
                customer: createdUser.id,
                //card: token.id
            })
            //console.log("SuccessFull Charged : ", charge)
            // const invoice = await stripe.invoices.sendInvoice(charge.id);
            // console.log("invoice", invoice)

            // sending mail to Admin

            // // step 01
            // const transport = nodeMailer.createTransport({
            //     service: "gmail",
            //     auth: {
            //         user: process.env.myEmail, //own eamil
            //         pass: process.env.myPassword, // own password
            //     }
            // })
            // // setp 02
            // const mailOption = {
            //     from: process.env.myEmail, // sender/own eamil
            //     to: "dreamapp2001@gmail.com", // reciver/admin eamil
            //     subject: "!! Trulia App !! Request for Subscription",
            //     text: `Dear Admin .\n User has transferred Amount of $(${amount}).\n Thanks.`
            // }
            // // step 03
            // transport.sendMail(mailOption, (err, info) => {
            //     if (err) {
            //         console.log("Error occured : ", err)
            //         return res.json({
            //             mesage: "Error in sending mail",
            //             err,
            //             sucess: false
            //         })
            //     } else {
            //         console.log("Email Sent to Admin SuccessFully ", info.response )
            //     }
            // })

            // sending mail to User

            // setp 02
            // const mailOptionOne = {
            //     from: process.env.myEmail, // sender/own eamil
            //     to: email, // reciver/admin eamil
            //     subject: "!! Dream App !! Request for Expert Interpretation",
            //     text: `Dear Member , We have recived your mail and Our Expert Will Respond you.\n You have transferred Amount of $(${amount}) to us and we will response you back soon.\n Thanks.`
            // }
            // // step 03
            // transport.sendMail(mailOptionOne, (err, info) => {
            //     if (err) {
            //         console.log("Error occured : ", err)
            //         return res.json({
            //             mesage: "Error in sending mail",
            //             err,
            //             sucess: false
            //         })
            //     } else {
            //         console.log("Email Sent to User SuccessFully : ", info.response )
            //     }
            // })

        return  res.status(201).json({ success: true, message : "Payment Charged Successfully and also a mail has been sent to Admin as well as to User"}) ;
        } catch (error) {
            switch (error.type) {
                case 'StripeCardError':
                    // A declined card error
                    console.log(`Error in ${error.type} and error is : `, error.message)
                    error.message; // => e.g. "Your card's expiration year is invalid."
                    break;
                case 'StripeInvalidRequestError':
                    console.log(`Error in ${error.type} and error is : `, error.message)
                    // Invalid parameters were supplied to Stripe's API
                    break;
                case 'StripeAPIError':
                    console.log(`Error in ${error.type} and error is : `, error.message)
                    // An error occurred internally with Stripe's API
                    break;
                case 'StripeConnectionError':
                    console.log(`Error in ${error.type} and error is : `, error.message)
                    // Some kind of error occurred during the HTTPS communication
                    break;
                case 'StripeAuthenticationError':
                    console.log(`Error in ${error.type} and error is : `, error.message)
                    // You probably used an incorrect API key
                    break;
                case 'StripeRateLimitError':
                    console.log(`Error in ${error.type} and error is : `, error.message)
                    // Too many requests hit the API too quickly
                    break;
            }
            return res.status(501).json({success: false , message : `Error in ${error.type} and error is :  ${error.message}`})
        }
    }
}

// sending mails for contacting between owner and user
const sendMail = async(req,res) => {
    const {email , phoneNo , message , url } = req.body
    const {id} = req.params;

    let owner;
    try{
        // finding owner of property first
        owner = await Users.findById(id);
        if(!owner){
            owner = await Admins.findById(id);
            if(!owner){
                return
                    res.json({
                        success: false,
                        message: 'Could Not Find Owner of This Property'
                    })
            }
        }
    }catch(e){
        console.log("error is in upper : ", e)
        return res.json({ success : false , message : "Could Not Find Owner of this Property"})
    }

    // sending mail to owner first
    try{
        // step 01
        var transport= nodeMailer.createTransport({
            service : "gmail",
            auth: {
                user : 'doorstep1000@gmail.com', //own eamil
                pass: 'hamza_78674', // own password
            }
        })
        // setp 02
        const mailOption = {
            from: 'doorstep1000@gmail.com', // sender/own email
            to: owner.email, // reciver eamil
            subject: "Trulia mail for your Property",
            text : `Dear Member, a user having email ${email} and Phone No +90 ${phoneNo} has sent you message regarding your property ${url}.\n Please reply user with all required data he has asked for
            immediately to have a good and a fair deal. \n You can also contact via phone No as well as email.
            \n Thanks or using our service.`,
        }
        // step 03
        transport.sendMail(mailOption, (err, info) => {
            if (err) {
                console.log("Error occured : ", err)
                return res.json({ success: false, message : " Error in sending mail" , err})
            } else {
                console.log("Email Sent and info is : ", info.response)
                res.json({success: true,  message: 'Email Sent SuccessFully to Owner' })
            }
        })
    }catch(e){
        console.log("error is in lower : ", e)
        res.json({ success : false , message : "Could Not Send Email to Owner of Property"})
    }

    try{
        // setp 02
        const mailOptionOne = {
            from: 'doorstep1000@gmail.com', // sender/own email
            to: email, // reciver eamil
            subject: "Trulia mail for Request of Property",
            text : `Dear Member, We have sent en email to user with your message also. \n Owner will contact you in a while. \n
            If Owner does not respinds you via email , you can contact owner at his/her phone No +90 ${owner.phoneNo}.
            \n We hope you may get the house or property as you want.\n\n Thanks for using our service. `,
        }
        // step 03
        transport.sendMail(mailOptionOne, (err, info) => {
            if (err) {
                console.log("Error occured : ", err)
                return res.json({ success: false, message : " Error in sending mail" , err})
            } else {
                console.log("Email Sent and info is : ", info.response)
                return res.json({success: true,  message: 'Email Sent SuccessFully to Owner' })
            }
        })
    }catch(e) {
        console.log("error is in lower most : ", e)
        return res.json({ success : false , message : "Please try again after some time. Thanks"})
    }


}

module.exports = {
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
    makeStripePayment,
    sendMail
}