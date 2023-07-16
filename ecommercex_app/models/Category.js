import mongoose,{ Schema, models }  from "mongoose";
import { model } from "mongoose";

const CategorySchema = new Schema({
    name: {type: String, require: true},
    parent: {type: mongoose.Types.ObjectId, ref:'Category'},
    properties: [{types:Object}]
});

export const Category = models?.Category || model('Category', CategorySchema);
