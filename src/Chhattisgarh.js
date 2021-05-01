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

              var hspInfo = "<b>" + i["HOSPITAL_NAME"] + "</b><br>";
              var cat = "Category: " + i["CATEGORY"] + "<br>";
              var contact = "Contact: " + i["CONTACT"] + "<br>";
              var ayushman = "Empanelled inn Ayushman: " + i["EMPANELLED_IN_AYUSHMAN"] + "<br>";
              var loc = "<a href=" + i["LOCATION"] + " target='_blank'>View on Google Maps</a><br>";
              var last_updated_at = "Last Updated: " + i["LAST_UPDATED_DATE"] + " " + i["LAST_UPDATED_TIME"] + "<br><br>";
              var reg_tot = "<b>NON-OXYGEN BEDS</b><br>Total: " + i["NONOXYGEN_BEDS_TOTAL"] + "<br>";
              var reg_vac = "Available: " + i["NONOXYGEN_BEDS_VACANT"] + "<br><br>";
              var oxy_tot = "<b>OXYGEN BEDS</b><br>Total: " + i["OXYGEN_BEDS_TOTAL"] + "<br>";
              var oxy_vac = "Available: " + i["OXYGEN_BEDS_VACANT"] + "<br><br>";
              var hdu_tot = "<b>HDU BEDS</b><br>Total: " + i["HDU_BEDS_TOTAL"] + "<br>";
              var hdu_vac = "Available: " + i["HDU_BEDS_VACANT"] + "<br><br>";
              var icu_tot = "<b>ICU BEDS</b><br>Total: " + i["ICU_BEDS_TOTAL"] + "<br>";
              var icu_vac = "Available: " + i["ICU_BEDS_VACANT"] + "<br><br>";
              var ven_tot = "<b>ICU BEDS WITH VENTILATOR</b><br>Total: " + i["VENTILATORS_TOTAL"] + "<br>";
              var ven_vac = "Available: " + i["VENTILATORS_VACANT"] + "<br><br>";
                
              var marker = L.marker(new L.LatLng(coord[0], coord[1])).bindPopup(hspInfo + cat + ayushman + contact + loc + last_updated_at + reg_tot + reg_vac + oxy_tot + oxy_vac + hdu_tot + hdu_vac + icu_tot + icu_vac + ven_tot + ven_vac);
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
