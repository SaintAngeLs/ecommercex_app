import mongoose, { Schema, model, models, Types } from 'mongoose';

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  images: [{ type: String }],
  category: { type: Types.ObjectId, ref: "Category" },
  properties: { type: Object },
});

export const Product = models.Product || model('Product', ProductSchema);
