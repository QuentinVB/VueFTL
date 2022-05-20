CREATE TABLE IF NOT EXISTS ship (
	id INTEGER PRIMARY KEY,
   	uuid TEXT NOT NULL,
   	name TEXT NULL,
    player_id INT NULL,
	fuel REAL DEFAULT 0,
	fuel_efficiency REAL DEFAULT 0,
	hull INT DEFAULT 0,
	hull_factor REAL DEFAULT 0,
    position_x REAL DEFAULT 0,
    position_y REAL DEFAULT 0,
    -- location
	--table_constraints
    FOREIGN KEY (player_id) 
      REFERENCES player (id) 
         ON DELETE NO ACTION 
         ON UPDATE NO ACTION
)