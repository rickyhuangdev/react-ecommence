const mongoose = require("mongoose");

const {Schema} = mongoose
const {ObjectId} = Schema
const subCategorySchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: "Name is required",
        minlength: [2, "too short"],
        maxlength: [32, "too long"],
    }, slug: {
        type: String, unique: true, lowercase: true, index: true
    },
    parent: {
        type: ObjectId, ref: "Category", required: true
    },
    state: {
        type: Number, default: 1
    }
}, {timestamps: true})

module.exports = mongoose.model("subCategory", subCategorySchema)
