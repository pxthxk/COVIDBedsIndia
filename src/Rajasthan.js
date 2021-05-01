class Rajasthan {
  populate(mcg, bedtype) {
    let fetchPromise = fetch("https://api.covidbedsindia.in/v1/storages/608983ed03eef39bb4d05a77/Rajasthan");

    fetchPromise.then(response => {
      return response.json();
    }).then(rajasthan_data => {
      rajasthan_data.map(i => {
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
              var contact = "Hospital Contact: " + i["HOSPITAL_HELPLINE_NO"] + "<br>";
              var contact2 = "District Control Room Contact: " + i["DISTRICT_CONTROL_ROOM"] + "<br>";
              var loc = "<a href=" + i["LOCATION"] + " target='_blank'>View on Google Maps</a><br><br>";
              var gen_tot = "<b>GENERAL BEDS</b><br>Total: " + i["GENERAL_BEDS_TOTAL"] + "<br>";
              var gen_vac = "Available: " + i["GENERAL_BEDS_AVAILABLE"] + "<br><br>";
              var oxy_tot = "<b>OXYGEN BEDS</b><br>Total: " + i["OXYGEN_BEDS_TOTAL"] + "<br>";
              var oxy_vac = "Available: " + i["OXYGEN_BEDS_AVAILABLE"] + "<br><br>";
              var icu_tot = "<b>ICU BEDS</b><br>Total: " + i["ICU_BEDS_TOTAL"] + "<br>";
              var icu_vac = "Available: " + i["ICU_BEDS_AVAILABLE"] + "<br><br>";
              var ven_tot = "<b>ICU BEDS WITH VENTILATOR</b><br>Total: " + i["VENTILATOR_BEDS_TOTAL"] + "<br>";
              var ven_vac = "Available: " + i["VENTILATOR_BEDS_AVAILABLE"] + "<br><br>";
              
              var marker = L.marker(new L.LatLng(coord[0], coord[1])).bindPopup(hspInfo + contact + contact2 + loc + gen_tot + gen_vac + oxy_tot + oxy_vac + icu_tot + icu_vac + ven_tot + ven_vac);
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
