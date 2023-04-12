const { Router } = require("express");
const { authenticate } = require("../middlewares/authenticate");
const { authorizeVender } = require("../middlewares/authorizeVender");
const { TiffinModel } = require("../models/Tiffin.module");

const TiffinController = Router();

const validateTiffin = (req, res, next) => {
    const {title, description, time, price} = req.body;
    if(title?.trim() && description?.trim() && time?.trim() && price?.trim())
        next();
    else 
        res.status("401").send({msg : "All fields are required"});
}


TiffinController.get('/', authenticate, async (req, res) => {
    const userId = req.userId;
    const tiffin = await TiffinModel.find({status : "active"});
    res.status('200').send({tiffin});
})

TiffinController.post('/add', authorizeVender, validateTiffin, async (req, res) => {
    const payload = req.body;
    const tiffin = new TiffinModel(payload);
    await tiffin.save();
    res.status("201").send({msg : 'Tiffin Added Successfully'});
})

module.exports = {
    TiffinController
}