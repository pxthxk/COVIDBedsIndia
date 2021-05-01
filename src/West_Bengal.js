class West_Bengal {
  populate(mcg, bedtype) {
    var flag = 0;

    for(var i in west_bengal_data) {
      try {
        if((west_bengal_data[i]["LAT"] != "") && (west_bengal_data[i]["LONG"] != "")) {
          if(bedtype == "icu") {
            if(west_bengal_data[i]["HAS_ICU_BEDS"] == "TRUE" || west_bengal_data[i]["HAS_VENTILATORS"] == "TRUE") {
              flag = 1;
            }
          } else if(bedtype == "ventilator") {
            if(west_bengal_data[i]["HAS_VENTILATORS"] == "TRUE") {
              flag = 1;
            }
          } else {
            flag = 1;
          }

          if(flag == 1) {
            var coord = [west_bengal_data[i]["LAT"], west_bengal_data[i]["LONG"]];

            var hspInfo = "<b>" + west_bengal_data[i]["HOSPITAL_NAME"] + "</b><br>";
            var last_updated_at = west_bengal_data[i]["LAST_UPDATED"] + "<br><br>";
            var loc = "<a href=" + west_bengal_data[i]["LOCATION"] + " target='_blank'>View on Google Maps</a><br><br>";
            var beds_tot = "<b>BEDS</b><br>Total: " + west_bengal_data[i]["TOTAL_BEDS"] + "<br>";
            var beds_vac = "Available: " + west_bengal_data[i]["VACANT_BEDS"] + "<br><br>";
            
            var marker = L.marker(new L.LatLng(coord[0], coord[1])).bindPopup(hspInfo + last_updated_at + loc + beds_tot + beds_vac);
            mcg.addLayer(marker);
          }
        }
      } catch(err) {
        west_bengal_data[i]["HOSPITAL_NAME"]
        console.log(err);
      }
    }
  }
}
