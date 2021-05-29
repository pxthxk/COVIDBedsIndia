class Thane {
  populate(mcg, bedtype) {
    let fetchPromise = fetch("https://api.covidbedsindia.in/v1/storages/609fc78ae75f9c111f96eb34/Thane");

    fetchPromise.then(response => {
      return response.json();
    }).then(thane_data => {
      thane_data.map(i => {
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

              var contact = "Contact: " + contactInfo(i["HOSPITAL_NUMBER"]) + "<br><br>"

              var beds = bedDetails("TOTAL BEDS", i["TOTAL_BEDS"], i["TOTAL_BEDS_AVAILABLE"]);
              var nonicu = bedDetails("NON-ICU BEDS", null, i["TOTAL_NON_ICU_BEDS_AVAILABLE"]);
              var icu = bedDetails("ICU BEDS", null, i["TOTAL_ICU_BEDS_AVAILABLE"]);

              var marker = L.marker(new L.LatLng(coord[0], coord[1]), {icon: govIcon}).bindPopup(hspInfo + (i["HOSPITAL_NUMBER"] ? contact : "") + beds + nonicu + icu);
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
