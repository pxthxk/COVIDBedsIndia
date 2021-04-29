class Telangana {
  populate(mcg, bedtype) {
    for(var i in telangana_data) {
      var flag = 0;

      try {
        if((telangana_data[i]["LAT"] != "") && (telangana_data[i]["LONG"] != "")) {
          if(bedtype == "icu") {
            if(telangana_data[i]["HAS_ICU_BEDS"] == "TRUE" || telangana_data[i]["HAS_VENTILATORS"] == "TRUE") {
              flag = 1;
            }
          } else if(bedtype == "ventilator") {
            if(telangana_data[i]["HAS_VENTILATORS"] == "TRUE") {
              flag = 1;
            }
          } else {
            flag = 1;
          }

          if(flag == 1) {
            var coord = [telangana_data[i]["LAT"], telangana_data[i]["LONG"]];

            var hspInfo = "<b>" + telangana_data[i]["HOSPITAL_NAME"] + "</b><br>";
            var type = telangana_data[i]["TYPE"] + "<br>";
            var loc = "<a href=" + telangana_data[i]["LOCATION"] + " target='_blank'>Click for Google Maps</a><br>";
            var contact = "Contact: " + telangana_data[i]["CONTACT"] + "<br>";
            var last_updated_at = "Last Updated: " + telangana_data[i]["DATE"] + " " + telangana_data[i]["TIME"] + "<br><br>";
            var reg_occ = "<b>REGULAR BEDS</b><br>Total: " + telangana_data[i]["REGULAR_BEDS_TOTAL"] + "<br>";
            var reg_vac = "Vacant: " + telangana_data[i]["REGULAR_BEDS_VACANT"] + "<br><br>";
            var oxy_occ = "<b>OXYGEN BEDS</b><br>Total: " + telangana_data[i]["OXYGEN_BEDS_TOTAL"] + "<br>";
            var oxy_vac = "Vacant: " + telangana_data[i]["OXYGEN_BEDS_VACANT"] + "<br><br>";
            var icu_occ = "<b>ICU BEDS (Ventilator/ CPAP)</b><br>Total: " + telangana_data[i]["ICU_BEDS_TOTAL"] + "<br>";
            var icu_vac = "Vacant: " + telangana_data[i]["ICU_BEDS_VACANT"] + "<br><br>";
            
            var marker = L.marker(new L.LatLng(coord[0], coord[1])).bindPopup(hspInfo + type + contact + loc + last_updated_at + reg_occ + reg_vac + oxy_occ + oxy_vac + icu_occ + icu_vac);
            mcg.addLayer(marker);
          }
        }
      } catch(err) {
        console.log(err);
      }
    }
  }
}
