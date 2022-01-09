// Populate dropdowns
var districts = null;
var lander = {"latLong": [28.7066773,77.102488], "zoomFactor": 10}

fetch("https://api.covidbedsindia.in/v1/storages/60b1c92490b4574e2c831017/Districts").then(response => {
	return response.json();
}).then(data => {
	districts = data;

	var loc = document.getElementById("city");
	var states = []
				
	districts.map(i => {
		if(!states.includes(i["STATE"])) {
			states.push(i["STATE"]);

			loc.innerHTML += "<optgroup label=\"" + i["STATE"] + "\"></optgroup>";
		}
		loc.innerHTML += "<option value='" + i["UID"] + "'>" + i["DISTRICT"] + "</option>";
	});
});

$("#city").select2({
	theme: "bootstrap4",
	width: $(window).width() > 1024 ? "250px" : "150px"
});

var bedType = null;

$("#bedType").select2({
	theme: "bootstrap4",
	minimumResultsForSearch: -1,
	width: $(window).width() > 1024 ? "150px" : "100px"
});

// Setup map
var map = L.map("mapcontainer", {"maxZoom": 18, "tap": false, "zoomControl": false});

// L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}@2x?access_token={accessToken}", {
// 	attribution: "&#169; <a href='https://www.mapbox.com/about/maps/' target='_blank'>Mapbox</a> &#169; <a href='https://www.openstreetmap.org/copyright' target='_blank'>OpenStreetMap</a> <a class='font-weight-bold' href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a>",
// 	maxZoom: 18,
// 	id: "mapbox/streets-v11",
// 	tileSize: 512,
// 	zoomOffset: -1,
// 	accessToken: mapboxToken
// }).addTo(map);

var gl = L.mapboxGL({
	accessToken: mapboxToken,
	style: "mapbox://styles/mapbox/streets-v11",
	attribution: "&#169; <a href='https://www.mapbox.com/about/maps/' target='_blank'>Mapbox</a> &#169; <a href='https://www.openstreetmap.org/copyright' target='_blank'>OpenStreetMap</a> <a class='font-weight-bold' href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a>",
}).addTo(map);

var mcg = L.markerClusterGroup({
	maxClusterRadius: 60
});

var lc = L.control.locate({
	position: "bottomright",
	icon: "icon-location-arrow",
	initialZoomLevel: 15,
	cacheLocation: true
}).addTo(map);

var markerIcon = L.Icon.extend({
	options: {
		popupAnchor: [10, 0]
	}
});

var govIcon = new markerIcon({
	iconUrl: "assets/marker-gov.svg",
});

var volIcon = new markerIcon({
	iconUrl: "assets/marker-vol.svg",
});

L.control.zoom({
	position: "bottomright"
}).addTo(map);

map.on("popupopen", function(e) {
	var px = map.project(e.target._popup._latlng);
	px.x += 11;
	px.y -= e.target._popup._container.clientHeight/1.5;
	map.panTo(map.unproject(px),{animate: true});
});

lc.start();
focusMap();
loadPlaces(mcg, bedType);

function focusMap(placeUID) {
	if(placeUID) {
		var placeObj = districts.find(o => o["UID"] === placeUID);
		map.setView([placeObj["LAT"], placeObj["LONG"]], placeObj["ZOOM_FACTOR"]);
	} else {
		map.setView(lander["latLong"], lander["zoomFactor"]);
	}
}
			
function changePlace(placeUID) {
	focusMap(placeUID);
}

function changeBedType(bedType) {
	loadPlaces(mcg, bedType);
}

function loadPlaces(mcg, bedType) {
	$(".loader").show();

	mcg.clearLayers();

	var delhi = new Delhi();
	delhi.populate(mcg, bedType);
				
	var ahmedabad = new Ahmedabad();
	ahmedabad.populate(mcg, bedType);
				
	var bengaluru = new Bengaluru();
	bengaluru.populate(mcg, bedType);

	var gandhinagar = new Gandhinagar();
	gandhinagar.populate(mcg, bedType);
				
	var nagpur = new Nagpur();
	nagpur.populate(mcg, bedType);

	var nashik = new Nashik();
	nashik.populate(mcg, bedType);

	var pune = new Pune();
	pune.populate(mcg, bedType);

	var surat = new Surat();
	surat.populate(mcg, bedType);

	var thane = new Thane();
	thane.populate(mcg, bedType);
				
	var andhrapradesh = new Andhra_Pradesh();
	andhrapradesh.populate(mcg, bedType);

	var bihar = new Bihar();
	bihar.populate(mcg, bedType);
				
	var chhattisgarh = new Chhattisgarh();
	chhattisgarh.populate(mcg, bedType);
				
	var goa = new Goa();
	goa.populate(mcg, bedType);

	var haryana = new Haryana();
	haryana.populate(mcg, bedType);

	// var jharkhand = new Jharkhand();
	// jharkhand.populate(mcg, bedType);
				
	var madhyapradesh = new Madhya_Pradesh();
	madhyapradesh.populate(mcg, bedType);

	// var odisha = new Odisha();
	// odisha.populate(mcg, bedType);

	var rajasthan = new Rajasthan();
	rajasthan.populate(mcg, bedType);
				
	var tamilnadu = new Tamil_Nadu();
	tamilnadu.populate(mcg, bedType);
				
	var telangana = new Telangana();
	telangana.populate(mcg, bedType);

	var uttarakhand = new Uttarakhand();
	uttarakhand.populate(mcg, bedType);

	var uttarpradesh = new Uttar_Pradesh();
	uttarpradesh.populate(mcg, bedType);
				
	var westbengal = new West_Bengal();
	westbengal.populate(mcg, bedType);
				
	map.addLayer(mcg);

	if(bedType == "icu") {
		$("#icudisclaimer").modal("toggle");
	} else if(bedType == "ventilator") {
		$("#ventdisclaimer").modal("toggle");
	}
}
