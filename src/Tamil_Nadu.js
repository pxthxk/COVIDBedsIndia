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
              if(tamil_nadu_data[i]["HAS_ICU_BEDS"] == "TRUE" || i["HAS_VENTILATORS"] == "TRUE") {
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
              var contact = "Contact: " + i["CONTACT"] + "<br>";
              var loc = "<a href=" + i["LOCATION"] + " target='_blank'>View on Google Maps</a><br>";
              var last_updated_at = "Last Updated: " + i["LAST_UPDATED"] + "<br><br>";
              var sus_tot = "<b>BEDS FOR SUSPECTED CASES</b><br>Total: " + i["BEDS_FOR_SUSPECTED_CASES_TOTAL"] + "<br>";
              var sus_vac = "Available: " + i["BEDS_FOR_SUSPECTED_CASES_VACANT"] + "<br><br>";
              var nonoxy_tot = "<b>NON-OXYGEN BEDS</b><br>Total: " + i["NONOXYGEN_SUPPORTED_BEDS_TOTAL"] + "<br>";
              var nonoxy_vac = "Available: " + i["NONOXYGEN_SUPPORTED_BEDS_VACANT"] + "<br><br>";
              var oxy_tot = "<b>OXYGEN BEDS</b><br>Total: " + i["OXYGEN_SUPPORTED_BEDS_TOTAL"] + "<br>";
              var oxy_vac = "Available: " + i["OXYGEN_SUPPORTED_BEDS_VACANT"] + "<br><br>";
              var icu_tot = "<b>ICU BEDS</b><br>Total: " + i["ICU_BEDS_TOTAL"] + "<br>";
              var icu_vac = "Available: " + i["ICU_BEDS_VACANT"] + "<br><br>";
              
              var marker = L.marker(new L.LatLng(coord[0], coord[1])).bindPopup(hspInfo + contact + loc + last_updated_at + sus_tot + sus_vac + nonoxy_tot + nonoxy_vac + oxy_tot + oxy_vac + icu_tot + icu_vac);
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
