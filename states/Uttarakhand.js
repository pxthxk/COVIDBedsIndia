class Uttarakhand {
  populate(mcg, bedtype) {
    let fetchPromise = fetch("https://api.covidbedsindia.in/v1/storages/608d542333382c01aecf8c95/Uttarakhand");

    fetchPromise.then(response => {
      return response.json();
    }).then(uttarakhand_data => {
      uttarakhand_data.map(i => {
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

              var nodal_officer = "Nodal Officer: " + i["NODAL_OFFICER_NAME"] + ": " + contactInfo(i["NODAL_OFFICER_NUMBER"]) + "<br>";
              var type = i["TYPE"] + "<br>";
              var last_updated_at = "Last Updated: " + i["LAST_UPDATED"] + "<br><br>";

              var nonoxy = bedDetails("BEDS WITHOUT OXYGEN", i["BEDS_WITHOUT_OXYGEN_TOTAL"], i["BEDS_WITHOUT_OXYGEN_AVAILABLE"]);
              var oxy = bedDetails("OXYGEN BEDS", i["BEDS_WITH_OXYGEN_TOTAL"], i["BEDS_WITH_OXYGEN_AVAILABLE"]);
              var icu = bedDetails("ICU BEDS", i["ICU_BEDS_TOTAL"], i["ICU_BEDS_AVAILABLE"]);
              
              var marker = L.marker(new L.LatLng(coord[0], coord[1]), {icon: govIcon}).bindPopup(hspInfo + nodal_officer + type + last_updated_at + nonoxy + oxy + icu);
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
