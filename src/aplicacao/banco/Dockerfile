FROM mysql:5.5.48
# #/mysql-server:5.5.48

COPY createDB.sql /docker-entrypoint-initdb.d/
COPY inserts.sql /docker-entrypoint-initdb.d/
