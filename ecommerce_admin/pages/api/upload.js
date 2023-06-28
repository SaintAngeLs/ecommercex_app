import multiparty from 'multiparty';
import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import fs from 'fs';
import mimeFileReader from 'mime-types'
import { mongooseConnect } from '@/lib/mongoose';
import { isAdminRequest } from './auth/[...nextauth]';

const bucketName = 'ecommersenextapp';

export default async function handle(req, res) {
    const form = new multiparty.Form();
    await mongooseConnect();

    await isAdminRequest(req,res);
    
    const {fields, files} = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if(err) reject(err);
            // wrapping the arguments of the resolce in the object not in the singular parameters
            resolve({fields, files});
            
        });
    });
    console.log('files length: ', files.file.length);
    console.log('files length: ', files);
    const client = new S3Client({
        region: 'eu-north-1',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        }
    });
    const links = [];
    for(const file of files.file)
    {
        const extention = file.originalFilename.split('.').pop();
        const min = 10
        const max = 10 ** 10
        const randNum = Math.floor(Math.random() * (max - min + 1)) + min;
        const newFileName = Date.now() + '-' + randNum + '.' + extention;
        //console.log(extention,file);
        await client.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: newFileName,
            Body: fs.readFileSync(file.path),
            ACL: 'public-read',
            ContentType: mimeFileReader.lookup(file.path),
        }));
        const link = `https://${bucketName}.s3.amazonaws.com/${newFileName}`;
        links.push(link);
    }
    
    
    return res.json({links});

}

export const config = {
    api: {bodyParser: false},

}

