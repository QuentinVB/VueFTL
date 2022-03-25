import { Sequelize, DataTypes, Model } from 'sequelize';
import { User } from './User.js';
import { Group } from './Group.js';

// Option 1: Passing a connection URI
//const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite

// Option 2: Passing parameters separately (sqlite)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

User.init(sequelize);
Group.init(sequelize);
Group.hasMany(User);
User.belongsTo(Group);
// Option 3: Passing parameters separately (other dialects)
/*
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' 
});
*/

(async() => {

  var syncModels = async() =>{
    await User.sync();
    await Group.sync();
    console.log(User === sequelize.models.User);
    console.log(Group === sequelize.models.Group);
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

  ExecQuery(getUsers);
})();