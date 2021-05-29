class Nagpur {
  populate(mcg, bedtype) {
    let fetchPromise = fetch("https://api.covidbedsindia.in/v1/storages/608983e003eef32328d05a76/Nagpur");

    fetchPromise.then(response => {
      return response.json();
    }).then(nagpur_data => {
      nagpur_data.map(i => {
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

              var addr = i["ADDRESS"] + "<br>";
              var contact = (i["HOSPITAL_NUMBER"] ? "Contact: " + contactInfo(i["HOSPITAL_NUMBER"]) + "<br><br>" : "<br>");

              var nonoxy = bedDetails("NONOXYGEN BEDS", i["TOTAL_WITHOUT_OXYGEN_BEDS_OCCUPIED"], i["TOTAL_WITHOUT_OXYGEN_BEDS_AVAILABLE"], false);
              var oxy = bedDetails("OXYGEN BEDS", i["TOTAL_OXYGEN_BEDS_OCCUPIED"], i["TOTAL_OXYGEN_BEDS_AVAILABLE"], false);
              var icu = bedDetails("ICU BEDS", i["TOTAL_ICU_BEDS_OCCUPIED"], i["TOTAL_ICU_BEDS_AVAILABLE"], false);
              var ven = bedDetails("VENTILATOR BEDS", i["TOTAL_VENTILATOR_BEDS_OCCUPIED"], i["TOTAL_VENTILATOR_BEDS_AVAILABLE"], false);

              var marker = L.marker(new L.LatLng(coord[0], coord[1]), {icon: govIcon}).bindPopup(hspInfo + addr + contact + nonoxy + oxy + icu + ven);
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
