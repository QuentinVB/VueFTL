import { Sequelize } from 'sequelize';

//TODO : load db connection from ENV
export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../../vue-ftl-database/database.sqlite'
});

export default class DBConnection{

  static async Query(query)
  {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      query();
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
    finally
    {
      console.log('Query finished.');
    }
  }
}