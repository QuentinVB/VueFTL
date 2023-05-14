import dbInit from '../src/db/init'
import dbTeardown from '../src/db/teardown'

(async function () {
    console.log('++++++ Bootstraping Tests +++++++')
    //await dbTeardown();
    await dbInit();
})()
