import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";
import { Setting } from "@/models/Setting";

export default async function handle(req, res){
    await mongooseConnect();
    await isAdminRequest(req, res);

    if(req.method === 'PUT')
    {
        const {name, value} = req.body;
        const settingDocument = await Setting.findOne({name});
        if(settingDocument)
        {
            settingDocument.value = value;
            await settingDocument.save();
            res.json(settingDocument);
        }
        else
        {
            res.json(await Setting.create({name, value}));
        }
    };

    if(req.method === 'GET')
    {
        const {name} = req.query;
        res.json(await Setting.findOne({name}));
    }
};