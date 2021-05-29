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

              var hspInfo = hspName(i["HOSPITAL_NAME"], i["LOCATION"]);

              var contact = "Contact: " + contactInfo(i["CONTACT"]) + "<br>";
              var type = i["TYPE"] + "<br>";
              var last_updated_at = "Last Updated: " + i["LAST_UPDATED_DATE"] + " " + i["LAST_UPDATED_TIME"] + "<br><br>";

              var reg = bedDetails("REGULAR BEDS", i["REGULAR_BEDS_TOTAL"], i["REGULAR_BEDS_VACANT"]);
              var oxy = bedDetails("OXYGEN BEDS", i["OXYGEN_BEDS_TOTAL"], i["OXYGEN_BEDS_VACANT"]);
              var icu = bedDetails("ICU BEDS (Ventilator/ CPAP)", i["ICU_BEDS_TOTAL"], i["ICU_BEDS_VACANT"]);

              var marker = L.marker(new L.LatLng(coord[0], coord[1]), {icon: govIcon}).bindPopup(hspInfo + (i["CONTACT"] ? contact : "") + type + last_updated_at + reg + oxy + icu);
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
