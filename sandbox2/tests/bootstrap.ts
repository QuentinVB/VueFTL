import dbInit from '../src/db/init'


const bootstrapTest = async () => {
    console.log('++++++ Bootstraping Tests +++++++')

     await dbInit();
};

export default bootstrapTest