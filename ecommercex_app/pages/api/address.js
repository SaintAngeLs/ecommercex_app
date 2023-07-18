import { mongooseConnect } from "@/lib/mongoose";
import { Address } from "@/models/Address";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";


export default async function handle(req, res) {
  await mongooseConnect();
  const {user} = await getServerSession(req, res, authOptions);

  if (req.method === 'PUT') {
    const address = await Address.findOne({userEmail:user.email});
    if (address) {
      res.json(await Address.findByIdAndUpdate(address._id, req.body));
    } else {
      res.json(await Address.create({userEmail:user.email, ...req.body}));
    }
  }
  if (req.method === 'GET') {
    const address = await Address.findOne({userEmail:user.email});
    res.json(address);
  }
}