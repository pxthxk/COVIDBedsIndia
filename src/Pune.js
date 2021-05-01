class Pune {
  populate(mcg, bedtype) {
    let fetchPromise = fetch("https://api.covidbedsindia.in/v1/storages/6089822703eef30c1cd05a6e/Pune");

    fetchPromise.then(response => {
      return response.json();
    }).then(pune_data => {
      pune_data.map(i => {
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

              var hspInfo = "<b>" + i["HOSPITAL_NAME"] + "</b><br>";
              var addr = i["HOSPITAL_ADDRESS"] + "<br>";
              var contact = "Contact: " + i["CONTACT"] + "<br>";
              var cat = "Category: " + i["HOSPITAL_CATEGORY"] + "<br>";
              var type = "Charges: " + i["CHARGES"] + "<br>";
              var loc = "<a href=" + i["LOCATION"] + " target='_blank'>View on Google Maps</a><br>";
              var timestamp = new Date(Number(i["LAST_UPDATED"])).toString().split("GMT")[0];
              var last_updated_at = "Last Updated: " + timestamp + "<br><br>";
              var reg_tot = "<b>BEDS WITHOUT OXYGEN</b><br>Total: " + i["TOTAL_BEDS_WITHOUT_OXYGEN"] + "<br>";
              var reg_vac = "Available: " + i["AVAILABLE_BEDS_WITHOUT_OXYGEN"] + "<br><br>";
              var oxy_tot = "<b>OXYGEN BEDS</b><br>Total: " + i["TOTAL_BEDS_WITH_OXYGEN"] + "<br>";
              var oxy_vac = "Available: " + i["AVAILABLE_BEDS_WITH_OXYGEN"] + "<br><br>";
              var icu_tot = "<b>ICU BEDS</b><br>Total: " + i["TOTAL_ICU_BEDS_WITHOUT_VENTILATOR"] + "<br>";
              var icu_vac = "Available: " + i["AVAILABLE_ICU_BEDS_WITHOUT_VENTILATOR"] + "<br><br>";
              var ven_tot = "<b>ICU BEDS WITH VENTILATOR</b><br>Total: " + i["TOTAL_ICU_BEDS_WITH_VENTILATOR"] + "<br>";
              var ven_vac = "Available: " + i["AVAILABLE_ICU_BEDS_WITH_VENTILATOR"] + "<br><br>";
              
              var marker = L.marker(new L.LatLng(coord[0], coord[1])).bindPopup(hspInfo + addr + contact + cat + type + loc + last_updated_at + reg_tot + reg_vac + oxy_tot + oxy_vac + icu_tot + icu_vac + ven_tot + ven_vac);
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
