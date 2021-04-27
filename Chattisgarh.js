class Chattisgarh {
  populate(mcg) {
    for(var i in chattisgarh_data) {
      if((chattisgarh_data[i]["LAT"] != "") && (chattisgarh_data[i]["LONG"] != "")) {
        var coord = [chattisgarh_data[i]["LAT"], chattisgarh_data[i]["LONG"]];

        var hspInfo = "<b>" + chattisgarh_data[i]["HOSPITAL_NAME"] + "</b><br>";
        var cat = "Category: " + chattisgarh_data[i]["HOSPITAL_CATEGORY"] + "<br>";
        var ayushman = "Empanelled inn Ayushman: " + chattisgarh_data[i]["EMPANELLED_IN_AYUSHMAN"] + "<br>";
        var contact = "Contact: " + chattisgarh_data[i]["CONTACT"] + "<br>";
        var loc = "<a href=" + chattisgarh_data[i]["LOCATION"] + " target='_blank'>Click for Google Maps</a><br>";
        var last_updated_at = chattisgarh_data[i]["LAST_UPDATED_DATE"] + " " + chattisgarh_data[i]["LAST_UPDATED_TIME"] + "<br>";
        var reg_occ = "<b>NON-OXYGEN BEDS</b><br>Total: " + chattisgarh_data[i]["NONOXYGEN_BEDS_TOTAL"] + "<br>";
        var reg_vac = "Available: " + chattisgarh_data[i]["NONOXYGEN_BEDS_VACANT"] + "<br><br>";
        var oxy_occ = "<b>OXYGEN BEDS</b><br>Total: " + chattisgarh_data[i]["OXYGEN_BEDS_TOTAL"] + "<br>";
        var oxy_vac = "Available: " + chattisgarh_data[i]["OXYGEN_BEDS_VACANT"] + "<br><br>";
        var hdu_occ = "<b>HDU BEDS</b><br>Total: " + chattisgarh_data[i]["HDU_BEDS_TOTAL"] + "<br>";
        var hdu_vac = "Available: " + chattisgarh_data[i]["HDU_BEDS_VACANT"] + "<br><br>";
        var icu_occ = "<b>ICU BEDS</b><br>Total: " + chattisgarh_data[i]["ICU_BEDS_TOTAL"] + "<br>";
        var icu_vac = "Available: " + chattisgarh_data[i]["ICU_BEDS_VACANT"] + "<br><br>";
        var ven_occ = "<b>VENTILATORS</b><br>Total: " + chattisgarh_data[i]["VENTILATORS_TOTAL"] + "<br>";
        var ven_vac = "Available: " + chattisgarh_data[i]["VENTILATORS_VACANT"] + "<br><br>";
        
        var marker = L.marker(new L.LatLng(coord[0], coord[1])).bindPopup(hspInfo + cat + ayushman + contact + loc + last_updated_at + reg_occ + reg_vac + oxy_occ + oxy_vac + hdu_occ + hdu_vac + icu_occ + icu_vac + ven_occ + ven_vac);
        mcg.addLayer(marker);
      }
    }
  }
}
