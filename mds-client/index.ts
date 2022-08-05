import parser from "stream-json";
import pick from "stream-json/filters/Pick.js";
import chain from "stream-chain";
import streamArray from "stream-json/streamers/StreamArray.js";
import * as fs from "fs";

import axios from "axios";
import axiosRetry from "axios-retry";

//JWT bearer_token has been generated out of provider_id which is just a random uuid and is used to identify the provider
var bearer_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1N2YxZTA2Mi04NzY2LTRkMDMtYjhjYy00ZTMyYmFmOWRmNmIiLCJodHRwczovL29wZW5tb2JpbGl0eWZvdW5kYXRpb24ub3JnL3VzZXJfZW1haWwiOiJ1c2VyQHRlc3QuYWkiLCJodHRwczovL29wZW5tb2JpbGl0eWZvdW5kYXRpb24ub3JnL3Byb3ZpZGVyX2lkIjoiYmRmODk2YWYtNjQyZC00NTk1LTg0MGItOTMwYzJhZGExZjYzIiwic2NvcGUiOiJhZG1pbjphbGwiLCJpYXQiOjE2NTc4MTEyMDV9.VW82ym6yOzGwWb6xoGiy3QD2NTd1ypvraSoMSaUNfdg";
var bearer = 'Bearer ' + bearer_token;

//mds-agency is the container name where the api requests go to, works only in the same network (docker compose solves that)
const instance = axios.create({
    baseURL: 'http://mds-agency:4000/',
    headers: {'Authorization': bearer}
    });

axiosRetry(instance, { retries: 15 });


function parseJsonPostRequest() {
  const pipeline = new chain([
    fs.createReadStream('provider_status_changes.json'),
    parser(),
    new pick({filter: 'data.status_changes'}),
    new streamArray(),
    async data => {
      const value = data.value;
      const postdata = {
        device_id: value.device_id, vehicle_id: value.vehicle_id, vehicle_type: value.vehicle_type, propulsion_types: value.propulsion_type
      };
      var url_device_id = '/vehicles/' + value.device_id
      await instance.get(url_device_id, {
          headers: {
                'Content-Type': 'application/json'
            },
          }).then(function (response) {
            console.log(response.status);
            console.log(response.statusText);
          }).catch(function (error) {
            if (error.response.status == 404){ //means, no vehicle found for that device_id
              postData(postdata);
            }
            
          });

    }
  ]);

  
}

function postData(postdata:any) {
  instance.post('/vehicles', postdata, {
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(function (response) {
      console.log(response.status)
      console.log(response.statusText) //Created
    }).catch(function (error) { 
      console.log(error.code) //Conflict because of async race condition
      console.log(error.response.status)
      console.log(error.response.statusText)
      console.log(error.response.data.error)
    });    
}

//setTimeout(parseJsonPostRequest, 60000); //only for debugging reasons to be able to read the log
parseJsonPostRequest();


