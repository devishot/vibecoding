## MongoDB

Required files:
- [docker-compose.yml](./docker-compose.yml)
- [mongodb_data/](./mongodb_data/)
- [mongod.conf](./mongod.conf)
- [logs/](./logs/)

### How to run mongodb in Docker:
> docker compose up

### How to connect to mongo cli in Docker:
> docker exec -it cloudoffice-mongo-1 mongo -u root -p TestPasswordReplaceIt --authenticationDatabase admin
