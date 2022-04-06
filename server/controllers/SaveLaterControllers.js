const SaveLaters = require('../models/SaveLaterSchema')
const mongoose = require("mongoose")

// add New save later
const addNewSaveLater = async (req, res) => {
    const { user , property } = req.body;

    if (!user || !property ) {
        return res.json({
            success: false,
            message: "Please Provide All Credentials"
        });
    } else {
        let isExist = await SaveLaters.findOne({
            user: user , property : property
        })

        if (isExist) {
            return res.json({
                success: false,
                message : "Property Already Saved"
            });
        }else{
            const newSearch = new SaveLaters({
                ...req.body,
            })

            try {
                await newSearch.save();

                return res.status(201).json({
                    success: true,
                    message: 'Property Saved SuccessFully'
                })
            } catch (error) {
                console.log("Error in addNewSaveLater and error is : ", error)
                res.status(201).json({
                    success: false,
                    message : "Some Server Side Error Has Occured"
                })
            }
        }
    }
}

// get single User's saved later
const getMySavedLaterProperties = async (req, res) => {
    const {user} = req.params

    if (!user) {
        return res.status(504).json({
            success: false,
            message: 'Id is Required'
        })
    } else {
        const isExist = await SaveLaters.aggregate([
            {
                $match: {
                    user: mongoose.Types.ObjectId(user),
                },
            },
            {
                $lookup: {
                    from: 'turkretailorsproperties',
                    localField: 'property',
                    foreignField: '_id',
                    as: 'property'
                },
            },
            {$unwind: "$property"},
            {
                $project: {
                    _id: "$property._id",
                    PropertyPrice: "$property.price",
                    PropertyAddress: "$property.address",
                    PropertyBaths: "$property.baths",
                    PropertyBedrooms: "$property.bedrooms",
                    PropertyArea: "$property.totalArea",
                    PropertyImage: "$property.images",
                }
            }
        ])
        
        // find({ user: user } , {})
        if (isExist.length < 1) {
            return res.json({
                success: false,
                message: 'No Properties Saved For Later'
            })
        } else {
            try {
                res.status(201).json({
                    success: true,
                    SavedLaters : isExist
                })
            } catch (error) {
                console.log("Error in getMySavedLaterProperties and error is : ", error)
                return res.status(504).json({
                    success: false
                })
            }
        }
    }
}

// delete single saved later
const deleteSingleSavedLater = async (req, res) => {
    const {id , user } = req.params

    if (!id || !user) {
        return res.status(504).json({
            success: false,
            message: 'Please Provide All Required Credentials'
        })
    } else {
        const isExist = await SaveLaters.findOne({ _id: id } , {user : user })
        if (!isExist) {
            return res.status(201).json({
                success: false,
                message: 'Saved Later Property Not Found'
            })
        } else {
            try {
                await SaveLaters.findByIdAndDelete(id);

                res.status(201).json({
                    success: true,
                    message : "Saved Later Property Deleted SuccessFully"
                })

            } catch (error) {
                console.log("Error in deleteSingleSavedLater and error is : ", error)
                return res.status(504).json({
                    success: false,
                    message : "Could Not Delete Saved Later Property"
                })
            }
        }
    }
}


module.exports = {
    addNewSaveLater,
    getMySavedLaterProperties,
    deleteSingleSavedLater
}