var districts = null;
var lander = {"latLong": [28.6466773,77.182488], "zoomFactor": 10}

var map = L.map("mapcontainer", {"tap": false});
var mcg = L.markerClusterGroup({
	maxClusterRadius: 45
});

var bedType = null;

$("#city").select2({
	theme: "bootstrap4",
	width: "250px"
});

$("#bedType").select2({
	theme: "bootstrap4",
	minimumResultsForSearch: -1,
	width: "150px"
});

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

function changeBed(bedType) {
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

	var jharkhand = new Jharkhand();
	jharkhand.populate(mcg, bedType);
				
	var madhyapradesh = new Madhya_Pradesh();
	madhyapradesh.populate(mcg, bedType);

	var odisha = new Odisha();
	odisha.populate(mcg, bedType);

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

var markerIcon = L.Icon.extend({
    options: {
        // iconSize:     [29.6, 35.75],
        // shadowSize:   [50, 64],
        // iconAnchor:   [22, 94],
        // shadowAnchor: [4, 62],
        popupAnchor:  [10, 0]
    }
});

var govIcon = new markerIcon({
	iconUrl: "assets/marker-gov.svg",
});

var volIcon = new markerIcon({
	iconUrl: "assets/marker-vol.svg",
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}@2x?access_token={accessToken}", {
	attribution: "Map data &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
	maxZoom: 18,
	id: "mapbox/streets-v11",
	tileSize: $(window).width() > 1024 ? 512 : 1024,
	zoomOffset: $(window).width() > 1024 ? -1 : -2,
	accessToken: mapboxToken
}).addTo(map);

var lc = L.control.locate({
	position: "topright",
	icon: "icon-location-arrow",
	initialZoomLevel: 15,
	cacheLocation: true
}).addTo(map);

lc.start();
focusMap();
loadPlaces(mcg, bedType);
