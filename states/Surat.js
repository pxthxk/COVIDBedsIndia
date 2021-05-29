class Surat {
  populate(mcg, bedtype) {
    let fetchPromise = fetch("https://api.covidbedsindia.in/v1/storages/6094e879423e213eb82fd384/Surat");

    fetchPromise.then(response => {
      return response.json();
    }).then(surat_data => {
      surat_data.map(i => {
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

              var hspInfo = hspName(i["HOSPITAL_NAME"], i["LOCATION"]);

              var addr = i["HOSPITAL_ADDRESS"] + "<br>";
              var contact = "Contact: " + contactInfo(i["HOSPITAL_NUMBER"]) + "<br>";
              var last_updated_at = "Last Updated: " + i["LAST_UPDATED"] + "<br><br>";

              var ward = bedDetails("WARD BEDS", null, i["TOTAL_WARD_BEDS_AVAILABLE"]);
              var oxy = bedDetails("OXYGEN BEDS", null, i["TOTAL_OXYGEN_BEDS_AVAILABLE"]);
              var icu = bedDetails("BIPAP BEDS", null, i["TOTAL_BIPAP_BEDS_AVAILABLE"]);
              var ven = bedDetails("VENTILATOR BEDS", null, i["TOTAL_VENTILATOR_BEDS_AVAILABLE"]);

              var marker = L.marker(new L.LatLng(coord[0], coord[1]), {icon: govIcon}).bindPopup(hspInfo + addr + (i["HOSPITAL_NUMBER"] ? contact : "") + last_updated_at + ward + oxy + icu + ven);
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
