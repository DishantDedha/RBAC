import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import Role from "../models/roleModel.js";

dotenv.config();


export const registerUser = async (req, res) => {
    const { username, email, password, isAdmin } = req.body;
  
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
   let adminrole;
    if(isAdmin)
    {
      adminrole= await Role.findOne({name:"admin"});
      if(!adminrole)
      {
              adminrole=new Role({
                name: "admin",
        permissions: ["administration"],
              });
              await adminrole.save();
      }
    }
    


    const user = await User.create({
      username,
      email,
      password,
      role:isAdmin?adminrole._id:null,
    });
  
    if (user) {
      res.status(201).json({ message: "User registered successfully" });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  };

  export const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email }).populate("role");

  
    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
  
      res.json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role:user.role.name,
        },
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  };