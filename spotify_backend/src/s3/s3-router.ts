import { Router } from 'express';
import { uploadFile, deleteFile } from "./s3-service";
import busboy from 'connect-busboy';
import { v4 as uuidv4 } from 'uuid';

const s3Router = Router();

s3Router.use(busboy());
s3Router.post('/files/upload', async (req, res) => {
    req.pipe((req as any).busboy);
    (req as any).busboy.on('file', async function (_2, file, _) {
        const filename = uuidv4();
        await uploadFile(process.env.S3_BUCKET_NAME!, filename, file);
        const url = `https://${process.env.S3_BUCKET_NAME}.nyc3.digitaloceanspaces.com/${filename}`;
        console.log(url);
        res.status(200).send({ url });
    });
});

export default s3Router;
