class Tamil_Nadu {
  populate(mcg, bedtype) {
    let fetchPromise = fetch("https://api.covidbedsindia.in/v1/storages/6089820e03eef3b588d05a6d/Tamil%20Nadu");
    
    fetchPromise.then(response => {
      return response.json();
    }).then(tamil_nadu_data => {
      tamil_nadu_data.map(i => {
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
              
              var contact = "Contact: " + contactInfo(Number(i["CONTACT"])) + "<br>";
              var last_updated_at = "Last Updated: " + i["LAST_UPDATED"] + "<br><br>";

              var sus = bedDetails("BEDS FOR SUSPECTED CASES", i["BEDS_FOR_SUSPECTED_CASES_TOTAL"], i["BEDS_FOR_SUSPECTED_CASES_VACANT"]);
              var nonoxy = bedDetails("NON-OXYGEN BEDS", i["NONOXYGEN_SUPPORTED_BEDS_TOTAL"], i["NONOXYGEN_SUPPORTED_BEDS_VACANT"]);
              var oxy = bedDetails("OXYGEN BEDS", i["OXYGEN_SUPPORTED_BEDS_TOTAL"], i["OXYGEN_SUPPORTED_BEDS_VACANT"]);
              var icu = bedDetails("ICU BEDS", i["ICU_BEDS_TOTAL"], i["ICU_BEDS_VACANT"]);
              
              var marker = L.marker(new L.LatLng(coord[0], coord[1]), {icon: govIcon}).bindPopup(hspInfo + (i["CONTACT"] ? contact : "") + last_updated_at + sus + nonoxy + oxy + icu);
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
