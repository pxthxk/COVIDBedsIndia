class Pune {
  populate(mcg, bedtype) {
    for(var i in pune_data) {
      var flag = 0;

      try {
        if((pune_data[i]["LAT"] != "") && (pune_data[i]["LONG"] != "")) {
          if(bedtype == "icu") {
            if(pune_data[i]["HAS_ICU_BEDS"] == "TRUE" || pune_data[i]["HAS_VENTILATORS"] == "TRUE") {
              flag = 1;
            }
          } else if(bedtype == "ventilator") {
            if(pune_data[i]["HAS_VENTILATORS"] == "TRUE") {
              flag = 1;
            }
          } else {
            flag = 1;
          }

          if(flag == 1) {
            var coord = [pune_data[i]["LAT"], pune_data[i]["LONG"]];

            var hspInfo = "<b>" + pune_data[i]["HOSPITAL_NAME"] + "</b><br>";
            var cat = "Category: " + pune_data[i]["HOSPITAL_CATEGORY"] + "<br>";
            var addr = pune_data[i]["HOSPITAL_ADDRESS"] + "<br>";
            var contact = "Contact: " + pune_data[i]["CONTACT"] + "<br>";
            var type = pune_data[i]["CHARGES"] + "<br>";
            var loc = "<a href=" + pune_data[i]["LOCATION"] + " target='_blank'>Click for Google Maps</a><br>";
            var timestamp = new Date(pune_data[i]["LAST_UPDATED"]).toString();
            var last_updated_at = "Last Updated: " + timestamp + "<br><br>";
            var reg_occ = "<b>REGULAR BEDS</b><br>Total: " + pune_data[i]["TOTAL_BEDS_WITHOUT_OXYGEN"] + "<br>";
            var reg_vac = "Available: " + pune_data[i]["AVAILABLE_BEDS_WITHOUT_OXYGEN"] + "<br><br>";
            var oxy_occ = "<b>OXYGEN BEDS</b><br>Total: " + pune_data[i]["TOTAL_BEDS_WITH_OXYGEN"] + "<br>";
            var oxy_vac = "Available: " + pune_data[i]["AVAILABLE_BEDS_WITH_OXYGEN"] + "<br><br>";
            var icu_occ = "<b>ICU BEDS</b><br>Total: " + pune_data[i]["TOTAL_ICU_BEDS_WITHOUT_VENTILATOR"] + "<br>";
            var icu_vac = "Available: " + pune_data[i]["AVAILABLE_ICU_BEDS_WITHOUT_VENTILATOR"] + "<br><br>";
            var ven_occ = "<b>ICU BEDS WITH VENTILATOR</b><br>Total: " + pune_data[i]["TOTAL_ICU_BEDS_WITH_VENTILATOR"] + "<br>";
            var ven_vac = "Available: " + pune_data[i]["AVAILABLE_ICU_BEDS_WITH_VENTILATOR"] + "<br><br>";
            
            var marker = L.marker(new L.LatLng(coord[0], coord[1])).bindPopup(hspInfo + cat + addr + contact + type + loc + last_updated_at + reg_occ + reg_vac + oxy_occ + oxy_vac + icu_occ + icu_vac + ven_occ + ven_vac);
            mcg.addLayer(marker);
          }
        }
      } catch(err) {
        console.log(err);
      }
    }
  }
}
