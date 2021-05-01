class Ahmedabad {
  populate(mcg, bedtype) {
    for(var i in ahmedabad_data) {
      var flag = 0;

      try {
        if(ahmedabad_data[i]["LOCATION"] != "") {
          if(bedtype == "icu") {
            if(ahmedabad_data[i]["HAS_ICU_BEDS"] == "TRUE" || ahmedabad_data[i]["HAS_VENTILATORS"] == "TRUE") {
              flag = 1;
            }
          } else if(bedtype == "ventilator") {
            if(ahmedabad_data[i]["HAS_VENTILATORS"] == "TRUE") {
              flag = 1;
            }
          } else {
            flag = 1;
          }

          if(flag == 1) {
            if(ahmedabad_data[i]["LOCATION"].split("/")[6].split(",").length == 3) {
              var coord = ahmedabad_data[i]["LOCATION"].split("/")[6].replace("@", "").split(",");
            } else {
              var coord = ahmedabad_data[i]["LOCATION"].split("/")[7].replace("@", "").split(",");
            }

            var hspInfo = "<b>" + ahmedabad_data[i]["HOSPITAL_NAME"] + "</b><br>";
            var zone = "Zone/Ward: " + ahmedabad_data[i]["ZONE_WARDS"] + "<br>";
            var contact = "Contact: " + ahmedabad_data[i]["CONTACT"] + "<br>";
            var loc = "<a href=" + ahmedabad_data[i]["LOCATION"] + " target='_blank'>View on Google Maps</a><br>";
            var last_updated_at = "Last Updated: " + ahmedabad_data[i]["LAST_UPDATED"] + "<br><br>";
            var type = ahmedabad_data[i]["TYPE"] + "<br><br>";
            var iso_occ = "<b>ISOLATION BEDS</b><br>Occupied: " + ahmedabad_data[i]["ISOLATION_OCCUPIED"] + "<br>";
            var iso_vac = "Available: " + ahmedabad_data[i]["ISOLATION_VACANT"] + "<br><br>";
            var hdu_occ = "<b>HIGH DEPENDENCY UNIT BEDS</b><br>Occupied: " + ahmedabad_data[i]["HIGH_DEPENDENCY_UNIT_OCCUPIED"] + "<br>";
            var hdu_vac = "Available: " + ahmedabad_data[i]["HIGH_DEPENDENCY_UNIT_VACANT"] + "<br><br>";
            var icu_occ = "<b>ICU BEDS</b><br>Occupied: " + ahmedabad_data[i]["ICU_WITHOUT_VENTILATOR_OCCUPIED"] + "<br>";
            var icu_vac = "Available: " + ahmedabad_data[i]["ICU_WITHOUT_VENTILATOR_VACANT"] + "<br><br>";
            var ven_occ = "<b>ICU BEDS WITH VENTILATOR</b><br>Occupied: " + ahmedabad_data[i]["ICU_WITH_VENTILATOR_OCCUPIED"] + "<br>";
            var ven_vac = "Available: " + ahmedabad_data[i]["ICU_WITH_VENTILATOR_VACANT"] + "<br><br>";

            var marker = L.marker(new L.LatLng(coord[0], coord[1])).bindPopup(hspInfo + zone + contact + loc + last_updated_at + type + iso_occ + iso_vac + hdu_occ + hdu_vac + icu_occ + icu_vac + ven_occ + ven_vac);
            mcg.addLayer(marker);
          }
        }
      } catch(err) {
        console.log(ahmedabad_data[i]["HOSPITAL_NAME"]);
        console.log(err);
      }
    }
  }
}
