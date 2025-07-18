const {DepartmentTable} = require("../models/department.model");

// Insert department 
const SaveDepartment = async (req, res) => {
    try {
        const { departmentname } = req.body;
        console.log(req.body);
        const isExist = await DepartmentTable.findOne({ departmentname });
        if (isExist) {
            return res.status(400).json({ success: false, message: "Department Already Exists" });
        } 

        const newDepartment = new DepartmentTable({
            departmentname
        });
  
        await newDepartment.save();
        res.status(200).json({ success: true, message: "Department Saved", department: newDepartment });
    } catch (error) {
        console.error('Error saving department:', error);
        res.status(500).json({ success: false, message: "Error saving department", error: error.message });
    }
};

 
const GetAllDepartments = async (req, res) => {
    try {
        const departments = await DepartmentTable.aggregate([
            {
                $setWindowFields: { 
                  sortBy: { departmentname: -1 }, // Sort by salary in descending order 1 for as                  
                  output: {
                    row_num: { $documentNumber: {} }  
                  }
                }
            },      
            
            {$project: {
                _id: 1,
                departmentname: 1,
                disabled: 1,
                row_num: 1,  // Include serial number
            },}
        ]);

        if (!departments.length) {
            return res.status(200).json({ success: false, message: "No departments found." });
        }

        console.log(departments);
        res.status(200).json({ success: true, message: "Departments retrieved successfully", data: departments });
    } catch (error) {
        console.error('Error retrieving departments:', error);
        res.status(500).json({ success: false, message: "Error retrieving departments", error: error.message });
    }
};


// Function to search departments by name
const GetDepartmentByName = async (req, res) => {
    try {
        const { departmentName } = req.query;  
   
        console.log(req.query)
        if (!departmentName) {
            return GetAllDepartments(req, res);
        }

        const departments = await DepartmentTable.find({
            $and: [
                { departmentname: { $regex: departmentName, $options: 'i' } }, // Case-insensitive search
                // { departmentid: departmentid }
            ]
        });
        
        if (!departments.length) {
            return res.status(404).json({ success: false, message: "No matching departments found." });
        }

        res.status(200).json({ success: true, message: "Departments retrieved successfully", data:departments });
    } catch (error) {
        console.error('Error searching departments:', error);
        res.status(500).json({ success: false, message: "Error searching departments", error: error.message });
    }
};


const GetDepartmentById = async (req, res) => {
    try {
        
        const { id } = req.params;  
        console.log(id);
      
        const departments = await DepartmentTable.findById({ 
            _id:id            
        });

        if (!departments) {
            return { success: false, message: "Department not found" };
          }
         
        res.status(200).json({ success: true, message: "Departments retrieved successfully", data:departments });
    } catch (error) {
        console.error('Error searching departments:', error);
        res.status(500).json({ success: false, message: "Error searching departments", error: error.message });
    }
};



const DeleteDepartment = async(req,res) => {
    try { 
        const {id} = req.params; 
        console.log(id);
        const departments = await DepartmentTable.findByIdAndDelete({_id:id},)
        res.status(200).json({ success: true, message: "Departments Deleted Successfully", departments });

    } catch (error) {
        console.error('Error searching departments:', error);
        res.status(500).json({ success: false, message: "Error searching departments", error: error.message });
    }
}


const UpdateDepartment = async(req,res) => {
    try { 
        const {_id, departmentname} = req.body; 
         console.log(req.body);
        const departments = await DepartmentTable.findByIdAndUpdate(
            { _id: _id },
            { departmentname: departmentname,statusdate:Date.now() },
            { new: true } // Optional: returns the updated document
        );
          
        res.status(200).json({ success: true, message: "Update Successfully", departments });

    } catch (error) {
        console.error('Error While Update:', error);
        res.status(500).json({ success: false, message: "Error While Update", error: error.message });
    }
}
module.exports = { SaveDepartment, GetAllDepartments, GetDepartmentByName, GetDepartmentById, DeleteDepartment, UpdateDepartment };