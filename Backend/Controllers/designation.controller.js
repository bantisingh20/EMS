const DesignationTable = require('../models/designation.model').DesignationTable;

// Insert department 
const SaveDesignation = async (req, res) => {
    try {
        const { designationname } = req.body;
        console.log(req.body);
        const isExist = await DesignationTable.findOne({ designationname });
        if (isExist) {
            return res.status(400).json({ success: false, message: "Designation Already Exists" });
        } 

        const newDesignation = new DesignationTable({
            designationname
        });
  
        await newDesignation.save();
        res.status(200).json({ success: true, message: "Designation Saved", data: newDesignation });
    } catch (error) {
        console.error('Error saving Designation:', error);
        res.status(500).json({ success: false, message: "Error saving Designation", error: error.message });
    }
};

const GetAllDesignation = async (req, res) => {
    try {
        //console.log('call');
        const Designation = await DesignationTable.find();

        if (!Designation.length) {
            return res.status(200).json({ success: false, message: "No Designation found." });
        }

        res.status(200).json({ success: true, message: "Designation retrieved successfully", data:Designation });
    } catch (error) {
        console.error('Error retrieving Designation:', error);
        res.status(500).json({ success: false, message: "Error retrieving Designation", error: error.message });
    }
};
 

const DeleteDesignation = async(req,res) => {
    try { 
        const {id} = req.params; 
        console.log(id);
        const Designation = await DesignationTable.findByIdAndDelete({_id:id},)
        res.status(200).json({ success: true, message: "Designation Deleted Successfully", Designation });

    } catch (error) {
        console.error('Error searching Designation:', error);
        res.status(500).json({ success: false, message: "Error removing Designation", error: error.message });
    }
}


const UpdateDesignation = async(req,res) => {
    try { 
        const {_id, designationname} = req.body; 
        // console.log(req.body);
        const Designation = await DesignationTable.findByIdAndUpdate(
            { _id: _id },
            { designationname: designationname,
            statusdate:Date.now() },
            { new: true } // Optional: returns the updated document
        );
          
        res.status(200).json({ success: true, message: "Update Successfully", data:Designation });

    } catch (error) {
        console.error('Error While Update:', error);
        res.status(500).json({ success: false, message: "Error While Update", error: error.message });
    }
}


const GetDesignationById = async (req, res) => {
    try {
        
        const { id } = req.params;  
        console.log(id);
      
        const data = await DesignationTable.findById({ 
            _id:id            
        });

        if (!data) {
            return { success: false, message: "Designation not found" };
          }
         
        res.status(200).json({ success: true, message: "Designation retrieved successfully", data:data });
    } catch (error) {
        console.error('Error searching Designation:', error);
        res.status(500).json({ success: false, message: "Error searching Designation", error: error.message });
    }
};

module.exports = { SaveDesignation, GetAllDesignation, DeleteDesignation, UpdateDesignation, GetDesignationById };