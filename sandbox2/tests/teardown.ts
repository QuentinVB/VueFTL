import dbTeardown from "../src/db/teardown";

const teardownTest = async () => {
    console.log('++++++ TearDown Tests +++++++')
     //await Recipe.sequelize?.query("SET FOREIGN_KEY_CHECKS = 0")
    await dbTeardown();
    //await Recipe.sequelize?.query("SET FOREIGN_KEY_CHECKS = 1")
};

export default teardownTest