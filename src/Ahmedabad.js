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

              var zone = "Zone/Ward: " + i["ZONE_WARDS"] + "<br>";
              var contact = "Contact: " + i["CONTACT"] + "<br>";
              var last_updated_at = "Last Updated: " + i["LAST_UPDATED"] + "<br><br>";

              var amc_iso = "<b>AMC QUOTA FOR PRIVATE PATIENTS</b><br>" + bedDetails("ISOLATION", i["AMC_ISOLATION_OCCUPIED"], i["AMC_ISOLATION_VACANT"]);
              var amc_hdu = bedDetails("HDU BEDS", i["AMC_HIGH_DEPENDENCY_UNIT_OCCUPIED"], i["AMC_HIGH_DEPENDENCY_UNIT_VACANT"]);
              var amc_icu = bedDetails("ICU BEDS", i["AMC_ICU_WITHOUT_VENTILATOR_OCCUPIED"], i["AMC_ICU_WITHOUT_VENTILATOR_VACANT"]);
              var amc_ven = bedDetails("VENTILATOR", i["AMC_ICU_WITH_VENTILATOR_OCCUPIED"], i["AMC_ICU_WITH_VENTILATOR_VACANT"]);
              var pvt_iso = "<b>PRIVATE QUOTA FOR PRIVATE PATIENTS</b><br>" + bedDetails("ISOLATION", i["PRIVATE_ISOLATION_OCCUPIED"], i["PRIVATE_ISOLATION_VACANT"]);
              var pvt_hdu = bedDetails("HDU BEDS", i["PRIVATE_HIGH_DEPENDENCY_UNIT_OCCUPIED"], i["PRIVATE_HIGH_DEPENDENCY_UNIT_VACANT"]);
              var pvt_icu = bedDetails("ICU BEDS", i["PRIVATE_ICU_WITHOUT_VENTILATOR_OCCUPIED"], i["PRIVATE_ICU_WITHOUT_VENTILATOR_VACANT"]);
              var pvt_ven = bedDetails("VENTILATOR BEDS", i["PRIVATE_ICU_WITH_VENTILATOR_OCCUPIED"], i["PRIVATE_ICU_WITH_VENTILATOR_VACANT"]);

              var marker = L.marker(new L.LatLng(coord[0], coord[1])).bindPopup(hspInfo + zone + (i["CONTACT"] ? contact : "") + last_updated_at + amc_iso + amc_hdu + amc_icu + amc_ven + pvt_iso + pvt_hdu + pvt_icu + pvt_ven);
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
