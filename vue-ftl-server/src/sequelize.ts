import {Sequelize} from 'sequelize-typescript';
import config from '~/config/db.config';

//TODO : change according to config

models: [__dirname + '/models']

const env = process.env.NODE_ENV || "test";
const currentConfig = config[env];

let sequelize;
if (currentConfig.use_env_variable) {
	sequelize = new Sequelize(process.env[currentConfig.use_env_variable], currentConfig);
} else {
	sequelize = new Sequelize(currentConfig.database, currentConfig.username, currentConfig.password, currentConfig);
}

export default sequelize;