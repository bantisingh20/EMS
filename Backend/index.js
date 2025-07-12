const express =require('express');
const cors = require('cors');
const AuthRouter = require('./Routers/AuthRoute');
const ApiRouter = require('./Routers/CommonRoutes');
const swaggerSpecs = require('./swaggerConfig');
const swaggerUi = require('swagger-ui-express');
const { dropDatabase } = require('./Connection/db');
const { verifyuser } = require('./middleware/authmiddleware');

require('dotenv').config();
//require('dotenv').config();
require('./Connection/db')

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use(cors());
app.use(express.json()); 
 
const Port = process.env.PORT;

app.listen(Port, () =>{
    console.log(`Sever is running on port no ${Port}`);
    console.log(`Swagger docs available at http://localhost:${Port}/api-docs`);
})

app.get('/ping', (req,res) => {
    res.send('PONG');
})


//client side request
app.use('/api/drop' , async (req, res) => {
    try { 
        await dropDatabase();
        res.status(200).json({ success: true, message: "Database dropped successfully" });
    } catch (error) {
        console.error('Error dropping database:', error);
        res.status(500).json({ success: false, message: "Error dropping database", error: error.message });
    }
});
app.use('/api/auth',AuthRouter);
app.use('/api',verifyuser,ApiRouter);