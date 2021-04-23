class Ahmedabad {

	populate(mymap) {

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicHh0aHhrIiwiYSI6ImNrbnN0cHE2bTA3cGoycXBkajNuMnV5bTQifQ.si6acX_-tJGxBIiQWrHHCQ', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'pk.eyJ1IjoicHh0aHhrIiwiYSI6ImNrbnN0cHE2bTA3cGoycXBkajNuMnV5bTQifQ.si6acX_-tJGxBIiQWrHHCQ'
        }).addTo(mymap);

   
	for(var i in ahmedabad_data) {
          if(ahmedabad_data[i]["LOCATION"] != "") {
            if(ahmedabad_data[i]["LOCATION"].split("/")[6].split(",").length == 3) {
              var coord = ahmedabad_data[i]["LOCATION"].split("/")[6].replace("@", "").split(",");
            } else {
              var coord = ahmedabad_data[i]["LOCATION"].split("/")[7].replace("@", "").split(",");
            }

            var hspInfo = "<b>" + ahmedabad_data[i]["HOSPITAL_NAME"] + "</b><br>";
            var zone = "Zone/Ward: " + ahmedabad_data[i]["ZONE_WARDS"] + "<br>";
            var loc = "<a href=" + ahmedabad_data[i]["LOCATION"] + " target='_blank'>Click for Google Maps</a><br>";
            var last_updated_at = "Last Updated: " + ahmedabad_data[i]["LAST_UPDATED"] + "<br><br>";
            var type = ahmedabad_data[i]["TYPE"] + "<br><br>";
            var iso_occ = "<b>ISOLATION BEDS</b><br>Occupied: " + ahmedabad_data[i]["ISOLATION_OCCUPIED"] + "<br>";
            var iso_vac = "Vacant: " + ahmedabad_data[i]["ISOLATION_VACANT"] + "<br><br>";
            var hdu_occ = "<b>HIGH DEPENDENCY UNIT BEDS</b><br>Occupied: " + ahmedabad_data[i]["HIGH_DEPENDENCY_UNIT_OCCUPIED"] + "<br>";
            var hdu_vac = "Vacant: " + ahmedabad_data[i]["HIGH_DEPENDENCY_UNIT_VACANT"] + "<br><br>";
            var icu_occ = "<b>ICU WITHOUT VENTILATOR BEDS</b><br>Occupied: " + ahmedabad_data[i]["ICU_WITHOUT_VENTILATOR_OCCUPIED"] + "<br>";
            var icu_vac = "Vacant: " + ahmedabad_data[i]["ICU_WITHOUT_VENTILATOR_VACANT"] + "<br><br>";
            var ven_occ = "<b>ICU WITH VENTILATOR BEDS</b><br>Occupied: " + ahmedabad_data[i]["ICU_WITH_VENTILATOR_OCCUPIED"] + "<br>";
            var ven_vac = "Vacant: " + ahmedabad_data[i]["ICU_WITH_VENTILATOR_VACANT"] + "<br><br>";

            var marker = L.marker([coord[0], coord[1]]).addTo(mymap).bindPopup(hspInfo + zone + loc + last_updated_at + type + iso_occ + iso_vac + hdu_occ + hdu_vac + icu_occ + icu_vac + ven_occ + ven_vac).openPopup();
          }
        }
	}
}