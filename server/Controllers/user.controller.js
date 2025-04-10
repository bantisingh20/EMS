const DatabaseHelper = require('../DatabaseHelper/DatabaseHelper');
const jwt = require('jsonwebtoken');
const dbHelper = new DatabaseHelper();

const SaveUser = async(req,res) =>{
    try {

        const result = await dbHelper.executeProcedureNew('spSaveEmployee', {
            email: '',
            password: ''
          });
        
    } catch (error) {
        
    }
}