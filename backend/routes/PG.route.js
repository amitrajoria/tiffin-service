const { Router } = require("express");
const { authenticate } = require("../middlewares/authenticate");
const { authorizeVender } = require("../middlewares/authorizeVender");
const { PGModule } = require("../models/PG.module");

const PGController = Router();

PGController.get('/', authenticate, async (req, res) => {
    const pg = await PGModule.find();
    res.status('200').send({pg});
});

PGController.post('/add', authenticate, async (req, res) => {
    const {name, address} = req.body;
    console.log("Working");
    console.log(req.body);
    if(!name || !address)
        res.status('400').send({msg : 'Name and Address are required field'});
    else {
        const PG = new PGModule({name, address});
        await PG.save();
        res.status("201").send({msg : 'PG Registered Successfully'});
    }
})

module.exports = {
    PGController
}