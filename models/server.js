import express  from "express";
import cors from "cors"
import { db } from "../database/connection.js"
import  { routerUser } from "../routes/user.js"
import fileUpload from "express-fileupload";
import { routerRole } from "../routes/role.js";
import { routerAuth } from "../routes/auth.js";
import { routerPatient } from "../routes/patient.js";
import { routerApoiment } from "../routes/appoiment.js";

const whiteList = ['http://localhost:3000'];
const corsOptions = {
    origin: (origin, callback) => {
        const exist = whiteList.some(domain => domain === origin);
        if (exist) {
            callback(null, true);
        } else {
            callback(new Error('Access denied'));
        }
    }
}

//server
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.patientPath = '/api/patient'
        this.rolePath = '/api/role'
        this.appoimentPath = '/api/appoiment'
        this.userPath = '/api/user'
        this.livingPath = '/api/livingPlace'
        this.authPath = '/api/auth';

        //Conexion a bd
        this.dbConnection();

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }

    middlewares() { // son funciones que se ejecutan siempre que se levante el servidor

        //CORS
        this.app.use(cors());

        //Lectura y paseo del body
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'))

        //subida de archivos al servidor
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/'
        }));

    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('DB online');
        } catch (error) {
            throw new Error(error);
        }
    }

    routes() {
        
        this.app.use(this.userPath, routerUser)
        this.app.use(this.rolePath, routerRole)
        this.app.use(this.authPath, routerAuth)
        this.app.use(this.patientPath, routerPatient)
        this.app.use(this.appoimentPath, routerApoiment)
     
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto http://localhost:', this.port)
        })
    }

}



export {Server};