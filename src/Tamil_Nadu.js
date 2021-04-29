class Tamil_Nadu {
  populate(mcg, bedtype) {
    for(var i in tamil_nadu_data) {
      var flag = 0;

      try {
        if((tamil_nadu_data[i]["LAT"] != "") && (tamil_nadu_data[i]["LONG"] != "")) {
          if(bedtype == "icu") {
            if(tamil_nadu_data[i]["HAS_ICU_BEDS"] == "TRUE" || tamil_nadu_data[i]["HAS_VENTILATORS"] == "TRUE") {
              flag = 1;
            }
          } else if(bedtype == "ventilator") {
            if(tamil_nadu_data[i]["HAS_VENTILATORS"] == "TRUE") {
              flag = 1;
            }
          } else {
            flag = 1;
          }

          if(flag == 1) {
            var coord = [tamil_nadu_data[i]["LAT"], tamil_nadu_data[i]["LONG"]];

            var hspInfo = "<b>" + tamil_nadu_data[i]["HOSPITAL_NAME"] + "</b><br>";
            var contact = "Contact: " + tamil_nadu_data[i]["CONTACT"] + "<br>";
            var loc = "<a href=" + tamil_nadu_data[i]["LOCATION"] + " target='_blank'>Click for Google Maps</a><br><br>";
            var sus_tot = "<b>BEDS FOR SUSPECTED CASES</b><br>Total: " + tamil_nadu_data[i]["BEDS_FOR_SUSPECTED_CASES_TOTAL"] + "<br>";
            var sus_vac = "Available: " + tamil_nadu_data[i]["BEDS_FOR_SUSPECTED_CASES_VACANT"] + "<br><br>";
            var oxy_tot = "<b>OXYGEN BEDS</b><br>Total: " + tamil_nadu_data[i]["OXYGEN_SUPPORTED_BEDS_TOTAL"] + "<br>";
            var oxy_vac = "Available: " + tamil_nadu_data[i]["OXYGEN_SUPPORTED_BEDS_VACANT"] + "<br><br>";
            var nonoxy_tot = "<b>NON-OXYGEN BEDS</b><br>Total: " + tamil_nadu_data[i]["NONOXYGEN_SUPPORTED_BEDS_TOTAL"] + "<br>";
            var nonoxy_vac = "Available: " + tamil_nadu_data[i]["NONOXYGEN_SUPPORTED_BEDS_VACANT"] + "<br><br>";
            var icu_tot = "<b>ICU BEDS</b><br>Total: " + tamil_nadu_data[i]["ICU_BEDS_TOTAL"] + "<br>";
            var icu_vac = "Available: " + tamil_nadu_data[i]["ICU_BEDS_VACANT"] + "<br><br>";
            
            var marker = L.marker(new L.LatLng(coord[0], coord[1])).bindPopup(hspInfo + contact + loc + sus_tot + sus_vac + oxy_tot + oxy_vac + nonoxy_tot + nonoxy_vac + icu_tot + icu_vac);
            mcg.addLayer(marker);
          }
        }
      } catch(err) {
        console.log(err);
      }
    }
  }
}
