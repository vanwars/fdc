L.mapbox.accessToken = 'pk.eyJ1IjoidmFud2FycyIsImEiOiJjaWdteHFyazcwMDZvNmNtM21sbmRtbWFyIn0.kC57oKm3dIB_UpS6FIGBFg';
var map = L.mapbox.map('map', 'vanwars.o39no878', {
    zoomControl: true
}).setView([38.376, -99.272], 5);
map.scrollWheelZoom.disable();