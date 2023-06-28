
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { isAdminRequest } from "./auth/[...nextauth]";


export default async function handle(req, res){
    const {method} = req;
    await mongooseConnect()

    await isAdminRequest(req,res);

    if(method === 'POST')
    {
        const {title, description, price, images, category, properties} = req.body;
        const productDoc = await Product.create({
            title, description, price, images, category, properties,
        })
        res.json(productDoc)
    }
    if(method === 'GET')
    {
        if(req.query?.id)
        {
            res.json(await Product.findOne({_id:req.query.id}));
        }
        else
        {
            res.json(await Product.find());
        }
        
    }
    if(method === 'PUT')
    {
        const {title, description, price, images, _id, category, properties} = req.body;
        // using mongodDB method to update the existing document
        await Product.updateOne({_id}, {title:title, description:description, price:price, images:images, category:category, properties:properties});
        res.json(true);
    }
    if(method === 'DELETE')
    {
        if(req.query?.id)
        {
            await Product.deleteOne({_id:req.query?.id})
            res.json(true);
        }
    }
}