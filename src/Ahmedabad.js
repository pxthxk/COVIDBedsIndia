class Ahmedabad {
  populate(mcg, bedtype) {
    for(var i in ahmedabad_data) {
      var flag = 0;

      try {
        if(ahmedabad_data[i]["LOCATION"] != "") {
          if(bedtype == "icu") {
            if(ahmedabad_data[i]["HAS_ICU_BEDS"] == "TRUE" || ahmedabad_data[i]["HAS_VENTILATORS"] == "TRUE") {
              flag = 1;
            }
          } else if(bedtype == "ventilator") {
            if(ahmedabad_data[i]["HAS_VENTILATORS"] == "TRUE") {
              flag = 1;
            }
          } else {
            flag = 1;
          }

          if(flag == 1) {
            if(ahmedabad_data[i]["LOCATION"].split("/")[6].split(",").length == 3) {
              var coord = ahmedabad_data[i]["LOCATION"].split("/")[6].replace("@", "").split(",");
            } else {
              var coord = ahmedabad_data[i]["LOCATION"].split("/")[7].replace("@", "").split(",");
            }

            var hspInfo = "<b>" + ahmedabad_data[i]["HOSPITAL_NAME"] + "</b><br>";
            var zone = "Zone/Ward: " + ahmedabad_data[i]["ZONE_WARDS"] + "<br>";
            var contact = "Contact: " + ahmedabad_data[i]["CONTACT"] + "<br>";
            var loc = "<a href=" + ahmedabad_data[i]["LOCATION"] + " target='_blank'>View on Google Maps</a><br>";
            var last_updated_at = "Last Updated: " + ahmedabad_data[i]["LAST_UPDATED"] + "<br><br>";
            var amc_iso_occ = "<b>AMC QUOTA FOR PRIVATE PATIENTS</b><br><u>ISOLATION BEDS</u><br>Occupied: " + ahmedabad_data[i]["AMC_ISOLATION_OCCUPIED"] + " ";
            var amc_iso_vac = "Available: " + ahmedabad_data[i]["AMC_ISOLATION_VACANT"] + "<br><br>";
            var amc_hdu_occ = "<u>HIGH DEPENDENCY UNIT BEDS</u><br>Occupied: " + ahmedabad_data[i]["AMC_HIGH_DEPENDENCY_UNIT_OCCUPIED"] + " ";
            var amc_hdu_vac = "Available: " + ahmedabad_data[i]["AMC_HIGH_DEPENDENCY_UNIT_VACANT"] + "<br><br>";
            var amc_icu_occ = "<u>ICU BEDS</u><br>Occupied: " + ahmedabad_data[i]["AMC_ICU_WITHOUT_VENTILATOR_OCCUPIED"] + " ";
            var amc_icu_vac = "Available: " + ahmedabad_data[i]["AMC_ICU_WITHOUT_VENTILATOR_VACANT"] + "<br><br>";
            var amc_ven_occ = "<u>ICU BEDS WITH VENTILATOR</u><br>Occupied: " + ahmedabad_data[i]["AMC_ICU_WITH_VENTILATOR_OCCUPIED"] + " ";
            var amc_ven_vac = "Available: " + ahmedabad_data[i]["AMC_ICU_WITH_VENTILATOR_VACANT"] + "<br><br>";
            var private_iso_occ = "<b>PRIVATE QUOTA FOR PRIVATE PATIENTS</b><br><u>ISOLATION BEDS</u><br>Occupied: " + ahmedabad_data[i]["PRIVATE_ISOLATION_OCCUPIED"] + " ";
            var private_iso_vac = "Available: " + ahmedabad_data[i]["PRIVATE_ISOLATION_VACANT"] + "<br><br>";
            var private_hdu_occ = "<u>HIGH DEPENDENCY UNIT BEDS</u><br>Occupied: " + ahmedabad_data[i]["PRIVATE_HIGH_DEPENDENCY_UNIT_OCCUPIED"] + " ";
            var private_hdu_vac = "Available: " + ahmedabad_data[i]["PRIVATE_HIGH_DEPENDENCY_UNIT_VACANT"] + "<br><br>";
            var private_icu_occ = "<u>ICU BEDS</u><br>Occupied: " + ahmedabad_data[i]["PRIVATE_ICU_WITHOUT_VENTILATOR_OCCUPIED"] + " ";
            var private_icu_vac = "Available: " + ahmedabad_data[i]["PRIVATE_ICU_WITHOUT_VENTILATOR_VACANT"] + "<br><br>";
            var private_ven_occ = "<u>ICU BEDS WITH VENTILATOR</u><br>Occupied: " + ahmedabad_data[i]["PRIVATE_ICU_WITH_VENTILATOR_OCCUPIED"] + " ";
            var private_ven_vac = "Available: " + ahmedabad_data[i]["PRIVATE_ICU_WITH_VENTILATOR_VACANT"] + "<br><br>";

            var marker = L.marker(new L.LatLng(coord[0], coord[1])).bindPopup(hspInfo + zone + (contact ? ahmedabad_data[i]["CONTACT"] : null) + loc + last_updated_at + amc_iso_occ + amc_iso_vac + amc_hdu_occ + amc_hdu_vac + amc_icu_occ + amc_icu_vac + amc_ven_occ + amc_ven_vac + private_iso_occ + private_iso_vac + private_hdu_occ + private_hdu_vac + private_icu_occ + private_icu_vac + private_ven_occ + private_ven_vac);
            mcg.addLayer(marker);
          }
        }
      } catch(err) {
        console.log(ahmedabad_data[i]["HOSPITAL_NAME"]);
        console.log(err);
      }
    }
  }
}
