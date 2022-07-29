import parser from "stream-json";
import pick from "stream-json/filters/Pick.js";
import chain from "stream-chain";
import streamArray from "stream-json/streamers/StreamArray.js";
import * as fs from "fs";

import axios from "axios";

//JWT bearer_token has been generated out of provider_id which is just a normal uuid and is used to identify the provider
var bearer_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1N2YxZTA2Mi04NzY2LTRkMDMtYjhjYy00ZTMyYmFmOWRmNmIiLCJodHRwczovL29wZW5tb2JpbGl0eWZvdW5kYXRpb24ub3JnL3VzZXJfZW1haWwiOiJ1c2VyQHRlc3QuYWkiLCJodHRwczovL29wZW5tb2JpbGl0eWZvdW5kYXRpb24ub3JnL3Byb3ZpZGVyX2lkIjoiYmRmODk2YWYtNjQyZC00NTk1LTg0MGItOTMwYzJhZGExZjYzIiwic2NvcGUiOiJhZG1pbjphbGwiLCJpYXQiOjE2NTc4MTEyMDV9.VW82ym6yOzGwWb6xoGiy3QD2NTd1ypvraSoMSaUNfdg";
var bearer = 'Bearer ' + bearer_token;

//mds-agency is the container name, works only in the same network -> docker-compose
const instance = axios.create({
    baseURL: 'http://mds-agency:4000/',
    headers: {'Authorization': bearer}
    });
    

console.log("Instanz erstellt");    
//baseURL: http://172.23.0.15:4000/


function parseJsonPostRequest() {
  console.log("Funktion startet die Ausführung");
  const pipeline = new chain([
    fs.createReadStream('provider_BSE_status_changes_20220708T050000Z_20220708T210000Z.json'),
    parser(),
    new pick({filter: 'data.status_changes'}),
    new streamArray(),
    data => {
      const value = data.value;
      const postdata = {
        device_id: value.device_id, vehicle_id: value.vehicle_id, vehicle_type: value.vehicle_type, propulsion_types: value.propulsion_type
      };
      
      instance.post('/vehicles', postdata, {
          headers: {
                'Content-Type': 'application/json'
            },
          }).then(function (response) {
            console.log(response.status)
          }).catch(function (error) {
            console.log(error.code)
            console.log(error.response.status)
            console.log(error.response.statusText)
            console.log(error.response.data.error)
            //console.log("Hi");
          }); 
    }
  ]);

}


setTimeout(parseJsonPostRequest, 90000);




  




