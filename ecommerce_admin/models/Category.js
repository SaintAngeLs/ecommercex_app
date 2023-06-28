import mongoose, {Schema, model, models} from "mongoose"

const CategorySchema = new Schema({
    name: {type:String, required: true},
    parentCategory: {type:mongoose.Types.ObjectId, ref: 'Category'}, 
    properties: [{type: Object}],
});

export const Category = models?.Category || model('Category', CategorySchema);