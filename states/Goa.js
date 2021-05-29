class Goa {
  populate(mcg, bedtype) {
    let fetchPromise = fetch("https://api.covidbedsindia.in/v1/storages/60a36cb4e75f9c5d8c96eb36/Goa");

    fetchPromise.then(response => {
      return response.json();
    }).then(goa_data => {
      goa_data.map(i => {
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

              var last_updated_at = "Last Updated: " + i["LAST_UPDATED"] + "<br><br>";
              
              var total = bedDetails("TOTAL BEDS", i["TOTAL_BEDS"], i["TOTAL_BEDS_AVAILABLE"]);
              var icu = bedDetails("ICU BEDS", i["TOTAL_ICU_BEDS"], i["TOTAL_ICU_BEDS_AVAILABLE"]);

              var marker = L.marker(new L.LatLng(coord[0], coord[1]), {icon: govIcon}).bindPopup(hspInfo + total + icu);
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
