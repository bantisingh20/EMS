const RoleTable = require('../Schemas/roleSchema').Role;

const SaveRole = async (req, res) => {
  try {
    const roleData = req.body;
    console.log(roleData);
    const existingRole = await RoleTable.findOne({ name: roleData.name });
    if (existingRole) {   
      return res.status(400).json({ success: false, message: "Role already exists" });
    }
    const newRole = new RoleTable(roleData);
    await newRole.save();
    res.status(201).json({ success:true, message: 'Role saved successfully', role: newRole });
  } catch (error) {
    res.status(500).json({ message: 'Error saving role', error });
  }
}

const GetAllRoles = async (req, res) => {
  try {
    const roles = await RoleTable.find({});
    res.status(200).json({success:true, message:"Roles retrieving successfully" , data:roles})
  } catch (error) {
    res.status(500).json({ message: 'Error fetching roles', error });
  }
}   

const GetRoleById = async (req, res) => {
  try {
    const roleId = req.params.id;
    const role = await RoleTable.findById(roleId);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
     res.status(200).json({success:true, message:"Roles retrieving successfully" , data:role})
  } catch (error) {
    res.status(500).json({ message: 'Error fetching role', error });
  }
}

const UpdateRole = async (req, res) => {
  try {
    const roleId = req.body._id;
    const updatedRole = await RoleTable.findByIdAndUpdate(roleId, req.body, { new: true });
    if (!updatedRole) {
      return res.status(404).json({ message: 'Role not found' });
    }   

    res.status(200).json({ success:true, message: 'Role updated successfully', role: updatedRole });
  } catch (error) {
    res.status(500).json({ message: 'Error updating role', error });
  }
}

const DeleteRole = async (req, res) => {
  try {
    const roleId = req.params.id;
    const deletedRole = await RoleTable.findByIdAndDelete(roleId);
    if (!deletedRole) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting role', error });
  }
}

module.exports = {
  SaveRole,
  GetAllRoles,    
  GetRoleById,
  UpdateRole,
  DeleteRole
};