# MDS-CaseStudy-System

For the genfake-data.sh script, you first have to clone this repository:  
https://github.com/KASTEL-MobilityLab/mds-provider-services  

  * Then put the script in the main folder of the repository
  * Check if it's executable/make it executable with chmod +x genfake-data.sh
  * Run the script (./genfake-data.sh)
  * Now you find the generated fake data (status_changes and trips) in JSON files in the data folder of the repository. 
  
  
For sending fake data to the agency which saves it in the database:
  * Clone the repository
  * Navigate to mds-client (cd mds-client)
  * Run docker build -t mds-client .
  * Navigate back to the upper folder (cd ..)
  * Start docker-compose (docker-compose up -d)
  * If you want, delete the current database (or you can also not mount a volume inside the docker-compose file)
  * For deleting the data from the database, go to localhost:8088 (works only if docker-compose is started, because one service is pgadmin)
  * login with 
    * Username: user@domain.com
    * Password: pgadmin_password
  * Add server postgres with password, username, server: postgres
  * Click on the symbol on the left upper part of the window with database symbol and run arrow, then you can insert the SQL query:
  DELETE FROM devices WHERE true
  * In the docker container mds-client, the script for adding vehicles to the database will be executed, you can test if it has worked through the pgadmin site, typing: SELECT * from devices, there should be 291 entries in it. You also get a response in the command line of the docker container (docker logs CONTAINER_ID), if it has worked.
  
If you want to send other data to the agency, just follow the first instruction part, then copy the generated provider_status_changes.json file into the mds-client folder and rename it provider_status_changes.json (replace or delete the other file in the folder with the same name)
  
  
