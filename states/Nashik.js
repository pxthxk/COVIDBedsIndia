class Nashik {
  populate(mcg, bedtype) {
    let fetchPromise = fetch("https://api.covidbedsindia.in/v1/storages/608efad8423e2153ac2fd383/Nashik");

    fetchPromise.then(response => {
      return response.json();
    }).then(nashik_data => {
      nashik_data.map(i => {
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
              var hspNumStr = "";
              var hspLandNumStr = "";

              if(i["HOSPITAL_NUMBER"]) {
                i["HOSPITAL_NUMBER"].split(/[/,]+/).forEach(function(j){hspNumStr+=contactInfo(j)+", "});
              }

              if(i["HOSPITAL_LANDLINE_NUMBER"]) {
                i["HOSPITAL_LANDLINE_NUMBER"].split(/[/,]+/).forEach(function(j){hspLandNumStr+=contactInfo(j)+", "});
              }

              var coord = [i["LAT"], i["LONG"]];

              var hspInfo = hspName(i["HOSPITAL_NAME"], i["LOCATION"]);

              var addr = i["HOSPITAL_ADDRESS"] + "<br>";
              var type = "Division: " + i["DIVISION"] + ", Category: " + i["TYPE"] + "<br>";
              var contact = ((hspNumStr != "") || (hspLandNumStr != "") ? 
                              "Contact: " + hspNumStr + hspLandNumStr
                            : "") + "<br>";
              var coordinator = (i["HOSPITAL_COORDINATORS"] || i["HOSPITAL_COORDINATORS_NUMBER"] ? 
                              "Coordinator: " + (i["HOSPITAL_COORDINATORS"] ? i["HOSPITAL_COORDINATORS"] + (i["HOSPITAL_COORDINATORS_NUMBER"] ? " — " : "") : "") 
                                              + (i["HOSPITAL_COORDINATORS_NUMBER"] ? contactInfo(i["HOSPITAL_COORDINATORS_NUMBER"]) + "<br>" : "<br>")
                            : "");
              var auditor = (i["AUDITOR_NAME"] || i["AUDITOR_NUMBER"] ? 
                              "Auditor: " + (i["AUDITOR_NAME"] ? i["AUDITOR_NAME"] + (i["AUDITOR_NUMBER"] ? " — " : "") : "") 
                                          + (i["AUDITOR_NUMBER"] ? contactInfo(i["AUDITOR_NUMBER"]) + "<br><br>" : "<br><br>")
                            : "<br>");
              
              var nonoxy = bedDetails("BEDS WITHOUT OXYGEN", i["BEDS_WITHOUT_OXYGEN_TOTAL"], i["BEDS_WITHOUT_OXYGEN_AVAILABLE"]);
              var oxy = bedDetails("OXYGEN BEDS", i["BEDS_WITH_OXYGEN_TOTAL"], i["BEDS_WITH_OXYGEN_AVAILABLE"]);
              var icu = bedDetails("ICU BEDS", i["ICU_BEDS_TOTAL"], i["ICU_BEDS_AVAILABLE"]);
              var ven = bedDetails("VENTILATOR BEDS", i["VENTILATOR_TOTAL"], i["VENTILATOR_AVAILABLE"]);

              var marker = L.marker(new L.LatLng(coord[0], coord[1]), {icon: govIcon}).bindPopup(hspInfo + addr + type + contact + coordinator + auditor + nonoxy + oxy + icu + ven);
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
