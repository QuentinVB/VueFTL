import {Sequelize} from 'sequelize-typescript';

//TODO : change according to config
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  database: 'movies',
  storage: ':memory:',
  models: [__dirname + '/models']
});
