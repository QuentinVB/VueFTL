select COLUMN_NAME, CONSTRAINT_NAME, REFERENCED_COLUMN_NAME, REFERENCED_TABLE_NAME
from information_schema.KEY_COLUMN_USAGE
where TABLE_NAME = 'ships';

ALTER TABLE `ships`
	DROP FOREIGN KEY `ships_ibfk_10`;


TS : loop on CONSTRAINT_NAME and request
SQL : pipe CONSTRAINT_NAME to a function ?