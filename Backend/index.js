const express =require('express');
const cors = require('cors');
const AuthRouter = require('./Routers/AuthRoute');
require('dotenv').config();
const ApiRouter = require('./Routers/CommonRoutes');

require('dotenv').config();
require('./Connection/db')

const app = express();
app.use(cors());
app.use(express.json()); 
const Port = process.env.PORT;

app.listen(Port, () =>{
    console.log(`Sever is running on port no ${Port}`);
})

app.get('/ping', (req,res) => {
    res.send('PONG');
})

//client side request
app.use('/auth',AuthRouter);
app.use('/api',ApiRouter);

const Defaultuser = {
    _id: process.env.DEFAULT_USER_ID,
    name: process.env.DEFAULT_USER_NAME,
    email: process.env.DEFAULT_USER_EMAIL,
    password: process.env.DEFAULT_USER_PASSWORD,
    role: process.env.DEFAULT_USER_ROLE,
    profileImage: process.env.DEFAULT_USER_PROFILE_IMAGE || '', // Default to empty if not set
};

module.exports = Defaultuser;