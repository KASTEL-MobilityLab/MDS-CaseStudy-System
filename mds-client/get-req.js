"use strict";
//exports.__esModule = true;
import fetch from "node-fetch";
//var node_fetch_1 = require("node-fetch");
var bearer_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1N2YxZTA2Mi04NzY2LTRkMDMtYjhjYy00ZTMyYmFmOWRmNmIiLCJodHRwczovL29wZW5tb2JpbGl0eWZvdW5kYXRpb24ub3JnL3VzZXJfZW1haWwiOiJ1c2VyQHRlc3QuYWkiLCJodHRwczovL29wZW5tb2JpbGl0eWZvdW5kYXRpb24ub3JnL3Byb3ZpZGVyX2lkIjoiYmRmODk2YWYtNjQyZC00NTk1LTg0MGItOTMwYzJhZGExZjYzIiwic2NvcGUiOiJhZG1pbjphbGwiLCJpYXQiOjE2NTc4MTEyMDV9.VW82ym6yOzGwWb6xoGiy3QD2NTd1ypvraSoMSaUNfdg";
var bearer = 'Bearer ' + bearer_token;
fetch('http://172.23.0.14:4000/vehicles/', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': bearer
    }
})
    .then(function (response) { return response.json(); })
    .then(function (data) {
    console.log('Success:', data);
})["catch"](function (error) {
    console.error('Error:', error);
});
