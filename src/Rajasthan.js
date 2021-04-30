class Rajasthan {
  populate(mcg, bedtype) {
    for(var i in rajasthan_data) {
      var flag = 0;

      try {
        if((rajasthan_data[i]["LAT"] != "") && (rajasthan_data[i]["LONG"] != "")) {
          if(bedtype == "icu") {
            if(rajasthan_data[i]["HAS_ICU_BEDS"] == "TRUE" || rajasthan_data[i]["HAS_VENTILATORS"] == "TRUE") {
              flag = 1;
            }
          } else if(bedtype == "ventilator") {
            if(rajasthan_data[i]["HAS_VENTILATORS"] == "TRUE") {
              flag = 1;
            }
          } else {
            flag = 1;
          }

          if(flag == 1) {
            var coord = [rajasthan_data[i]["LAT"], rajasthan_data[i]["LONG"]];

            var hspInfo = "<b>" + rajasthan_data[i]["HOSPITAL_NAME"] + "</b><br>";
            var contact = "Hospital Contact: " + rajasthan_data[i]["HOSPITAL_HELPLINE_NO"] + "<br>";
            var contact2 = "District Control Room Contact: " + rajasthan_data[i]["DISTRICT_CONTROL_ROOM"] + "<br>";
            var loc = "<a href=" + rajasthan_data[i]["LOCATION"] + " target='_blank'>Click for Google Maps</a><br><br>";
            var gen_tot = "<b>GENERAL BEDS</b><br>Total: " + rajasthan_data[i]["GENERAL_BEDS_TOTAL"] + "<br>";
            var gen_vac = "Available: " + rajasthan_data[i]["GENERAL_BEDS_AVAILABLE"] + "<br><br>";
            var oxy_tot = "<b>OXYGEN BEDS</b><br>Total: " + rajasthan_data[i]["OXYGEN_BEDS_TOTAL"] + "<br>";
            var oxy_vac = "Available: " + rajasthan_data[i]["OXYGEN_BEDS_AVAILABLE"] + "<br><br>";
            var icu_tot = "<b>ICU BEDS</b><br>Total: " + rajasthan_data[i]["ICU_BEDS_TOTAL"] + "<br>";
            var icu_vac = "Available: " + rajasthan_data[i]["ICU_BEDS_AVAILABLE"] + "<br><br>";
            var ven_tot = "<b>VENTILATOR BEDS</b><br>Total: " + rajasthan_data[i]["VENTILATOR_BEDS_TOTAL"] + "<br>";
            var ven_vac = "Available: " + rajasthan_data[i]["VENTILATOR_BEDS_AVAILABLE"] + "<br><br>";
            
            var marker = L.marker(new L.LatLng(coord[0], coord[1])).bindPopup(hspInfo + contact + contact2 + loc + gen_tot + gen_vac + oxy_tot + oxy_vac + icu_tot + icu_vac + ven_tot + ven_vac);
            mcg.addLayer(marker);
          }
        }
      } catch(err) {
        console.log(err);
      }
    }
  }
}
