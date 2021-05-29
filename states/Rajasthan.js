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

              var hspInfo = hspName(i["HOSPITAL_NAME"], i["LOCATION"]);
              
              var contact = "Hospital Contact: " + contactInfo(i["HOSPITAL_HELPLINE_NO"]) + "<br>";
              var contact2 = "District Control Room Contact: " + contactInfo(i["DISTRICT_CONTROL_ROOM"]) + "<br>";
              var last_updated_at = i["LAST_UPDATED"] + "<br><br>";

              var gen = bedDetails("GENERAL BEDS", i["GENERAL_BEDS_TOTAL"], i["GENERAL_BEDS_AVAILABLE"])
              var oxy = bedDetails("OXYGEN BEDS", i["OXYGEN_BEDS_TOTAL"], i["OXYGEN_BEDS_AVAILABLE"])
              var icu = bedDetails("ICU BEDS", i["ICU_BEDS_TOTAL"], i["ICU_BEDS_AVAILABLE"])
              var ven = bedDetails("VENTILATOR", i["VENTILATOR_BEDS_TOTAL"], i["VENTILATOR_BEDS_AVAILABLE"])

              var marker = L.marker(new L.LatLng(coord[0], coord[1]), {icon: govIcon}).bindPopup(hspInfo + (i["CONTACT"] ? contact : "") + (i["DISTRICT_CONTROL_ROOM"] ? contact2 : "") + last_updated_at + gen + oxy + icu + ven);
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
