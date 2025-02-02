const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../sequelize')


// Define the Department model with the appropriate fields
const Department = sequelize.define('Department', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    departmentname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    recordstatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'insert',
    },
    statusdate: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    disabled: {
        type: DataTypes.ENUM('n', 'y'),
        allowNull: false,
        defaultValue: 'n',
    },
    isdeleted: {
        type: DataTypes.ENUM('n', 'y'),
        allowNull: false,
        defaultValue: 'n',
    },
    
}, {
    tableName: 'departments',  // Table name in SQL Server
    timestamps: false,         // Disabling timestamps (createdAt, updatedAt)
});

// Sync the model with the database (create the table if it doesn't exist)
async function syncTable() {
    try {
        await sequelize.sync({ force: false ,alter: true});  // 'force: false' prevents overwriting the table
        console.log('Department table synced!');
    } catch (error) {
        console.error('Error syncing table:', error);
    }
}

module.exports = { Department, syncTable };


// async function getDepartments() {
//     try {
//         const result = await sequelize.query('EXEC GetDepartments', {
//             type: sequelize.QueryTypes.SELECT, // Use SELECT to retrieve data
//         });

//         console.log('Departments:', result);
//         return result;
//     } catch (error) {
//         console.error('Error executing stored procedure:', error);
//     }
// }


// async function getDepartmentById(departmentId) {
//     try {
//         // Passing a parameter (departmentId) to the stored procedure
//         const result = await sequelize.query('EXEC GetDepartmentById @departmentId = :id', {
//             replacements: { id: departmentId }, // The parameter value
//             type: sequelize.QueryTypes.SELECT,  // Use SELECT to retrieve data
//         });

//         console.log('Department:', result);
//         return result;
//     } catch (error) {
//         console.error('Error executing stored procedure:', error);
//     }
// }