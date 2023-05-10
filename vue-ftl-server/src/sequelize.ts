import path from 'path';
const __dirname = path.resolve();

import {Sequelize} from 'sequelize-typescript';
import config from './config/db.config';

//TODO : change according to config
import * as dotenv from 'dotenv';
dotenv.config(); 


const env = process.env.NODE_ENV || "test";
const currentConfig = {
  ...config[env]
  , models: [__dirname + '/**/models/*.model.ts'] 
};

let sequelize: Sequelize;

if (currentConfig.use_env_variable) {
	sequelize = new Sequelize(currentConfig);
} else {
	sequelize = new Sequelize(currentConfig.database, currentConfig.username, currentConfig.password, currentConfig);
}

console.log("Sequelize initialized !");
export default sequelize;