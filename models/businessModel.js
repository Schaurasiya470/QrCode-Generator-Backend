const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: Number, required: true},
    email: { type: String, required: true},
    company: { type: String },
    websiteLink: { type: String},
}, { timestamps: true });

const Business = mongoose.model("users", userSchema);

module.exports = Business;
