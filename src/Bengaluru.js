class Bengaluru {
  populate(mcg, bedtype) {
    for(var i in bengaluru_data) {
      var flag = 0;

      try {
        if(bengaluru_data[i]["LOCATION"] != "") {
          if(bedtype == "icu") {
            if(bengaluru_data[i]["HAS_ICU_BEDS"] == "TRUE" || bengaluru_data[i]["HAS_VENTILATORS"] == "TRUE") {
              flag = 1;
            }
          } else if(bedtype == "ventilator") {
            if(bengaluru_data[i]["HAS_VENTILATORS"] == "TRUE") {
              flag = 1;
            }
          } else {
            flag = 1;
          }

          if(flag == 1) {
            if(bengaluru_data[i]["LOCATION"].split("/")[6].split(",").length == 3) {
              var coord = bengaluru_data[i]["LOCATION"].split("/")[6].replace("@", "").split(",");
            } else {
              var coord = bengaluru_data[i]["LOCATION"].split("/")[7].replace("@", "").split(",");
            }

            var hspInfo = "<b>" + bengaluru_data[i]["HOSPITAL_NAME"] + "</b><br>";
            var type = bengaluru_data[i]["TYPE"] + "<br><br>";
            var loc = "<a href=" + bengaluru_data[i]["LOCATION"] + " target='_blank'>Click for Google Maps</a><br>";
            var last_updated_at = "Last Updated: " + bengaluru_data[i]["LAST_UPDATED"] + "<br><br>";
            var gen_tot = "<b>GENERAL BEDS</b><br>Total: " + bengaluru_data[i]["ALLOCATED_BEDS_GEN"] + "<br>";
            var gen_vac = "Available: " + bengaluru_data[i]["AVAILABLE_BEDS_GEN"] + "<br><br>";
            var hdu_tot = "<b>HIGH DEPENDENCY UNIT BEDS</b><br>Total: " + bengaluru_data[i]["ALLOCATED_BEDS_HDU"] + "<br>";
            var hdu_vac = "Available: " + bengaluru_data[i]["AVAILABLE_BEDS_HDU"] + "<br><br>";
            var icu_tot = "<b>ICU WITHOUT VENTILATOR BEDS</b><br>Total: " + bengaluru_data[i]["ALLOCATED_BEDS_ICU"] + "<br>";
            var icu_vac = "Available: " + bengaluru_data[i]["AVAILABLE_BEDS_ICU"] + "<br><br>";
            var ven_tot = "<b>ICU WITH VENTILATOR BEDS</b><br>Total: " + bengaluru_data[i]["ALLOCATED_BEDS_VENT"] + "<br>";
            var ven_vac = "Available: " + bengaluru_data[i]["AVAILABLE_BEDS_VENT"] + "<br><br>";

            var marker = L.marker(new L.LatLng(coord[0], coord[1])).bindPopup(hspInfo + type + loc + last_updated_at + gen_tot + gen_vac + hdu_tot + hdu_vac + icu_tot + icu_vac + ven_tot + ven_vac);
            mcg.addLayer(marker);
          }
        }
      } catch(err) {
        console.log(err);
      }
    }
  }
}
