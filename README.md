# MDS-CaseStudy-System

## Introduction

This is a Case Study for security research in the mobility sector using modules of the reference implementation [mds-core](https://github.com/lacuna-tech/mds-core). To generate data for the mds-core, a slightly modified version of [mds-provider-services](https://github.com/CityofSantaMonica/mds-provider-services), [this](https://github.com/KASTEL-MobilityLab/mds-provider-services) one is used. The `mds-provider-services` repository depends on [mds-provider](https://github.com/cityofsantamonica/mds-provider) which also slightly was modified, because otherwise it hadn't worked. The modified version can be found [here](https://github.com/KASTEL-MobilityLab/mds-provider).

## Overview of the `mds-casestudy-system`

![Overview MDS-CaseStudy-System](structure-overview.png)

## Usage

### First steps

Clone this repository, then

```sh
docker build -t CONTAINER_IMAGE_NAME .
docker run -v /var/run/docker.sock:/var/run/docker.sock -e NODE_ENV=development CONTAINER_IMAGE_NAME image 
```

If your machine which builds the images of the containers doesn't have enough RAM, add 
--workspace-concurrency 2
to the above command.

The docker socket of the host is being mounted into the docker socket of the container, so that the built images can be accessed by the host later (because the docker container uses the socket of the host machine).


### Generate fake data

For the genfake-data.sh script, you first have to clone [this](https://github.com/KASTEL-MobilityLab/mds-provider-services) repository:

  - Then put the script genfake-data.sh in the main folder of the repository
  - Check if it's executable/make it executable with chmod +x genfake-data.sh
  - Run the script (./genfake-data.sh)
  - Now you find the generated fake data (status_changes and trips) in JSON files in the data folder of the repository. 
  
### Insert data via the mds-client into mds-agency

For sending fake data to the agency which saves it in the database: (after following the first steps introduction)

  ```sh
  cd mds-client
  docker build -t mds-client .
  cd ..
  docker-compose up -d
  ```

If you want to send other requests to the mds-agency, there is [documentation](https://github.com/openmobilityfoundation/mobility-data-specification/tree/main/agency) about the API Endpoints, what methods do exist and what parameters are required.


#### Authentication handled through mds-client

There is some authentication required for accessing mds-agency which is already built into the mds-client.

In fact, `mds-core` doesn't have a 'real' authentication. When you send a request to the mds-agency, you need to include a JWT Token which has to include the provider_id to authenticate and identify the right provider (and add the vehicle to the right provider e.g.). But the provider_id can be a random UUID. This UUID has to be used to calculate a JWT and then can be used as Authorization as a Bearer Token in the request.
The secret of the JWT is the provider_id.

You need the authentication otherwise the request can't be related to a provider and thus fails.


#### Explanation of some implementation decisions of mds-client

- The mds-client is written in Typescript and uses the `axios` package for sending the requests to the mds-agency. `node-fetch` was another possibility which wasn't used because it only supports `import` and not `require` anymore. 
- Typescript has to compile it as a ES Modul and not CommonJS anymore, therefore in the tsconfig.json file change the module to ESNext, incomment moduleResolution:node and allowSyntheticDefaultImports.
- In typescript write the keyword 'new' before objects
- adding some dev-dependencies was also necessary, because the modules are written in Javascript and Typescript likes types, as well as adding .js at the end of some imports, e.g. stream-json/streamers/StreamArray.js
- tsc FILE_NAME doesn't work because it ignores the tsconfig file, so just type tsc to compile
- added type:module in the package.json because of node



### PgAdmin

When you start the application with docker-compose, there is also a pgadmin client which is being started along

  * If you want, delete the content of the current database (or you can also not mount a volume inside the docker-compose file)
  * For deleting the data from the database, go to localhost:8088 (works only if docker-compose is started, because one service is pgadmin)
  * Login with 
    - Username: user@domain.com
    - Password: pgadmin_password
  * Add server postgres with password and server: postgres
  * Click on the symbol on the left upper part of the window with database symbol and run arrow, then you can insert the SQL query:
  ```sql
  DELETE FROM devices WHERE true
  ```
  * In the docker container mds-client, the script for adding vehicles to the database will be executed automatically. You can test if it has worked through the pgadmin site, typing: 
  ``` sql
  SELECT * from devices
  ```
  There should be 291 entries in it (in the JSON file there are about 7000 but a lot of duplicates). You also get a response in the command line of the docker container (docker logs CONTAINER_ID), if it has worked.
  
If you want to send other generated data to the agency, just follow the first instruction part, then copy the generated provider_status_changes.json file into the mds-client folder and rename it provider_status_changes.json (replace or delete the other file in the folder with the same name)


### MDS-Provider-Services

`mds-provider-services` also includes a pgadmin client, but when you just follow the instructions on the github site of the repo, you get permission conflicts, cause the user pgadmin is not allowed to write into the directory /var/lib/pgadmin. There are two solutions, 
- in the docker-compose file, mount another folder to that place so that docker decides where to save it without permission conflict: 
```sh
volumes:
      - pgadmin:/var/lib/pgadmin   
```
- change the owner rights:
```sh
sudo chown -R 5050:5050 data/pgadmin/
```
Restart docker-compose and login with 
- username: user@domain.com
- password: pgadmin_password


Modified `mds-provider-services` because of wrong schema-url, set another default value which works now. There was a change between the versions of mds in the naming of the files and also the schema of the json file. And after the changes the `mds-provider` repo wasn't maintained anymore.
Also changed the `mds-provider` because of a syntax error in calculating the sum. Therefore changed the dependent git repo for `mds-provider-services` to the forked one with the correct sum calculation. 



## Helpful remarks

* When using mds-core locally, make sure, the right version of pnpm is installed! Although the version number was specified in the package.json, I had to manually deinstall and reinstall pnpm with npm install -g pnpm@6.32.11
* If mds-core gets a new version tag, you have to manually update that in the docker-compose file of this repo (because pnpm doesn't build on tag:latest)
* Don't miss the environment variables (PG_USER=PG_PASS=postgres, PG_HOST=postgres (Name of the service in the docker-compose file), REDIS_HOST=redis) for the docker-compose file, they are essential to create the connection between the services on one side and the Postgres DB and Redis on the other side
* To create a new database, insert POSTGRESQL_DATABASE=NAME_OF_DATABASE in the postgres-Part of the docker-compose file
* If you want to send requests to the mds-agency from outside the docker-compose network, you have to use the IP-Address of that container and the port 4000
  
