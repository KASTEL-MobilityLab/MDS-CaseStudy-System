"use strict";
//exports.__esModule = true;
import fetch from "node-fetch";
//var node_fetch_1 = require("node-fetch");

var data = { device_id: "1659a34f-29c5-4cda-8bb6-8c9b1645d08b", vehicle_id: "JAAW6F", vehicle_type: "scooter", propulsion_types: ["human"] };
//var data = { device_id: "14b124c9-2dd3-46b6-b293-f926a4ec010c", vehicle_id: "N32URP", vehicle_type: "bicycle", propulsion_types: ["human"] };
var bearer_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1N2YxZTA2Mi04NzY2LTRkMDMtYjhjYy00ZTMyYmFmOWRmNmIiLCJodHRwczovL29wZW5tb2JpbGl0eWZvdW5kYXRpb24ub3JnL3VzZXJfZW1haWwiOiJ1c2VyQHRlc3QuYWkiLCJodHRwczovL29wZW5tb2JpbGl0eWZvdW5kYXRpb24ub3JnL3Byb3ZpZGVyX2lkIjoiYmRmODk2YWYtNjQyZC00NTk1LTg0MGItOTMwYzJhZGExZjYzIiwic2NvcGUiOiJhZG1pbjphbGwiLCJpYXQiOjE2NTc4MTEyMDV9.VW82ym6yOzGwWb6xoGiy3QD2NTd1ypvraSoMSaUNfdg";
var bearer = 'Bearer ' + bearer_token;
fetch('http://172.23.0.14:4000/vehicles', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': bearer
    },
    body: JSON.stringify(data)
})
    .then(function (response) { return response.json(); })
    .then(function (data) {
    console.log('Success:', data);
})["catch"](function (error) {
    console.error('Error:', error);
});
