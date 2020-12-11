docker run \
 --name postgres \
 -e POSTGRES_USER=eltoncampos1 \
 -e POSTGRES_PASSWORD=minhasenhasecreta \
 -e POSTGRES_DB=heros \
 -p 5432:5432 \
 -d \
 postgres


docker ps
docker exec --t postgres /bin/bash

docker run \
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
     -d \
     adminer

## ----- MONGODB
docker run \ 
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin \
  -d \

docker run \ 
    --name mongoclient \ 
    -p 3000:3000 \
    --link mongodb:mongodb \
    -d \
    mongoclient/mongoclient

docker exec -it mongodb mongo --host localhost -u admin -p senhaadmin --authenticationDatabase admin --eval "db.getSiblingDB('heros').createUser({user: 'eltoncampos', pwd: 'minhasenhasecreta', roles: [{role: 'readWrite', db: 'heros'}]})"