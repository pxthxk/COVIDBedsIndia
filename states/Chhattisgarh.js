class Chhattisgarh {
  populate(mcg, bedtype) {
    let fetchPromise = fetch("https://api.covidbedsindia.in/v1/storages/6089833203eef38338d05a73/Chhattisgarh");

    fetchPromise.then(response => {
      return response.json();
    }).then(chhattisgarh_data => {
      chhattisgarh_data.map(i => {
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

              var contact = "Contact: " + (i["CONTACT"] ? i["CONTACT"].replace(i["CONTACT"].split(" ").slice(-1)[0],"") : "") + " " + (i["CONTACT"] ? contactInfo(i["CONTACT"].split(" ").slice(-1)[0]) : "") + "<br>";
              var cat = "Category: " + i["CATEGORY"] + "<br>";
              var ayushman = "Empanelled in Ayushman: " + i["EMPANELLED_IN_AYUSHMAN"] + "<br>";
              var last_updated_at = "Last Updated: " + i["LAST_UPDATED_DATE"] + " " + i["LAST_UPDATED_TIME"] + "<br><br>";

              var nonoxy = bedDetails("NONOXYGEN BEDS", i["NONOXYGEN_BEDS_TOTAL"], i["NONOXYGEN_BEDS_VACANT"]);
              var oxy = bedDetails("OXYGEN BEDS", i["OXYGEN_BEDS_TOTAL"], i["OXYGEN_BEDS_VACANT"]);
              var hdu = bedDetails("HDU BEDS", i["HDU_BEDS_TOTAL"], i["HDU_BEDS_VACANT"]);
              var icu = bedDetails("ICU BEDS", i["ICU_BEDS_TOTAL"], i["ICU_BEDS_VACANT"]);
              var ven = bedDetails("VENTILATOR BEDS", i["VENTILATORS_TOTAL"], i["VENTILATORS_VACANT"]);
                
              var marker = L.marker(new L.LatLng(coord[0], coord[1]), {icon: govIcon}).bindPopup(hspInfo + (i["CONTACT"] ? contact : "") + cat + ayushman + last_updated_at + nonoxy + oxy + hdu + icu + ven);
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
