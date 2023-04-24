const { Schema, model } = require("mongoose");

const orderSchema = new Schema ({
    user_id : Schema.Types.ObjectId,
    vender_id : Schema.Types.ObjectId,
    total : String,
    coupon_id : String,
    delivery : Number,
    payment : String,
    added : {type : String, default : new Date().toLocaleDateString()}
}, {
    versionKey : false,
    timestamps : true
})

const OrderModel = model("order", orderSchema);

module.exports = {
    OrderModel
}