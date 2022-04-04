@echo off
IF EXIST '../vue-ftl-database/database-test.sqlite3' (
    del '../vue-ftl-database/database-test.sqlite3' /q
    echo "test db deleted"
) ELSE (
    echo "no test db to delete"
)
