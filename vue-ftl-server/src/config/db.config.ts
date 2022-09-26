/*global process*/
/*eslint no-undef: "error"*/

export default {
	development: {
		dialect: "sqlite",
		storage: "../vue-ftl-database/database.sqlite3",
		logging:true
	},
	test: {
		dialect: "sqlite",
		storage: "../vue-ftl-database/database-test.sqlite3",
		logging:false
	},
	production: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DB_NAME,
		host:process.env.DB_HOST,
		dialect:"mysql",
		logging:false
	}
};
