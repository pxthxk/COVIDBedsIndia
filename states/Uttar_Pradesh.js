class Uttar_Pradesh {
  populate(mcg, bedtype) {
    let fetchPromise = fetch("https://api.covidbedsindia.in/v1/storages/609fc7dde75f9ccdd696eb35/Uttar%20Pradesh");

    fetchPromise.then(response => {
      return response.json();
    }).then(uttar_pradesh_data => {
      uttar_pradesh_data.map(i => {
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

              var addr = (i["ADDRESS"] ? i["ADDRESS"] + "<br>" : "");
              var contact = (i["CONTACT"] ? "Contact: " + contactInfo(i["CONTACT"]) + "<br>" : "");
              var type = "Type: " + i["TYPE"] + "<br>";
              var last_updated_at = "Last Updated: " + i["LAST_UPDATED"] + "<br><br>";

              var beds = bedDetails("BEDS", i["TOTAL"], i["VACANT"]);
              
              var marker = L.marker(new L.LatLng(coord[0], coord[1]), {icon: govIcon}).bindPopup(hspInfo + addr + contact + type + last_updated_at + beds);
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
