const { Sequelize } = require('sequelize');

 
const sequelize = new Sequelize('myEMS', 'banti', 'banti1234', {
    host: 'localhost',  
    dialect: 'mssql',   
    port: 1433,         
    dialectOptions: {
        options: {
            encrypt: true,  
            trustServerCertificate: true,  
        }
    },
    logging: false, 
});
 
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

// Run the test on startup
testConnection();

// Export the Sequelize instance for use in models
module.exports = sequelize;
