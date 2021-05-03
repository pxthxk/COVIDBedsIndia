class Madhya_Pradesh {
  populate(mcg, bedtype) {
    let fetchPromise = fetch("https://api.covidbedsindia.in/v1/storages/608983ca03eef3dd7ad05a75/Madhya%20Pradesh");

    fetchPromise.then(response => {
      return response.json();
    }).then(madhya_pradesh_data => {
      madhya_pradesh_data.map(i => {
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
              if(i["LOCATION"].includes("https://maps.google.com/?q=")) {
                var coord = [i["LOCATION"].split("https://maps.google.com/?q=")[1].split(",")[0], i["LOCATION"].split("https://maps.google.com/?q=")[1].split(",")[1]];
              } else if(i["LOCATION"].split("/")[6].split(",").length == 3) {
                var coord = i["LOCATION"].split("/")[6].replace("@", "").split(",");
              } else {
                var coord = i["LOCATION"].split("/")[7].replace("@", "").split(",");
              }
              

              if((coord[0] != 0) && (coord[1] != 0)) {
                var hspInfo = "<b>" + i["HOSPITAL_NAME"] + "</b><br>";
                var type = i["TYPE"] + "<br>";
                var contact = "Contact: " + (i["CONTACT_1"] ? i["CONTACT_1"].split("Mob: ")[1] : "") + (i["CONTACT_2"] ? ", " + i["CONTACT_2"].split("Mob: ")[1] : "") + (i["CONTACT_3"] ? ", " + i["CONTACT_3"].split("Mob: ")[1] : "") + "<br>";
                var loc = "<a href=" + i["LOCATION"].replace(" ", "") + " target='_blank'>View on Google Maps</a><br>";
                var last_updated_at = "Last Updated: " + i["LAST_UPDATED"] + "<br><br>";
                var iso_tot = "<b>ISOLATION BEDS</b><br>Total: " + i["ISOLATION_BEDS_TOTAL"] + "<br>";
                var iso_vac = "Available: " + i["ISOLATION_BEDS_AVAILABLE"] + "<br><br>";
                var oxy_tot = "<b>OXYGEN GENERAL BEDS</b><br>Total: " + i["OXYGEN_BEDS_TOTAL"] + "<br>";
                var oxy_vac = "Available: " + i["OXYGEN_BEDS_AVAILABLE"] + "<br><br>";
                var icu_tot = "<b>ICU BEDS</b><br>Total: " + i["ICU_BEDS_TOTAL"] + "<br>";
                var icu_vac = "Available: " + i["ICU_BEDS_AVAILABLE"] + "<br><br>";
                
                var marker = L.marker(new L.LatLng(coord[0], coord[1])).bindPopup(hspInfo + type + contact + loc + last_updated_at + iso_tot + iso_vac + oxy_tot + oxy_vac + icu_tot + icu_vac);
                mcg.addLayer(marker);
              }
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
