import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { getServerSession } from "next-auth";
import { authOptions, isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();
    await isAdminRequest(req,res);
    

    if(method === 'POST')
    {
        const {name, parentCategory, properties} = req.body;
        const categoryDocument = await Category.create({name, parentCategory: parentCategory || undefined, properties:properties});
        res.json(categoryDocument);
    }

    if(method === 'GET')
    {
        res.json(await Category.find().populate('parentCategory'))
    }
    if(method == 'PUT')
    {
        const {name, parentCategory, properties, _id} = req.body;
        const categoryDocument = await Category.updateOne({_id},{name, parentCategory: parentCategory || undefined, properties:properties});
        res.json(categoryDocument);
    }
    if(method === 'DELETE')
    {
        const {_id} = req.query;
        await Category.deleteOne({_id:_id});
        res.json('ok')
    }
}