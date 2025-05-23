const { Router } = require('express');
const DatabaseHelper = require('../DatabaseHelper/DatabaseHelper');
const dbhelper = new DatabaseHelper();

const SaveDepartment = async(req,res) => {
    try {
        const { departmentname } = req.body;
        const save = await dbhelper.executeProcedureNew('spSaveDepartments',{
            departmentname :departmentname,
            deptid :0
        });
        return res.status(200).json({ success:true, message: 'Department Save', data: save});
    } catch (error) {
        return res.status(500).json({ success:false, message: error.message });
    }
}

const UpdateDepartment = async(req,res) => {
    try {
        const {_id, departmentname} = req.body; 
        const save = await dbhelper.executeProcedureNew('spSaveDepartments',{
            departmentname :departmentname,
            deptid :_id
        });
        return res.status(200).json({ success:true, message: 'Department Update', data: save});
    } catch (error) {
        return res.status(500).json({ success:false, message: error.message });
    }
}

const GetAllDepartment = async(req,res) => {
    try { 
        const data = await dbhelper.executeProcedureNew('SpGetAllDepartments');
       console.log(data);
        const formattedData = data.map(dept => ({
            id: dept.departmentid,      // assuming this field exists
            name: dept.departmentname,  // renamed from departmentname to name
            TotalRecords: dept.TotalRecords,
            RowNum: dept.RowNum
        }));

        console.log(formattedData[0].TotalRecords);
        return res.status(200).json({ success:true, message: 'Department Update', data: formattedData ,totalRecords :formattedData[0].TotalRecords});
    } catch (error) {
        return res.status(500).json({ success:false, message: error.message });
    }
}

const GetDepartmentById = async(req,res) => {
    try { 
        console.log(req.params.id);
        const data = await dbhelper.executeScalar('select departmentName as name from departments where departmentid ='+req.params.id);

        return res.status(200).json({ success:true, message: 'View / Edit Department', data: data});
    } catch (error) {
        return res.status(500).json({ success:false, message: error.message });
    }
}


const DeleteDepartment = async(req,res) => {
    try { 
        console.log(req.params.id);
        const data = await dbhelper.executeScalar(' update departments set isActive='+"'n'"+',isDelete='+"'y'"+' where departmentid = '+req.params.id);
        return res.status(200).json({ success:true, message: 'Department Delete Successfully'});
    } catch (error) {
        return res.status(500).json({ success:false, message: error });
    }
}
module.exports = {SaveDepartment,UpdateDepartment,GetAllDepartment,GetDepartmentById,DeleteDepartment}