import express from 'express';
import bodyParser from 'body-parser';
import envConfig from './config/config_internal.js';
import db from './models/index.js';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));



//cors error solution
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET , POST, PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-type,Authorization');    
    next();
});


//api not found
app.use((req,res)=>{
    res.status(404).json({message:'Route Not Found !'});
});


db.sequelize.sync().then(req=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on the port ${process.env.PORT}`);
    })    
}).catch((err)=>{
    console.log('Error Occured while connecting With Database' , + err);
})
