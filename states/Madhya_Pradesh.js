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
                var hspInfo = hspName(i["HOSPITAL_NAME"], i["LOCATION"].replace(" ", ""));

                var contact = "Contact: " + (i["CONTACT_1"] ? contactInfo(i["CONTACT_1"].split("Mob: ")[1]) : "") + (i["CONTACT_2"] ? ", " + contactInfo(i["CONTACT_2"].split("Mob: ")[1]) : "") + (i["CONTACT_3"] ? ", " + contactInfo(i["CONTACT_3"].split("Mob: ")[1]) : "") + "<br>";
                var type = i["TYPE"] + "<br>";
                var last_updated_at = "Last Updated: " + i["LAST_UPDATED"] + "<br><br>";

                var iso = bedDetails("ISOLATION BEDS", i["ISOLATION_BEDS_TOTAL"], i["ISOLATION_BEDS_AVAILABLE"]);
                var oxy = bedDetails("OXYGEN BEDS", i["OXYGEN_BEDS_TOTAL"], i["OXYGEN_BEDS_AVAILABLE"]);
                var icu = bedDetails("ICU BEDS", i["ICU_BEDS_TOTAL"], i["ICU_BEDS_AVAILABLE"]);
                
                var marker = L.marker(new L.LatLng(coord[0], coord[1]), {icon: govIcon}).bindPopup(hspInfo + contact + type + last_updated_at + iso + oxy + icu);
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
