const mogoose =require('mongoose');
const mongoose_url = process.env.MONGO_CONN;

const mongoose = require('mongoose');

mogoose.connect(mongoose_url)
    .then(() =>{

        console.log('Mongoose Connect');
         
    }
    ).catch((err) =>{
        console.log('Error : ',  err);
    }

)
 
async function dropDatabase() {
  try {
    // Connect to the database
    await mongoose.connect(mongoose_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Drop the database
    await mongoose.connection.db.dropDatabase();
    console.log('Database dropped');

    // Close the connection
    await mongoose.connection.close();
    console.log('Connection closed');
  } catch (err) {
    console.error('Error:', err);
  }
}

//dropDatabase();

module.exports = {dropDatabase}
