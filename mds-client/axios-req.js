"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var bearer_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1N2YxZTA2Mi04NzY2LTRkMDMtYjhjYy00ZTMyYmFmOWRmNmIiLCJodHRwczovL29wZW5tb2JpbGl0eWZvdW5kYXRpb24ub3JnL3VzZXJfZW1haWwiOiJ1c2VyQHRlc3QuYWkiLCJodHRwczovL29wZW5tb2JpbGl0eWZvdW5kYXRpb24ub3JnL3Byb3ZpZGVyX2lkIjoiYmRmODk2YWYtNjQyZC00NTk1LTg0MGItOTMwYzJhZGExZjYzIiwic2NvcGUiOiJhZG1pbjphbGwiLCJpYXQiOjE2NTc4MTEyMDV9.VW82ym6yOzGwWb6xoGiy3QD2NTd1ypvraSoMSaUNfdg";
var bearer = 'Bearer ' + bearer_token;
var data = { device_id: "1269b12f-28d5-8ada-8bb6-8c9b1645d91a", vehicle_id: "TCAA9E", vehicle_type: "car", propulsion_types: ["electric"] };
var instance = axios_1["default"].create({
    baseURL: 'http://172.23.0.14:4000/',
    headers: { 'Authorization': bearer }
});
instance.post('/vehicles', data, {
    headers: {
        'Content-Type': 'application/json'
    }
}).then(function (response) {
    console.log(response.status);
})["catch"](function (error) {
    console.log(error);
});
