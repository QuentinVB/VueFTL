import {Sequelize} from 'sequelize-typescript';
import config from '~/config/db.config';

//TODO : change according to config
import dotenv from 'dotenv'
dotenv.config(); 


const env = process.env.NODE_ENV || "test";
const currentConfig = {
  ...config[env]
  , models: [__dirname + '/models'] 
};

let sequelize: Sequelize;

if (currentConfig.use_env_variable) {
	sequelize = new Sequelize(currentConfig);
} else {
	sequelize = new Sequelize(currentConfig.database, currentConfig.username, currentConfig.password, currentConfig);
}

export default sequelize;