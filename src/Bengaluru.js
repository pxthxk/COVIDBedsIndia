class Bengaluru {
  populate(mcg, bedtype) {
    let fetchPromise = fetch("https://api.covidbedsindia.in/v1/storages/608982f703eef3de2bd05a72/Bengaluru");

    fetchPromise.then(response => {
      return response.json();
    }).then(bengaluru_data => {
      bengaluru_data.map(i => {
        var flag = 0;

        try {
          if(i["LOCATION"]) {
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
              if(i["LOCATION"].split("/")[6].split(",").length == 3) {
                var coord = i["LOCATION"].split("/")[6].replace("@", "").split(",");
              } else {
                var coord = i["LOCATION"].split("/")[7].replace("@", "").split(",");
              }

              var hspInfo = "<b>" + i["HOSPITAL_NAME"] + "</b><br>";
              var type = i["TYPE"] + "<br>";
              var loc = "<a href=" + i["LOCATION"] + " target='_blank'>View on Google Maps</a><br>";
              var last_updated_at = "Last Updated: " + i["LAST_UPDATED"] + "<br><br>";
              var gen_tot = "<b>GENERAL BEDS</b><br>Total: " + i["ALLOCATED_BEDS_GEN"] + "<br>";
              var gen_vac = "Available: " + i["AVAILABLE_BEDS_GEN"] + "<br><br>";
              var hdu_tot = "<b>HIGH DEPENDENCY UNIT BEDS</b><br>Total: " + i["ALLOCATED_BEDS_HDU"] + "<br>";
              var hdu_vac = "Available: " + i["AVAILABLE_BEDS_HDU"] + "<br><br>";
              var icu_tot = "<b>ICU WITHOUT VENTILATOR BEDS</b><br>Total: " + i["ALLOCATED_BEDS_ICU"] + "<br>";
              var icu_vac = "Available: " + i["AVAILABLE_BEDS_ICU"] + "<br><br>";
              var ven_tot = "<b>ICU WITH VENTILATOR BEDS</b><br>Total: " + i["ALLOCATED_BEDS_VENT"] + "<br>";
              var ven_vac = "Available: " + i["AVAILABLE_BEDS_VENT"] + "<br><br>";

              var marker = L.marker(new L.LatLng(coord[0], coord[1])).bindPopup(hspInfo + type + loc + last_updated_at + gen_tot + gen_vac + hdu_tot + hdu_vac + icu_tot + icu_vac + ven_tot + ven_vac);
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
