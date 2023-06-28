const { Schema, model, models } = require("mongoose");

const OrderSchema = new Schema({
    line_items: Object,
    name: String,
    email: String,
    country: String,
    city: String,
    postalCode: String,
    streetAddress: String,
    paid: Boolean,


}, {
    timestamps: true,
});

export const Order = models?.Order || model('Order', OrderSchema);