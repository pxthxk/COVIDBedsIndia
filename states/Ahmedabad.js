class Ahmedabad {
  populate(mcg, bedtype) {
    let fetchPromise = fetch("https://api.covidbedsindia.in/v1/storages/608982c803eef3543bd05a70/Ahmedabad");

    fetchPromise.then(response => {
      return response.json();
    }).then(ahmedabad_data => {
      ahmedabad_data.map(i => {
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

              var zone = "Zone/Ward: " + i["HOSPITAL_ZONE"] + "<br>";
              var nodal_officer = "Nodal Officer: " + i["NODAL_OFFICER_NAME"] + " (" + contactInfo(i["NODAL_OFFICER_NUMBER"]) + ")<br>";
              var last_updated_at = "Last Updated: " + i["LAST_UPDATED"] + "<br><br>";

              var iso = bedDetails("ISOLATION BEDS", null, i["ISOLATION_BEDS_AVAILABLE"], false);
              var oxy = bedDetails("OXYGEN BEDS", null, i["BEDS_WITH_OXYGEN_AVAILABLE"], false);
              var icu = bedDetails("ICU BEDS", null, i["ICU_BEDS_WITHOUT_VENTILATOR_AVAILABLE"], false);
              var ven = bedDetails("VENTILATOR BEDS", null, i["ICU_BEDS_WITH_VENTILATOR_AVAILABLE"], false);
              
              var marker = L.marker(new L.LatLng(coord[0], coord[1]), {icon: govIcon}).bindPopup(hspInfo + zone + nodal_officer + last_updated_at + iso + oxy + icu + ven);
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
