class Odisha {
  populate(mcg, bedtype) {
    let fetchPromise = fetch("https://api.covidbedsindia.in/v1/storages/60b13a5a90b45710c6831016/auto_update");

    fetchPromise.then(response => {
      return response.json();
    }).then(odisha_data => {
      fetch("https://api.covidbedsindia.in/v1/storages/60b1c92490b4574e2c831017/Odisha").then(response => {
        return response.json();
      }).then(location_data => {
        odisha_data.map(i => {
          if((i["resource_type"] == "Hospiital Beds") && (i["state"] == "ODISHA")) {
            var j = location_data.find(o => o["HOSPITAL_NAME"] === i["location"]);
            var flag = 0;

            try {
              if(j["LAT"] && j["LONG"]) {
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
                  var coord = [j["LAT"], j["LONG"]];

                  var hspInfo = hspName(i["location"], j["LOCATION"]);

                  var contact = (i["contact_number"] ? "Contact: " + contactInfo(i["contact_number"]) + "<br>" : "");
                  var last_updated_at = "Last Updated: " + i["verification_timestamp"] + "<br><br>";

                  var available = "Status of beds: " + i["Availability"] + "<br><br>";
                  var source = "<a href='https://docs.google.com/spreadsheets/d/1334PN3T4JzxRTLnnOAEPpVG3yWD3QWXhiaFc6VDcAbM/edit#gid=1644529134' target='_blank'>Click for Source of Information</a>";

                  var marker = L.marker(new L.LatLng(coord[0], coord[1]), {icon: volIcon}).bindPopup(hspInfo + contact + last_updated_at + available + source);
                  mcg.addLayer(marker);
                }
              }
            } catch(err) {
              console.log(i["HOSPITAL_NAME"]);
              console.log(err);
            }
          }
        });
      });
    });
  }
}
