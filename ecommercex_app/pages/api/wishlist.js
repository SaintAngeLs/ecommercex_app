import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";

import { WishedProduct } from "@/models/WishedProduct";
import { authOptions } from "./auth/[...nextauth]";

export default async function handle(req, res){
    await mongooseConnect();

    const {user} = await getServerSession(req, res, authOptions);

    if(req.method === 'POST')
    {
        const {product} = req.body;
        const whishedDocument = await WishedProduct.findOne({userEmail:user.email, product});

        if(whishedDocument)
        {
            await WishedProduct.findBuIdAndDelete(whishedDocument._id);
            res.json({whishedDocument});
        }
        else
        {
            await WishedProduct.create({userEmail:user.email, product});
            res.json("create");
        }
    }

    if (req.method === 'GET') 
    {
        res.json(
          await WishedProduct.find({userEmail:user.email}).populate('product')
        );
    }
};