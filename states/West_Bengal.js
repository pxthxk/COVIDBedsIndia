class West_Bengal {
  populate(mcg, bedtype) {
    let fetchPromise = fetch("https://api.covidbedsindia.in/v1/storages/608983fc03eef384cad05a78/West%20Bengal");

    fetchPromise.then(response => {
      return response.json();
    }).then(west_bengal_data => {
      west_bengal_data.map(i => {
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

              var addr = i["ADDRESS"] + "<br>";
              var contactDiv = "";
              i["CONTACT"].split("/[/,]+/").forEach(function(j){contactDiv+=(contactInfo(j)+", ")});
              var contact = "Contact: " + contactDiv + "<br>";
              var last_updated_at = "Last Updated: " + i["LAST_UPDATED"] + "<br><br>";

              var reg = bedDetails("REGULAR BEDS", i["COVID_BEDS_REGULAR_TOTAL"], i["COVID_BEDS_REGULAR_VACANT"]);
              var oxy = bedDetails("OXYGEN BEDS", i["COVID_BEDS_WITH_OXYGEN_TOTAL"], i["COVID_BEDS_WITH_OXYGEN_VACANT"]);
              var hdu = bedDetails("HDU BEDS", i["HDU_BEDS_TOTAL"], i["HDU_BEDS_VACANT"]);
              var icu = bedDetails("CCU BEDS", i["CCU_BEDS_WITHOUT_VENTILATOR_TOTAL"], i["CCU_BEDS_WITHOUT_VENTILATOR_VACANT"]);
              var ven = bedDetails("VENTILATOR BEDS", i["CCU_BEDS_WITH_VENTILATOR_TOTAL"], i["CCU_BEDS_WITH_VENTILATOR_VACANT"]);
              
              var marker = L.marker(new L.LatLng(coord[0], coord[1]), {icon: govIcon}).bindPopup(hspInfo + addr + contact + last_updated_at + reg + oxy + hdu + icu + ven);
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
