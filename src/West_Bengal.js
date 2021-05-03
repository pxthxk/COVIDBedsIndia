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

              var hspInfo = hspName(i["HOSPITAL_NAME"], i["LOCATION"]);

              var last_updated_at = "Last Updated: " + i["LAST_UPDATED"] + "<br><br>";

              var beds = bedDetails("BEDS", i["TOTAL_BEDS"], i["VACANT_BEDS"]);
              
              var marker = L.marker(new L.LatLng(coord[0], coord[1])).bindPopup(hspInfo + last_updated_at + beds);
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
