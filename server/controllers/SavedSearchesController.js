const SavedSearches = require('../models/SavedSearches')


// add New Search
const SaveNewSearch = async (req, res) => {
    const { user , savedSearch } = req.body;
    if (!user || !savedSearch ) {
        return res.json({
            success: false,
            message: "Please Provide All Credientials"
        });
    } else {
        let isExist = await SavedSearches.findOne({
            user: user , savedSearch : savedSearch
        })

        if (isExist) {
            return res.json({
                success: true,
                message : "Search Already Saved"
            });
        }else{
            const newSearch = new SavedSearches({
                ...req.body,
            })

            try {
                await newSearch.save();

                return res.status(201).json({
                    success: true,
                    message: 'Search SuccessFully Saved'
                })
            } catch (error) {
                console.log("Error in SaveNewSearch and error is : ", error)
                res.status(201).json({
                    success: false,
                    message : "Some Server Side Error Has Occured"
                })
            }
        }
    }
}

// get All Users saved searches
const getMySavedSearches = async (req, res) => {
    const {user} = req.params
    if (!user) {
        return res.status(504).json({
            success: false,
            message: 'Id is Required'
        })
    } else {
        const isExist = await SavedSearches.find({ user: user } , {savedSearch : 1 })
        if (!isExist) {
            return res.status(201).json({
                success: false,
                message: 'User Id is Incorrect'
            })
        } else {
            try {
                res.status(201).json({
                    success: true,
                    SavedSearches : isExist
                })

            } catch (error) {
                console.log("Error in getMySavedSearches and error is : ", error)
                return res.status(504).json({
                    success: false
                })
            }
        }
    }
}

// delete single saved search
const deleteSingleSavedSearch = async (req, res) => {
    const {id , user } = req.params

    if (!id || !user) {
        return res.status(504).json({
            success: false,
            message: 'Please Provide All Required Credentials'
        })
    } else {
        const isExist = await SavedSearches.findOne({ _id: id } , {user : user })
        if (!isExist) {
            return res.status(201).json({
                success: false,
                message: 'Saved Search Not Found'
            })
        } else {
            try {
                await SavedSearches.findByIdAndDelete(id);

                res.status(201).json({
                    success: true,
                    message : "Saved Search Deleted SuccessFully"
                })

            } catch (error) {
                console.log("Error in deleteSingleSavedSearch and error is : ", error)
                return res.status(504).json({
                    success: false,
                    message : "Could Not Delete Saved Search"
                })
            }
        }
    }
}


module.exports = {
    SaveNewSearch,
    getMySavedSearches,
    deleteSingleSavedSearch
}