const express =require('express');
const cors = require('cors');
const AuthRouter = require('./Routers/AuthRoute');
const ApiRouter = require('./Routers/CommonRoutes');
const swaggerSpecs = require('./swaggerConfig');
const swaggerUi = require('swagger-ui-express');

require('dotenv').config();
require('dotenv').config();
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
app.use('/api/auth',AuthRouter);
app.use('/api',ApiRouter);

// const Defaultuser = {
//     _id: process.env.DEFAULT_USER_ID,
//     name: process.env.DEFAULT_USER_NAME,
//     email: process.env.DEFAULT_USER_EMAIL,
//     password: process.env.DEFAULT_USER_PASSWORD,
//     role: process.env.DEFAULT_USER_ROLE,
//     profileImage: process.env.DEFAULT_USER_PROFILE_IMAGE || '', // Default to empty if not set
// };

// module.exports = Defaultuser;