import { Sequelize, DataTypes, Model } from 'sequelize';

//TODO : load db connection from ENV
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../../vue-ftl-database/database.sqlite'
});

export async function ExecQuery(query)
{
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    query();

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}