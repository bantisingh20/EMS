const { Sequelize } = require('sequelize');

 
// const sequelize = new Sequelize('myEMS', 'banti', 'banti1234', {
//     host: 'localhost',  
//     dialect: 'mssql',   
//     port: 1433,         
//     dialectOptions: {
//         options: {
//             encrypt: true,  
//             trustServerCertificate: true,  
//         }
//     },
//     logging: false, 
// });

const sequelize = new Sequelize('myEMS', null, null, {
    dialect: 'mssql',
    host: 'localhost',
    port: 1433,
    dialectOptions: {
      authentication: {
        type: 'ntlm',
        options: {
          userName: 'admin',           // from CMD
          password: 'Setu@123',   // your Windows login password
          domain: 'SETU19',            // your computer name
        }
      },
      options: {
        encrypt: false,
        trustServerCertificate: true,
      }
    },
    logging: false
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
