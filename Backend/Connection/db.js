const mogoose =require('mongoose');
const { insertDefaultEmployees } = require('../Schemas/employeesSchema');

const mongoose_url = process.env.MONGO_CONN;
mogoose.connect(mongoose_url)
    .then(() =>{
        console.log('Mongoose Connect');
        insertDefaultEmployees();
    }
    ).catch((err) =>{
        console.log('Error : ',  err);
    }

)