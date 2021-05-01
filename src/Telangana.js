class Telangana {
  populate(mcg, bedtype) {
    let fetchPromise = fetch("https://api.covidbedsindia.in/v1/storages/6089829403eef36d93d05a6f/Telangana");
    
    fetchPromise.then(response => {
      return response.json();
    }).then(telangana_data => {
      telangana_data.map(i => {
        var flag = 0;

        try {
          if(i["LAT"] && i["LONG"]) {
            if(bedtype == "icu") {
              if(i["HAS_ICU_BEDS"] == "TRUE" || i["HAS_VENTILATORS"] == "TRUE") {
                flag = 1;
              }
            } else if(bedtype == "ventilator") {
              if(i["HAS_VENTILATORS"] == "TRUE") {
                flag = 1;
              }
            } else {
              flag = 1;
            }

            if(flag == 1) {
              var coord = [i["LAT"], i["LONG"]];

              var hspInfo = "<b>" + i["HOSPITAL_NAME"] + "</b><br>";
              var type = i["TYPE"] + "<br>";
              var loc = "<a href=" + i["LOCATION"] + " target='_blank'>View on Google Maps</a><br>";
              var contact = "Contact: " + i["CONTACT"] + "<br>";
              var last_updated_at = "Last Updated: " + i["LAST_UPDATED_DATE"] + " " + i["LAST_UPDATED_TIME"] + "<br><br>";
              var reg_occ = "<b>REGULAR BEDS</b><br>Total: " + i["REGULAR_BEDS_TOTAL"] + "<br>";
              var reg_vac = "Vacant: " + i["REGULAR_BEDS_VACANT"] + "<br><br>";
              var oxy_occ = "<b>OXYGEN BEDS</b><br>Total: " + i["OXYGEN_BEDS_TOTAL"] + "<br>";
              var oxy_vac = "Vacant: " + i["OXYGEN_BEDS_VACANT"] + "<br><br>";
              var icu_occ = "<b>ICU BEDS (Ventilator/ CPAP)</b><br>Total: " + i["ICU_BEDS_TOTAL"] + "<br>";
              var icu_vac = "Vacant: " + i["ICU_BEDS_VACANT"] + "<br><br>";
              
              var marker = L.marker(new L.LatLng(coord[0], coord[1])).bindPopup(hspInfo + type + contact + loc + last_updated_at + reg_occ + reg_vac + oxy_occ + oxy_vac + icu_occ + icu_vac);
              mcg.addLayer(marker);
            }
          }
        } catch(err) {
          console.log(i["HOSPITAL_NAME"]);
          console.log(err);
        }
      });
    });
  }
}
