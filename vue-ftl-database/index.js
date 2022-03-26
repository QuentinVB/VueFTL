import { Sequelize, DataTypes, Model } from 'sequelize';
import User from '../vue-ftl-server/models/User.js';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite3'
});

User.init(sequelize);

/*
Group.init(sequelize);
Group.hasMany(User);
User.belongsTo(Group);
*/

  var syncModels = async() =>{
    await User.sync();
    //await Group.sync();
    console.log(User === sequelize.models.User);
    //console.log(Group === sequelize.models.Group);
  };
  
  var insertUser = async() =>{
    const role = await Group.findOne({where:{name:"admin"}});
    console.log("role auto-generated ID:", role.id);

    const jane = await User.create({ firstName: "Jules", lastName: "Doe" });
    await jane.setGroup(role);
    //await jane.save();
    console.log("Jane's auto-generated ID:", jane.id);
  };

  var insertGroup = async() =>{
    const admin = await Group.create({ name: "admin"});
    console.log("admin auto-generated ID:", admin.id);
  };
  
  var getUsers = async() =>{
    const users = await User.findAll();
    console.log(users.every(user => user instanceof User)); // true
    console.log("All users:", JSON.stringify(users, null, 2));

  };

  var getJules = async() =>{
    const user = await User.findOne({
      where:{ firstName:"Jules"},
      include: { model: Group}}//, as: 'Instruments' 
      );
      console.log(JSON.stringify(user, null, 2));
  };

  var destroyJules = async() =>{
    await User.destroy({
      where: {
        firstName: "Jules"
      }
    });
      console.log("Destroyed jules");
  };

  ExecQuery(syncModels);


async function ExecQuery(query)
{
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    query();

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}