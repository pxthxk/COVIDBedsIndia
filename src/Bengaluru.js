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

              var hspInfo = hspName(i["HOSPITAL_NAME"], i["LOCATION"]);

              var type = i["TYPE"] + "<br>";
              var last_updated_at = "Last Updated: " + i["LAST_SYNCED"] + "<br><br>";

              var gen = bedDetails("GENERAL", i["ALLOCATED_BEDS_GEN"], i["AVAILABLE_BEDS_GEN"]);
              var hdu = bedDetails("HDU BEDS", i["ALLOCATED_BEDS_HDU"], i["AVAILABLE_BEDS_HDU"]);
              var icu = bedDetails("ICU BEDS", i["ALLOCATED_BEDS_ICU"], i["AVAILABLE_BEDS_ICU"]);
              var ven = bedDetails("VENTILATOR BEDS", i["ALLOCATED_BEDS_VENT", "AVAILABLE_BEDS_VENT"]);

              var marker = L.marker(new L.LatLng(coord[0], coord[1])).bindPopup(hspInfo + type + last_updated_at + gen + hdu + icu + ven);
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
