import jwt from "jsonwebtoken"
import User from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

const protect= async (req,res,next) =>
    {
        const authHeader= req.headers.authorization || req.headers.Authorization;
    
        if(!authHeader || !authHeader.startsWith('Bearer '))
        {
           return res.status(401).send({error:"Need Token to SignIn"});
        }
        
    
        const token=authHeader.split(" ")[1];
    
        //decoding token
      try
      {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
      }
      catch(error)
      {
         
       return res.status(400).json({error:"Invalid token"});
      }
        
    
    
    }
    
    export default protect;