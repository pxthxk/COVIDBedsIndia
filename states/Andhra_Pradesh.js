class Andhra_Pradesh {
  populate(mcg, bedtype) {
    let fetchPromise = fetch("https://api.covidbedsindia.in/v1/storages/608982e003eef31f34d05a71/Andhra%20Pradesh");

    fetchPromise.then(response => {
      return response.json();
    }).then(andhra_pradesh_data => {
      andhra_pradesh_data.map(i => {
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

              var contact = "Contact: " + contactInfo(i["CONTACT"]) + "<br><br>";

              var gen = bedDetails("GENERAL", i["GENERAL_TOTAL"], i["GENERAL_AVAILABLE"]);
              var oxy = bedDetails("OXYGEN BEDS", i["OXYGEN_GENERAL_TOTAL"], i["OXYGEN_GENERAL_AVAILABLE"]);
              var icu = bedDetails("ICU BEDS", i["ICU_TOTAL"], i["ICU_AVAILABLE"]);
              var ven = bedDetails("VENTILATOR BEDS", i["VENTILATOR"]);
              
              var marker = L.marker(new L.LatLng(coord[0], coord[1]), {icon: govIcon}).bindPopup(hspInfo + (i["CONTACT"] ? contact : "") + gen + oxy + icu + ven);
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
