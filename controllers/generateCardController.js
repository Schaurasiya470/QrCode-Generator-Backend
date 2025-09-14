const User = require("../models/businessModel.js");
const QRCode = require("qrcode");

exports.saveUserDetails = async (req, res) => {
    try{
        const newUser = new User({
            name: req.body.name,
            mobile: req.body.mobile,
            email: req.body.email,
            company : req.body.company,
            websiteLink : req.body.website
        });
        const savedUser = await newUser.save();
        const txtUrl = `https://qr-code-generator-frontend-topaz.vercel.app/get-card/${savedUser._id}`;
        const qrUrl = await QRCode.toDataURL(txtUrl);
        res.status(201).json({qrUrl, card: savedUser, message: "User Details Saved successfully.", redirectToLogin: true });
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Error creating a user" })
    }
}