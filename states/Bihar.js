class Bihar {
  populate(mcg, bedtype) {
    let fetchPromise = fetch("https://api.covidbedsindia.in/v1/storages/60a62cf2e75f9c105696eb38/Bihar");

    fetchPromise.then(response => {
      return response.json();
    }).then(bihar_data => {
      bihar_data.map(i => {
        var flag = 0;
        
        try {
          if(i["LAT"] != 0 && i["LONG"] != 0) {
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

              var hspInfo = hspName(i["FACILITY_NAME"], "https://maps.google.com/?q=" + i["LAT"] + "," + i["LONG"]);

              var contact = (i["CONTACT"] ? "Contact: " + contactInfo(i["CONTACT"]) + "<br>" : "");
              var type = "Type: " + i["FACILITY_TYPE"] + ", Category: " + i["CATEGORY"] + "<br>";
              var last_updated_at = "Last Updated: " + i["LAST_UPDATED"] + "<br><br>";

              var total = bedDetails("TOTAL BEDS", i["TOTAL_BEDS"], i["VACANT"]);
              var icu = bedDetails("ICU BEDS", i["TOTAL_ICU_BEDS"], i["ICU_BEDS_VACANT"]);
              
              var marker = L.marker(new L.LatLng(coord[0], coord[1]), {icon: govIcon}).bindPopup(hspInfo + contact + type + last_updated_at + total + icu);
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
