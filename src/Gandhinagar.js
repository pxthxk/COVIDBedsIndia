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

              var hspInfo = "<b>" + i["HOSPITAL_NAME"] + "</b><br>";
              var area = i["AREA"] + "<br>";
              var loc = "<a href=" + i["LOCATION"] + " target='_blank'>View on Google Maps</a><br>";
              var nodal_officer = "Nodal Officer: " + i["NODAL_OFFICER_NAME"] + ": " + i["NODAL_OFFICER_NUMBER"] + "<br>";
              var last_updated_at = "Last Updated: " + i["LAST_UPDATED"] + "<br><br>";
              var gen_tot = "<b>MILD SYMPTOMS BEDS</b><br>Total: " + i["MILD_SYMPTOMS_BED_TOTAL"] + "<br>";
              var gen_vac = "Available: " + i["MILD_SYMPTOMS_BED_AVAILABLE"] + "<br><br>";
              var oxy_tot = "<b>OXYGEN GENERAL BEDS</b><br>Total: " + i["O2_BEDS_TOTAL"] + "<br>";
              var oxy_vac = "Available: " + i["O2_BEDS_AVAILABLE"] + "<br><br>";
              var icu_tot = "<b>ICU BEDS</b><br>Total: " + i["ICU_WITHOUT_VENTILATOR_TOTAL"] + "<br>";
              var icu_vac = "Available: " + i["ICU_WITH_VENTILATOR_AVAILABLE"] + "<br><br>";
              var ven_tot = "<b>ICU BEDS WITH VENTILATORS</b><br>Total: " + i["ICU_WITH_VENTILATOR_TOTAL"] + "<br>";
              var ven_vac = "Available: " + i["ICU_WITH_VENTILATOR_AVAILABLE"] + "<br><br>";
              
              var marker = L.marker(new L.LatLng(coord[0], coord[1])).bindPopup(hspInfo + area + loc + nodal_officer + last_updated_at + gen_tot + gen_vac + oxy_tot + oxy_vac + icu_tot + icu_vac + ven_tot + ven_vac);
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
