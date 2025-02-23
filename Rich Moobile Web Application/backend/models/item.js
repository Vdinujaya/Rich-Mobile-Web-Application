const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    category:{
        type:String
    },
    brand:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:Number
    },
    stock:{
        type:Number
    },
    specifications:{
        type:String
    },
    image:{
        type:String
    },
}, { versionKey: false })

module.exports = mongoose.model("Item", itemSchema)