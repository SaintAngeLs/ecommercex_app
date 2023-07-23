import { Schema, model, models } from "mongoose";

const settingSchema = new Schema({
    name: {type:String, requied: true, unique: true},
    value: {type: Object},
},
{
    timetstamps: true
});

export const Setting = models?.Setting || model('Setting', settingSchema);