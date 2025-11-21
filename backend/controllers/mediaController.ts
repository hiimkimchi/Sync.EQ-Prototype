import { uploadFile, getBlobSasUrl, deleteFile } from "../azure/profilepic";
import mongoose from "mongoose";
import Media from "../models/media";
import { Request, Response } from "express";

export async function getAllMedia(req: Request, res: Response): Promise<any> {
    try {
        const mediaFiles = await Media.find();
        if(mediaFiles.length === 0) {
            return res.status(404).json({error: "No Media In SyncEQ"});
        }
        return res.status(200).json(mediaFiles);
    } catch(err: any) {
        return res.status(400).json({error: err.message});
    }
}

export async function getSpecificMedia(req: Request, res: Response): Promise<any> {
    try {
        const mediaFile = await Media.findById(req.params.mediaID);
        if(!mediaFile) {
            return res.status(404).json({error: "no mediaID found like that"});
        }
        return res.status(200).json(mediaFile);
    } catch(err: any) {
        return res.status(400).json({error: err.message});
    }
}

export async function getUsersMedia(req: Request, res: Response): Promise<any> {
    try {
        const mediaFiles = await Media.find({author: req.params.username});
        if(mediaFiles.length === 0) {
            return res.status(404).json({error: "Provided user has no media"});
        }
        return res.status(200).json(mediaFiles);
    } catch(err: any) {
        return res.status(400).json({error: err.message});
    }
}


export async function getUserProfilePic(req: Request, res: Response) {
    try {
        // check for existance of metadata
        const username = req.params.username;
        const profilepic = await Media.findOne({
            author: username,
            fileType: "profilepic"
        });

        if(!profilepic) {
            return res.status(404).json({error: "Provided user has no profile picture"});
        }

        // get temp url to image
        const sasURL = await getBlobSasUrl("profilepics", profilepic.filePath)

        return res.status(200).json({url: sasURL});
    } catch(err: any) {
        return res.status(400).json({error: err.message});
    }
}


export async function createUserProfilePic(req: Request, res: Response) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // save request metadata
        const username = req.params.username;
        const fileBuffer = req.file.buffer;
        const fileExt = req.file.originalname.split('.').pop();
        const blobName = `${username}-profilepic.${fileExt}`

        // upload
        const requestId = await uploadFile("profilepics", blobName, fileBuffer);

        // mongo entry with metadata
        const mediaMetadata = await Media.create({
            _id: new mongoose.Types.ObjectId(),
            author: username,
            fileType: "profilepic",
            filePath: blobName
        });

        // response
        return res.status(201).json({
            message: "Profile picture uploaded",
            requestId,
            media: mediaMetadata
        });
    } catch (err: any) {
        return res.status(400).json({ error: err.message });
    }
}


export async function replaceUserProfilePic(req: Request, res: Response) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const username = req.params.username;
        const fileBuffer = req.file.buffer;
        const fileExt = req.file.originalname.split('.').pop();
        const blobName = `${username}-profilepic.${fileExt}`;

        const oldMedia = await Media.findOne({ 
            author: username, 
            fileType: "profilepic" 
        });

        if (oldMedia) {
            await deleteFile("profilepic", blobName);
        }

        const requestId = await uploadFile("profilepics", blobName, fileBuffer);

        // NOTE: this is to set updatedAt via mongoose. none of the other metadata should change
        const updatedMetadata = await Media.findOneAndUpdate({
            author: username,
            fileType: "profilepic",
            filePath: blobName
        })

        // response
        return res.status(201).json({
            message: "Profile picture uploaded",
            requestId,
            media: updatedMetadata
        });
    } catch (err: any) {
        return res.status(400).json({ error: err.message });
    }
}