import { Sequelize } from "sequelize";
import { User } from "./models/Users";
import { Product } from "./models/Products";
import { Credential } from "./models/Credentials";
import { environment } from "../environments/environment";

const connection = new Sequelize(environment.DB_NAME, environment.DB_USER, environment.DB_PASSWORD, {
    host: environment.DB_HOST,
    dialect: 'mysql'
});

User.initialize(connection);
Product.initialize(connection);
Credential.initialize(connection);

export default connection;