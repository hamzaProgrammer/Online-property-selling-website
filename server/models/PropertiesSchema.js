const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    beds: {
        type: Number,
        required: true,
    },
    baths: {
        type: Number,
        required: true,
    },
    rooms: {
        type: Number,
        //required: true,
    },
    bedrooms: {
        type: Number,
        required: true,
    },
    totalArea: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    houseType: {
        type: String,
        required: true,
    },
    images: [{
        type: String,
    }],
    status: {
        type: String,
        required: true,
        enum : ['sell' , 'rent' , 'sold']
    },
    properiter: {
        type: mongoose.Types.ObjectId,
        ref : 'turkretailorsusers',
        required: true
    },
    subsType: {
        type: String,
        default : ""
    },
    subsEndDate: {
        type: String,
    },
    coordinates : []
}, {
    timestamps: true
});


const TurkRetailorsProperties = mongoose.model('TurkRetailorsProperties', PropertySchema);

module.exports = TurkRetailorsProperties