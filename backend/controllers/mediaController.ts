import { uploadFile, getBlobSASURL } from "../azure/blob.js";
import mongoose from "mongoose";
import Media from "../models/media.js";
import { Request, Response } from "express";


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
        const sasURL = await getBlobSASURL("profilepics", profilepic.filePath)

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


export async function getUserAudio(req: Request, res: Response) {
    try {
        const username = req.params.username;
        const audioFiles = await Media.find({
            author: username,
            fileType: "audio"
        });

        if(!audioFiles || audioFiles.length === 0) {
            return res.status(404).json({error: "No audio files found"});
        }
        return res.status(200).json({audio: audioFiles});
    } catch (err: any) {
        return res.status(404).json({error: err.message});
    }
}


export async function getUserAudioFile(req: Request, res: Response) {
    try {
        // check for existance of metadata
        const username = req.params.username;
        const audiofile = await Media.findOne({
            author: username,
            fileType: "audio",
            filePath: req.params.filePath
        });

        if(!audiofile) {
            return res.status(404).json({error: "Audio does not exist"});
        }

        // get temp url to image
        const sasURL = await getBlobSASURL("audio", audiofile.filePath)

        return res.status(200).json({url: sasURL});
    } catch(err: any) {
        return res.status(400).json({error: err.message});
    }
}


export async function createUserAudio(req: Request, res: Response) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // save request metadata
        const username = req.params.username;
        const fileBuffer = req.file.buffer;
        const originalName = req.file.originalname || 'upload';
        // create a blob name that includes timestamp to avoid collisions
        const safeName = originalName.replace(/[^a-zA-Z0-9._-]/g, '_');
        const blobName = `${username}-${safeName}`;

        // upload
        const requestId = await uploadFile("audio", blobName, fileBuffer);

        // mongo entry with metadata
        const mediaMetadata = await Media.create({
            _id: new mongoose.Types.ObjectId(),
            author: username,
            fileType: "audio",
            filePath: blobName,
            projectName: req.file.originalname
        });

        // response
        return res.status(201).json({
            message: "Audio uploaded",
            requestId,
            media: mediaMetadata
        });
    } catch (err: any) {
        return res.status(400).json({ error: err.message });
    }
}