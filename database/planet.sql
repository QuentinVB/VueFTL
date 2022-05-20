CREATE TABLE IF NOT EXISTS planet (
	id INTEGER PRIMARY KEY,
   	uuid TEXT NOT NULL,
   	name TEXT NULL,
   	type TEXT NULL,
    starsystem_id INT NULL,
    orbit REAL DEFAULT 0,
    radius REAL DEFAULT 0,
    minerals REAL DEFAULT 0,
    -- location
	--table_constraints
    FOREIGN KEY (starsystem_id) 
      REFERENCES starsystem (id) 
         ON DELETE NO ACTION 
         ON UPDATE NO ACTION
)