class Madhya_Pradesh {
  populate(mcg, bedtype) {
    for(var i in madhya_pradesh_data) {
      var flag = 0;

      try {
        if(madhya_pradesh_data[i]["LOCATION"] != "") {
          if(bedtype == "icu") {
            if(madhya_pradesh_data[i]["HAS_ICU_BEDS"] == "TRUE" || madhya_pradesh_data[i]["HAS_VENTILATORS"] == "TRUE") {
              flag = 1;
            }
          } else if(bedtype == "ventilator") {
            if(madhya_pradesh_data[i]["HAS_VENTILATORS"] == "TRUE") {
              flag = 1;
            }
          } else {
            flag = 1;
          }

          if(flag == 1) {
            if(madhya_pradesh_data[i]["LOCATION"].includes("https://maps.google.com/?q=")) {
              var coord = [madhya_pradesh_data[i]["LOCATION"].split("https://maps.google.com/?q=")[1].split(",")[0], madhya_pradesh_data[i]["LOCATION"].split("https://maps.google.com/?q=")[1].split(",")[1]];
            } else if(madhya_pradesh_data[i]["LOCATION"].split("/")[6].split(",").length == 3) {
              var coord = madhya_pradesh_data[i]["LOCATION"].split("/")[6].replace("@", "").split(",");
            } else {
              var coord = madhya_pradesh_data[i]["LOCATION"].split("/")[7].replace("@", "").split(",");
            }
            

            if((coord[0] != 0) && (coord[1] != 0)) {
              var hspInfo = "<b>" + madhya_pradesh_data[i]["HOSPITAL_NAME"] + "</b><br>";
              var type = madhya_pradesh_data[i]["TYPE"] + "<br>";
              var contact = "Contact: " + (madhya_pradesh_data[i]["CONTACT_1"] ? madhya_pradesh_data[i]["CONTACT_1"].split("Mob: ")[1] : "") + (madhya_pradesh_data[i]["CONTACT_2"] ? ", " + madhya_pradesh_data[i]["CONTACT_2"].split("Mob: ")[1] : "") + (madhya_pradesh_data[i]["CONTACT_3"] ? ", " + madhya_pradesh_data[i]["CONTACT_3"].split("Mob: ")[1] : "") + "<br>";
              var loc = "<a href=" + madhya_pradesh_data[i]["LOCATION"].replace(" ", "") + " target='_blank'>Click for Google Maps</a><br><br>";
              var last_updated_at = "Last Updated: " + madhya_pradesh_data[i]["LAST_UPDATED"] + "<br><br>";
              var iso_occ = "<b>ISOLATION BEDS</b><br>Total: " + madhya_pradesh_data[i]["ISOLATION_BEDS_TOTAL"] + "<br>";
              var iso_vac = "Available: " + madhya_pradesh_data[i]["ISOLATION_BEDS_AVAILABLE"] + "<br><br>";
              var oxy_occ = "<b>OXYGEN GENERAL BEDS</b><br>Total: " + madhya_pradesh_data[i]["OXYGEN_BEDS_TOTAL"] + "<br>";
              var oxy_vac = "Available: " + madhya_pradesh_data[i]["OXYGEN_BEDS_AVAILABLE"] + "<br><br>";
              var icu_occ = "<b>ICU BEDS</b><br>Total: " + madhya_pradesh_data[i]["ICU_BEDS_TOTAL"] + "<br>";
              var icu_vac = "Available: " + madhya_pradesh_data[i]["ICU_BEDS_AVAILABLE"] + "<br><br>";
              
              var marker = L.marker(new L.LatLng(coord[0], coord[1])).bindPopup(hspInfo + type + contact +loc + last_updated_at + iso_occ + iso_vac + oxy_occ + oxy_vac + icu_occ + icu_vac);
              mcg.addLayer(marker);
            }
          }
        }
      } catch(err) {
        console.log(madhya_pradesh_data[i]["HOSPITAL_NAME"]);
        console.log(err);
      }
    }
  }
}
