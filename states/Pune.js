class Pune {
  populate(mcg, bedtype) {
    let fetchPromise = fetch("https://api.covidbedsindia.in/v1/storages/6089822703eef30c1cd05a6e/Pune");

    fetchPromise.then(response => {
      return response.json();
    }).then(pune_data => {
      pune_data.map(i => {
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

              var addr = i["HOSPITAL_ADDRESS"] + "<br>";
              var contact = "Contact: " + contactInfo(i["CONTACT"]) + "<br>";
              var cat = "Category: " + i["HOSPITAL_CATEGORY"] + "<br>";
              var type = "Charges: " + i["CHARGES"] + "<br>";
              var timestamp = new Date(Number(i["LAST_UPDATED"])).toString().split("GMT")[0];
              var last_updated_at = "Last Updated: " + timestamp + "<br><br>";

              var nonoxy = bedDetails("BEDS WITHOUT OXYGEN", i["TOTAL_BEDS_WITHOUT_OXYGEN"], i["AVAILABLE_BEDS_WITHOUT_OXYGEN"]);
              var oxy = bedDetails("OXYGEN BEDS", i["TOTAL_BEDS_WITH_OXYGEN"], i["AVAILABLE_BEDS_WITH_OXYGEN"]);
              var icu = bedDetails("ICU BEDS", i["TOTAL_ICU_BEDS_WITHOUT_VENTILATOR"], i["AVAILABLE_ICU_BEDS_WITHOUT_VENTILATOR"]);
              var ven = bedDetails("VENTILATOR BEDS", i["TOTAL_ICU_BEDS_WITH_VENTILATOR"], i["AVAILABLE_ICU_BEDS_WITH_VENTILATOR"]);

              var marker = L.marker(new L.LatLng(coord[0], coord[1]), {icon: govIcon}).bindPopup(hspInfo + addr + (i["CONTACT"] ? contact : "") + cat + type + last_updated_at + nonoxy + oxy + icu + ven);
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
