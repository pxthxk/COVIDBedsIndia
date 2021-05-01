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

              var hspInfo = "<b>" + i["HOSPITAL_NAME"] + "</b><br>";
              var type = i["TYPE"] + "<br>";
              var loc = "<a href=" + i["LOCATION"] + " target='_blank'>View on Google Maps</a><br>";
              var nodal_officer = "Nodal Officer: " + i["NODAL_OFFICER_NAME"] + ": " + i["NODAL_OFFICER_NUMBER"] + "<br>";
              var last_updated_at = "Last Updated: " + i["LAST_UPDATED"] + "<br><br>";
              var gen_tot = "<b>BEDS WITHOUT OXYGEN</b><br>Total: " + i["BEDS_WITHOUT_OXYGEN_TOTAL"] + "<br>";
              var gen_vac = "Available: " + i["BEDS_WITHOUT_OXYGEN_AVAILABLE"] + "<br><br>";
              var oxy_tot = "<b>OXYGEN BEDS</b><br>Total: " + i["BEDS_WITH_OXYGEN_TOTAL"] + "<br>";
              var oxy_vac = "Available: " + i["BEDS_WITH_OXYGEN_AVAILABLE"] + "<br><br>";
              var icu_tot = "<b>ICU BEDS</b><br>Total: " + i["ICU_BEDS_TOTAL"] + "<br>";
              var icu_vac = "Available: " + i["ICU_BEDS_AVAILABLE"] + "<br><br>";
              
              var marker = L.marker(new L.LatLng(coord[0], coord[1])).bindPopup(hspInfo + type + loc + nodal_officer + last_updated_at + gen_tot + gen_vac + oxy_tot + oxy_vac + icu_tot + icu_vac);
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
