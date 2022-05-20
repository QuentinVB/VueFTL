CREATE TABLE IF NOT EXISTS player (
	id INTEGER PRIMARY KEY,
   	uuid TEXT NOT NULL,
   	username TEXT NOT NULL,
	credits REAL DEFAULT 0
	--table_constraints
)