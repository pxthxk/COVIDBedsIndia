class Telangana {
  populate(mymap) {
    for(var i in telangana_data) {
      if((telangana_data[i]["LAT"] != "") && (telangana_data[i]["LONG"] != "")) {
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
        
        var marker = L.marker([coord[0], coord[1]]).addTo(mymap).bindPopup(hspInfo + type + contact + loc + last_updated_at + reg_occ + reg_vac + oxy_occ + oxy_vac + icu_occ + icu_vac).openPopup();
      }
    }
  }
}
