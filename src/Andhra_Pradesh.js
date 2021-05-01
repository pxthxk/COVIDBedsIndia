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

              var hspInfo = "<b>" + i["HOSPITAL_NAME"] + "</b><br>";
              var contact = "Contact: " + i["CONTACT"] + "<br>";
              var loc = "<a href=" + i["LOCATION"] + " target='_blank'>View on Google Maps</a><br>";
              var gen_occ = "<b>GENERAL BEDS</b><br>Total: " + i["GENERAL_TOTAL"] + "<br>";
              var gen_vac = "Available: " + i["GENERAL_AVAILABLE"] + "<br><br>";
              var oxy_occ = "<b>OXYGEN GENERAL BEDS</b><br>Total: " + i["OXYGEN_GENERAL_TOTAL"] + "<br>";
              var oxy_vac = "Available: " + i["OXYGEN_GENERAL_AVAILABLE"] + "<br><br>";
              var icu_occ = "<b>ICU BEDS</b><br>Total: " + i["ICU_TOTAL"] + "<br>";
              var icu_vac = "Available: " + i["ICU_AVAILABLE"] + "<br><br>";
              var ven_tot = "<b>ICU BEDS WITH VENTILATOR</b><br>Total: " + i["VENTILATOR"] + "<br>";
              
              var marker = L.marker(new L.LatLng(coord[0], coord[1])).bindPopup(hspInfo + contact + loc + gen_occ + gen_vac + oxy_occ + oxy_vac + icu_occ + icu_vac + ven_tot);
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
