import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

if (!USERNAME || !PASSWORD) {
    throw new Error("Database credentials are not defined in the .env file.");
}

const storage = new GridFsStorage({
    url: `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.hcfos.mongodb.net/?retryWrites=true&w=majority`,
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if (match.indexOf(file.mimetype) === -1) {
            return `${Date.now()}-file-${file.originalname.replace(/\s/g, '_')}`;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-file-${file.originalname.replace(/\s/g, '_')}`
        };
    }
});

export default multer({ storage });
