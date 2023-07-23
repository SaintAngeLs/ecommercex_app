import {mongooseConnect} from "@/lib/mongoose";
import { Admin } from "@/models/Admin";
import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";


export default async function handle(req, res) {
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (req.method === 'POST') 
  {
    const {email} = req.body;
    if (await Admin.findOne({email})) 
    {
      res.status(400).json({message:'admin already exists!'});
    } 
    else 
    {
      res.json(await Admin.create({email}));
    }
  }

  if (req.method === 'DELETE') 
  {
    const {_id} = req.query;
    await Admin.findByIdAndDelete(_id);
    res.json(true);
  }

  if (req.method === 'GET') 
  {
    res.json( await Admin.find() );
  }

  if (req.method === 'PUT') 
  {
    const {_id, email} = req.body;
    const admin = await Admin.findById(_id);
    if (admin) 
    {
      admin.email = email;
      await admin.save();
      res.json(admin);
    } 
    else 
    {
      res.status(404).json({message: 'Admin not found'});
    }
  }
}