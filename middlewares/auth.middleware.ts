import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = (req: Request, res: Response<any, Record<string, any>>, next: NextFunction): Response<any, Record<string, any>> => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try{
        let decoded: any;
        try{
            decoded = jwt.verify(token, process.env.JWT_USER_SECRET);
            req.userRole = 'user';
        }catch{}

        if(!decoded){
            try{
                decoded = jwt.verify(token, process.env.JWT_ORG_SECRET);
                req.userRole = 'organizer';
            }catch{}
        }

        if(!decoded){
            try{
                decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
                req.userRole = 'admin';
            }catch{}
        }

        req.user = decoded;
        next();
    }catch(err){
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export default authMiddleware;
