import dbInit from '../src/db/init'
import sequelizeConnection from '../src/db/config'

const bootstrapTest = async () => {
    console.log('++++++ Bootstraping Tests +++++++')
    await sequelizeConnection.query('PRAGMA foreign_keys = false;');
     await dbInit();
     await sequelizeConnection.query('PRAGMA foreign_keys = true;');

};

export default bootstrapTest