const { Schema, model } = require("mongoose");

const orderSchema = new Schema ({
    user_id : String,
    total : String,
    coupon_id : String,
    delivery : Number,
    payment : String
}, {
    versionKey : false,
    timestamps : true
})

const OrderModel = model("order", orderSchema);

module.exports = {
    OrderModel
}