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

              var hspInfo = "<b>" + i["HOSPITAL_NAME"] + "</b><br>";
              var zone = "Zone/Ward: " + i["ZONE_WARDS"] + "<br>";
              var contact = "Contact: " + i["CONTACT"] + "<br>";
              var loc = "<a href=" + i["LOCATION"] + " target='_blank'>View on Google Maps</a><br>";
              var last_updated_at = "Last Updated: " + i["LAST_UPDATED"] + "<br><br>";
              var amc_iso_occ = "<b>AMC QUOTA FOR PRIVATE PATIENTS</b><br>ISOLATION BEDS — Occupied:" + i["AMC_ISOLATION_OCCUPIED"] + " ";
              var amc_iso_vac = "Available:" + i["AMC_ISOLATION_VACANT"] + "<br>";
              var amc_hdu_occ = "HDU BEDS — Occupied:" + i["AMC_HIGH_DEPENDENCY_UNIT_OCCUPIED"] + " ";
              var amc_hdu_vac = "Available:" + i["AMC_HIGH_DEPENDENCY_UNIT_VACANT"] + "<br>";
              var amc_icu_occ = "ICU BEDS — Occupied:" + i["AMC_ICU_WITHOUT_VENTILATOR_OCCUPIED"] + " ";
              var amc_icu_vac = "Available:" + i["AMC_ICU_WITHOUT_VENTILATOR_VACANT"] + "<br>";
              var amc_ven_occ = "ICU BEDS WITH VENTILATOR — Occupied:" + i["AMC_ICU_WITH_VENTILATOR_OCCUPIED"] + " ";
              var amc_ven_vac = "Available:" + i["AMC_ICU_WITH_VENTILATOR_VACANT"] + "<br><br>";
              var private_iso_occ = "<b>PRIVATE QUOTA FOR PRIVATE PATIENTS</b><br>ISOLATION BEDS — Occupied:" + i["PRIVATE_ISOLATION_OCCUPIED"] + " ";
              var private_iso_vac = "Available:" + i["PRIVATE_ISOLATION_VACANT"] + "<br>";
              var private_hdu_occ = "HDU BEDS — Occupied:" + i["PRIVATE_HIGH_DEPENDENCY_UNIT_OCCUPIED"] + " ";
              var private_hdu_vac = "Available:" + i["PRIVATE_HIGH_DEPENDENCY_UNIT_VACANT"] + "<br>";
              var private_icu_occ = "ICU BEDS — Occupied:" + i["PRIVATE_ICU_WITHOUT_VENTILATOR_OCCUPIED"] + " ";
              var private_icu_vac = "Available:" + i["PRIVATE_ICU_WITHOUT_VENTILATOR_VACANT"] + "<br>";
              var private_ven_occ = "ICU BEDS WITH VENTILATOR — Occupied:" + i["PRIVATE_ICU_WITH_VENTILATOR_OCCUPIED"] + " ";
              var private_ven_vac = "Available:" + i["PRIVATE_ICU_WITH_VENTILATOR_VACANT"] + "<br>";

              var marker = L.marker(new L.LatLng(coord[0], coord[1])).bindPopup(hspInfo + zone + (i["CONTACT"] ? contact : "") + loc + last_updated_at + amc_iso_occ + amc_iso_vac + amc_hdu_occ + amc_hdu_vac + amc_icu_occ + amc_icu_vac + amc_ven_occ + amc_ven_vac + private_iso_occ + private_iso_vac + private_hdu_occ + private_hdu_vac + private_icu_occ + private_icu_vac + private_ven_occ + private_ven_vac);
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
