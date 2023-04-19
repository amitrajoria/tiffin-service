const { Router } = require("express");
const { mongoose } = require("mongoose");
const { authenticate } = require("../middlewares/authenticate");
const { CartModel } = require("../models/Cart.module");
const { OrderModel } = require("../models/Order.module");
const { OrderRelationModel } = require("../models/Order_relation.module");

const OrderController = Router();

const getCustomerOrders = async (user_id, req, res) => {
    const orders = await OrderModel.aggregate([{$match : {user_id : new mongoose.Types.ObjectId(user_id)}}, {$lookup: {
        from: "order_relations",
        localField: "_id",
        foreignField: "order_id",
        as: "tiffin_id"
    }} 
    , { $lookup: {
        from: "tiffins",
        localField: "tiffin_id.tiffin_id",
        foreignField: "_id",
        as: "tiffins"
    }} 
    , { $lookup: {
        from: "users",
        localField: "vender_id",
        foreignField: "_id",
        as: "vender"
    }} 
    , { $unwind: "$vender" } 
    ]);
    res.status('200').send({orders});
}

const getVenderOrders = async (vender_id, req, res) => {
    const orders = await OrderModel.aggregate([{$match : {vender_id : new mongoose.Types.ObjectId(vender_id)}}
    , {$lookup: {
        from: "order_relations",
        localField: "_id",
        foreignField: "order_id",
        as: "tiffin_id"
    }} 
    , { $unwind: "$tiffin_id" } 
    , { $lookup: {
        from: "tiffins",
        localField: "tiffin_id.tiffin_id",
        foreignField: "_id",
        as: "tiffins"
    }} 
    , { $unwind: "$tiffins" } 
    , { $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "user"
    }} 
    , { $unwind: "$user" } 
    , { $lookup: {
        from: "pgs",
        localField: "user.pg_id",
        foreignField: "_id",
        as: "pg"
    }} 
    , { $unwind: "$pg" } 
    ]);
    console.log(orders);
    res.status('200').send({orders});
}

OrderController.get('/', authenticate, async (req, res) => {
    const user_id = req.userId;
    const role = req.role;
    if(role === "cutomer")
        getCustomerOrders(user_id, req, res);
    else 
        getVenderOrders(user_id, req, res);
    
})

OrderController.post('/add', authenticate, async (req, res) => {
    const user_id = req.userId;
    const {total, payment, delivery, coupon, order, vender_id} = req.body;
    const newOrder = await OrderModel.create({user_id, vender_id, total, coupon_id : coupon, delivery, payment});
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