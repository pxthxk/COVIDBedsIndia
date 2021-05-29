class Gandhinagar {
  populate(mcg, bedtype) {
    let fetchPromise = fetch("https://api.covidbedsindia.in/v1/storages/608d544533382c3501cf8c96/Gandhinagar");

    fetchPromise.then(response => {
      return response.json();
    }).then(gandhinagar_data => {
      gandhinagar_data.map(i => {
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

              var area = i["AREA"] + "<br>";
              var nodal_officer = "Nodal Officer: " + i["NODAL_OFFICER_NAME"] + ": " + contactInfo(i["NODAL_OFFICER_NUMBER"]) + "<br>";
              var last_updated_at = "Last Updated: " + i["LAST_UPDATED"] + "<br><br>";

              var reg = bedDetails("MILD SYMPTOMS BEDS", i["MILD_SYMPTOMS_BED_TOTAL"], i["MILD_SYMPTOMS_BED_AVAILABLE"]);
              var oxy = bedDetails("OXYGEN BEDS", i["O2_BEDS_TOTAL"], i["O2_BEDS_AVAILABLE"]);
              var icu = bedDetails("ICU BEDS", i["ICU_WITHOUT_VENTILATOR_TOTAL"], i["ICU_WITHOUT_VENTILATOR_AVAILABLE"]);
              var ven = bedDetails("VENTILATOR BEDS", i["ICU_WITH_VENTILATOR_TOTAL"], i["ICU_WITH_VENTILATOR_AVAILABLE"]);
              
              var marker = L.marker(new L.LatLng(coord[0], coord[1]), {icon: govIcon}).bindPopup(hspInfo + area + nodal_officer + last_updated_at + reg + oxy + icu + ven);
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
