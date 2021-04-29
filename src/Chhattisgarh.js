class Chhattisgarh {
  populate(mcg, bedtype) {
    for(var i in chhattisgarh_data) {
      var flag = 0;

      try {
        if((chhattisgarh_data[i]["LAT"] != "") && (chhattisgarh_data[i]["LONG"] != "")) {
          if(bedtype == "icu") {
            if(chhattisgarh_data[i]["HAS_ICU_BEDS"] == "TRUE" || chhattisgarh_data[i]["HAS_VENTILATORS"] == "TRUE") {
              flag = 1;
            }
          } else if(bedtype == "ventilator") {
            if(chhattisgarh_data[i]["HAS_VENTILATORS"] == "TRUE") {
              flag = 1;
            }
          } else {
            flag = 1;
          }

          if(flag == 1) {
            var coord = [chhattisgarh_data[i]["LAT"], chhattisgarh_data[i]["LONG"]];

            var hspInfo = "<b>" + chhattisgarh_data[i]["HOSPITAL_NAME"] + "</b><br>";
            var cat = "Category: " + chhattisgarh_data[i]["CATEGORY"] + "<br>";
            var ayushman = "Empanelled inn Ayushman: " + chhattisgarh_data[i]["EMPANELLED_IN_AYUSHMAN"] + "<br>";
            var contact = "Contact: " + chhattisgarh_data[i]["CONTACT"] + "<br>";
            var loc = "<a href=" + chhattisgarh_data[i]["LOCATION"] + " target='_blank'>Click for Google Maps</a><br>";
            var last_updated_at = "Last Updated: " + chhattisgarh_data[i]["LAST_UPDATED_DATE"] + " " + chhattisgarh_data[i]["LAST_UPDATED_TIME"] + "<br><br>";
            var reg_occ = "<b>NON-OXYGEN BEDS</b><br>Total: " + chhattisgarh_data[i]["NONOXYGEN_BEDS_TOTAL"] + "<br>";
            var reg_vac = "Available: " + chhattisgarh_data[i]["NONOXYGEN_BEDS_VACANT"] + "<br><br>";
            var oxy_occ = "<b>OXYGEN BEDS</b><br>Total: " + chhattisgarh_data[i]["OXYGEN_BEDS_TOTAL"] + "<br>";
            var oxy_vac = "Available: " + chhattisgarh_data[i]["OXYGEN_BEDS_VACANT"] + "<br><br>";
            var hdu_occ = "<b>HDU BEDS</b><br>Total: " + chhattisgarh_data[i]["HDU_BEDS_TOTAL"] + "<br>";
            var hdu_vac = "Available: " + chhattisgarh_data[i]["HDU_BEDS_VACANT"] + "<br><br>";
            var icu_occ = "<b>ICU BEDS</b><br>Total: " + chhattisgarh_data[i]["ICU_BEDS_TOTAL"] + "<br>";
            var icu_vac = "Available: " + chhattisgarh_data[i]["ICU_BEDS_VACANT"] + "<br><br>";
            var ven_occ = "<b>VENTILATORS</b><br>Total: " + chhattisgarh_data[i]["VENTILATORS_TOTAL"] + "<br>";
            var ven_vac = "Available: " + chhattisgarh_data[i]["VENTILATORS_VACANT"] + "<br><br>";
              
            var marker = L.marker(new L.LatLng(coord[0], coord[1])).bindPopup(hspInfo + cat + ayushman + contact + loc + last_updated_at + reg_occ + reg_vac + oxy_occ + oxy_vac + hdu_occ + hdu_vac + icu_occ + icu_vac + ven_occ + ven_vac);
            mcg.addLayer(marker);
          }
        }
      } catch(err) {
        console.log(err);
      }
    }
  }
}
