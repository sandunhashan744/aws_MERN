import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import connect from "./database/connect.js";    //db_connection
import router from "./routers/route.js";        //get_routers

const app = express();

app.use(bodyParser.json({ limit: '1000mb' }));

// middelware
app.use(cors());
app.use(express.json());
app.use(morgan());
//app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hackers know about our stack

const PORT = process.env.PORT || 8080;

app.use('/api', router)
 

connect().then(() =>{
    try {
        app.listen(PORT, () => {
            console.log(`Server connected to http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log('can not connect to the database')        
    }
}
).catch(error => {
    console.log('Invalid connection...!')
})

