import express, { Application } from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import sequelize from "./database/connection";
import user from "./routes/user.router";
import product from "./routes/product.router";
import token from "./routes/token.router";
import { environment } from "./environments/environment";

export default class App {
    private app: Application;
    private port : Number | String = environment.PORT || 3000;
    private server: any;

    constructor(
    ) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.databaseConect();
        this.routes();
    }

    private async databaseConect() {
        try {
            await sequelize.authenticate();
            console.log("Conexión a la base de datos establecida exitosamente.");
          } catch (error) {
            console.error("Error al conectar a la base de datos:", error);
            process.exit(1);
          }
    }

    private settings() {
        this.app.set('port', this.port);
        console.log(`http://localhost:${this.port}`)
    }

    private middlewares() {
        this.app.use(helmet());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.json());
    }

    private routes() {
        this.app.use('/user', user);
        this.app.use('/product', product);
        this.app.use('/token', token);

        this.app.use((req, res, next) => {
            return res.status(404).send("Ruta no encontrada");
        });

    }

    async listen(): Promise<any> {
        this.server = await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
        return this.server;
    }

    async close(): Promise<void> {
        if (this.server) {
            await this.server.close();
            console.log('Server stopped');
        }
        if(sequelize){
            await sequelize.close();
            console.log('Sequelize stopped');
        }
    }

}