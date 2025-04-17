import Role from "../models/roleModel.js";
import User from "../models/userModel.js";

export const createRole = async (req, res) => {
  const { name, permissions } = req.body;

  const roleExists = await Role.findOne({ name });

  if (roleExists) {
    return res.status(400).json({ message: "Role already exists" });
  }

  const role = new Role({ name, permissions });
  await role.save();

  res.status(201).json(role);
};

export const assignRoleToUser = async (req, res) => {
    const { username, rolename } = req.body;
  
    try {
     
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
  
      
      const role = await Role.findOne({ name: rolename });
      if (!role) {
        return res.status(400).json({ message: "Role not found" });
      }
  
     
      user.role = role._id;
      await user.save();
  
      res.status(200).json({ message: "Role assigned successfully", user });
    } catch (error) {
      console.error("Assign Role Error:", error);
      res.status(500).json({ message: "Server error while assigning role" });
    }
  };
  