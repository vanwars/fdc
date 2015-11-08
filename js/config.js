/*
  Todo: Make this so that you don't have to know JavaScript.
  Should look like a stylesheet, or MarkDown.
*/
var datasets = {
    places: {
        api_endpoint: 'http://dev.localground.org/api/0/markers/',
        page_size: 50,
        filter: "WHERE project = 24"
    }
};
var pages = [
    {
        type: "mapbox",
        dataset: "places",
        accessToken: "pk.eyJ1IjoibGF1cmVuYmVuaWNob3UiLCJhIjoiQ1BlZGczRSJ9.EVMieITn7lHNi6Ato9wFwg",
        mapStyleID: "laurenbenichou.54e91cf8",
        click: ""
    }
];