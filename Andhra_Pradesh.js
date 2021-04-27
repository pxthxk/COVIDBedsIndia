class Andhra_Pradesh {
  populate(mcg) {
    for(var i in andhra_pradesh_data) {
      if((andhra_pradesh_data[i]["LAT"] != "") && (andhra_pradesh_data[i]["LONG"] != "")) {
        var coord = [andhra_pradesh_data[i]["LAT"], andhra_pradesh_data[i]["LONG"]];

        var hspInfo = "<b>" + andhra_pradesh_data[i]["HOSPITAL_NAME"] + "</b><br>";
        var contact = "Contact: " + andhra_pradesh_data[i]["CONTACT"] + "<br>";
        var loc = "<a href=" + andhra_pradesh_data[i]["LOCATION"] + " target='_blank'>Click for Google Maps</a><br><br>";
        var icu_occ = "<b>ICU BEDS</b><br>Total: " + andhra_pradesh_data[i]["ICU_TOTAL"] + "<br>";
        var icu_vac = "Available: " + andhra_pradesh_data[i]["ICU_AVAILABLE"] + "<br><br>";
        var oxy_occ = "<b>OXYGEN GENERAL BEDS</b><br>Total: " + andhra_pradesh_data[i]["OXYGEN_GENERAL_TOTAL"] + "<br>";
        var oxy_vac = "Available: " + andhra_pradesh_data[i]["OXYGEN_GENERAL_AVAILABLE"] + "<br><br>";
        var gen_occ = "<b>GENERAL BEDS</b><br>Total: " + andhra_pradesh_data[i]["GENERAL_TOTAL"] + "<br>";
        var gen_vac = "Available: " + andhra_pradesh_data[i]["GENERAL_AVAILABLE"] + "<br><br>";
        var ven_tot = "<b>VENTILATORS</b><br>Total: " + andhra_pradesh_data[i]["VENTILATOR"] + "<br>";
        
        var marker = L.marker(new L.LatLng(coord[0], coord[1])).bindPopup(hspInfo + contact + loc + icu_occ + icu_vac + oxy_occ + oxy_vac + gen_occ + gen_vac + ven_tot);
        mcg.addLayer(marker);
      }
    }
  }
}
