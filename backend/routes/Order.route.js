const { Router } = require("express");
const { authenticate } = require("../middlewares/authenticate");
const { CartModel } = require("../models/Cart.module");
const { OrderModel } = require("../models/Order.module");
const { OrderRelationModel } = require("../models/Order_relation.module");

const OrderController = Router();

OrderController.get('/', authenticate, async (req, res) => {
    const user_id = req.userId;
    const orders = await OrderModel.aggregate([{$match : {user_id}}, {$lookup: {
        from: "order_relations",
        localField: "_id",
        foreignField: "order_id",
        as: "tiffin_id"
    }}
    , {$lookup: {
        from: "tiffins",
        localField: "tiffin_id.tiffin_id",
        foreignField: "_id",
        as: "tiffins"
    }} 
    ]);
    res.status('200').send({orders});
})

OrderController.post('/add', authenticate, async (req, res) => {
    const user_id = req.userId;
    const {total, payment, delivery, coupon, order} = req.body;
    const newOrder = await OrderModel.create({user_id, total, coupon_id : coupon, delivery, payment});
    const newOrderId = newOrder._id;
    let payload = [];
    for(const order_obj in order) {
        payload.push({ order_id : newOrderId, tiffin_id : order_obj, quantity : order[order_obj] });
    }
    await OrderRelationModel.insertMany(payload);
    await CartModel.deleteMany({user_id});
    res.status('201').send({msg : "Order Placed"});
})


module.exports = {
    OrderController
}