const {Router} = require('express');
const DatabaseHelper= require('../DatabaseHelper/DatabaseHelper');
const dbhelper = new DatabaseHelper();

const SaveDesignation = async(req,res) => {
    try {
        console.log(req.body);
        const { _id,name } = req.body;
        const save = await dbhelper.executeProcedureNew('spSavedesignation',{
            name :name,
            id :0
        });
        return res.status(200).json({ success:true, message: 'Designation Save', data: save});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success:false, message: "Error While Saving Designation" });
    }
}

const UpdateDesignation = async(req,res) => {
    try {
        const {_id, name} = req.body; 
        const save = await dbhelper.executeProcedureNew('spSavedesignation',{
            name :name,
            id :_id
        });
        return res.status(200).json({ success:true, message: 'Designation Update', data: save});
    } catch (error) {
        return res.status(500).json({ success:false, message: error.message });
    }
}

const GetAllDesignation = async(req,res) => {
    try { 
        const data = await dbhelper.executeProcedureNew('SpGetAlldesignation');
        return res.status(200).json({ success:true, message: ' View All Designation', data: data});
    } catch (error) {
        return res.status(500).json({ success:false, message: error.message });
    }
}

const GetDesignationById = async(req,res) => {
    try { 
        console.log(req.params.id);
        const data = await dbhelper.executeScalar('select designationname as name from designation where designationid ='+req.params.id);
        return res.status(200).json({ success:true, message: 'View / Edit Designation', data: data});
    } catch (error) {
        return res.status(500).json({ success:false, message: error.message });
    }
}


const DeleteDesignation = async(req,res) => {
    try { 
        console.log(req.params.id);
        const data = await dbhelper.executeScalar(' update designation set isActive='+"'n'"+',isDelete='+"'y'"+' where designationid = '+req.params.id);
        return res.status(200).json({ success:true, message: 'Department Delete Successfully'});
    } catch (error) {
        return res.status(500).json({ success:false, message: error });
    }
}
module.exports = {SaveDesignation,UpdateDesignation,GetAllDesignation,GetDesignationById,DeleteDesignation}