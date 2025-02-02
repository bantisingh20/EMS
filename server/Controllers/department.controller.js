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
        return res.status(200).json({ success:true, message: 'Department Update', data: data});
    } catch (error) {
        return res.status(500).json({ success:false, message: error.message });
    }
}

const GetDepartmentById = async(req,res) => {
    try { 
        console.log(req);
        const data = await dbhelper.executeScalar('select departmentName from departments where departmentid =');
        return res.status(200).json({ success:true, message: 'Department Update', data: data});
    } catch (error) {
        return res.status(500).json({ success:false, message: error.message });
    }
}
module.exports = {SaveDepartment,UpdateDepartment,GetAllDepartment}