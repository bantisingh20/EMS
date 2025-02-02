const sequelize = require('../sequelize');
const { QueryTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');

class DatabaseHelper {
  constructor() {
    this.lastError = null;
    this.logFile = 'db_error.log';
    this.handleErrors = true;
  }

  // Helper method to log errors
  logError(message) {
    if (this.handleErrors) {
      fs.appendFileSync(this.logFile, `${new Date().toISOString()} - ${message}\n`);
    }
  }

  // Execute a simple query (no result expected)
  async executeNonQuery(query, params = []) {
    try {
      await sequelize.query(query, {
        replacements: params,
        type: QueryTypes.RAW, // You can choose other types if needed, like SELECT, INSERT, etc.
      });
    } catch (error) {
      this.lastError = error.message;
      this.logError(error.message);
      throw error;
    }
  }

  // Execute query and get scalar result
  async executeScalar(query, params = []) {
    try {
      const result = await sequelize.query(query, {
        replacements: params,
        type: QueryTypes.SELECT,
      });
      return result[0];
    } catch (error) {
      this.lastError = error.message;
      this.logError(error.message);
      throw error;
    }
  }

  // Begin a transaction
  async beginTransaction() {
    const transaction = await sequelize.transaction();
    return transaction;
  }

  // Commit the transaction
  async commitTransaction(transaction) {
    await transaction.commit();
  }

  // Rollback the transaction
  async rollbackTransaction(transaction) {
    await transaction.rollback();
  }

  // Bulk insert
  async bulkInsert(tableName, data) {
    try {
      await sequelize.bulkInsert(tableName, data);
    } catch (error) {
      this.lastError = error.message;
      this.logError(error.message);
      throw error;
    }
  }

  async executeProcedure(procedureName, params = []) {
    try {
      // Start constructing the SQL query for the stored procedure
      let query = `EXEC ${procedureName}`;
  
      if (params.length > 0) {
        // Add each parameter to the query dynamically
        const paramStr = params
          .map((param, index) => `@${param.name} = :${param.name}`) // Parameter names like @mailid = :mailid
          .join(', '); // Join them with commas
  
        query += ` ${paramStr}`;
      }
  
      // Construct the replacements object, where param.name is the key and param.value is the value
      const replacements = params.reduce((acc, param) => {
        acc[param.name] = param.value;
        return acc;
      }, {});
  
      // Execute the query
      const result = await sequelize.query(query, {
        replacements: replacements,
        type: QueryTypes.SELECT,
      });
      return result;
    } catch (error) {
      this.lastError = error.message;
      this.logError(error.message);
      throw error;
    }
  }
 
  async executeProcedureNew(procedureName, params = {}) {
    try {
      let query = `EXEC ${procedureName}`;
       console.log(params);
      if (Object.keys(params).length > 0) {
        const paramStr = Object.keys(params)
          .map((key) => `@${key} = :${key}`)
          .join(', ');

        query += ` ${paramStr}`;
      }
  
      const replacements = { ...params };
      
      // Execute the query
      const result = await sequelize.query(query, {
        replacements: replacements,
        type: QueryTypes.SELECT,
      });
      return result;
    } catch (error) {
      this.lastError = error.message;
      console.error(error.message);
      throw error;
    }
  }
  // Method to return the last error
  getLastError() {
    return this.lastError;
  }
}

module.exports = DatabaseHelper;


// const dbHelper = new DatabaseHelper();

// async function exampleUsage() {
//   const procedureName = 'spGetMailMessage';  // Stored procedure name
//   const params = [
//     { name: 'mailid', value: 'user@example.com' },  // First parameter
//     { name: 'employeeid', value: 12345 },  // Second parameter
//   ];

//   try {
//     const result = await dbHelper.executeProcedure(procedureName, params);
//     console.log(result);  // Log the result from the stored procedure
//   } catch (error) {
//     console.error('Error executing procedure:', error);
//   }
// }

// exampleUsage();

