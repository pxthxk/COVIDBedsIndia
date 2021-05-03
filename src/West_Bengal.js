class West_Bengal {
  populate(mcg, bedtype) {
    let fetchPromise = fetch("https://api.covidbedsindia.in/v1/storages/608983fc03eef384cad05a78/West%20Bengal");
    var flag = 0;

    fetchPromise.then(response => {
      return response.json();
    }).then(west_bengal_data => {
      west_bengal_data.map(i => {
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
              var last_updated_at = i["LAST_UPDATED"] + "<br><br>";
              var loc = "<a href=" + i["LOCATION"] + " target='_blank'>View on Google Maps</a><br><br>";
              var beds_tot = "<b>BEDS</b><br>Total: " + i["TOTAL_BEDS"] + "<br>";
              var beds_vac = "Available: " + i["VACANT_BEDS"] + "<br><br>";
              
              var marker = L.marker(new L.LatLng(coord[0], coord[1])).bindPopup(hspInfo + last_updated_at + loc + beds_tot + beds_vac);
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
