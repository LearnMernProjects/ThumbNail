import { Request, Response } from "express";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import Thumbnail from "../models/thumbnail.js";

export const getUsersThumbnails = async (req: Request, res: Response) => {
   try{
     console.log('Session data:', req.session);
     const { userId } = req.session;
     if (!userId) {
       return res.status(401).json({ message: 'User not authenticated' });
     }
     const thumbnail = await Thumbnail.find({ userId }).sort({createdAt: -1})
     res.json({thumbnail});
    

   }catch(error : any){
    console.log(error)
      res.status(500).json({ message: 'Internal server error', error: error.message });
   }
};
export const getThumbnailbyId = async (req: Request, res: Response) => {
    try {
        const {userId} = req.session;
        const { id } = req.params;
        const thumbnail = await Thumbnail.findById(id);
        if (!thumbnail) {
            return res.status(404).json({ message: 'Thumbnail not found' });
        }
        res.json({ thumbnail });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};