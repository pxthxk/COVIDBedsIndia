class Haryana {
  populate(mcg, bedtype) {
    for(var i in haryana_data) {
      var flag = 0;
      var  icu_tot = (haryana_data[i]["HOSPITAL_INFO"].split("Availability of Oxygen:")[0].split("Allocated Beds:")[1] ? parseInt(haryana_data[i]["HOSPITAL_INFO"].split("Availability of Oxygen:")[0].split("Allocated Beds:")[1].split(", Ventilators: ")[0].split("ICU: ")[1]) : null);
      var  ven_tot = (haryana_data[i]["HOSPITAL_INFO"].split("Availability of Oxygen:")[0].split("Allocated Beds:")[1] ? parseInt(haryana_data[i]["HOSPITAL_INFO"].split("Availability of Oxygen:")[0].split("Allocated Beds:")[1].split(", Ventilators: ")[1]) : null);

      try {
        if((haryana_data[i]["LAT"] != 0) && (haryana_data[i]["LONG"] != 0)) {
          if(bedtype == "icu") {
            if(icu_tot || ven_tot) {
              flag = 1;
            }
          } else if(bedtype == "ventilator") {
            if(ven_tot) {
              flag = 1;
            }
          } else {
            flag = 1;
          }

          if(flag == 1) {
            var coord = [haryana_data[i]["LAT"], haryana_data[i]["LONG"]];

            var hspInfo = "<b>" + haryana_data[i]["HOSPITAL_INFO"].split("Availability of Beds: ")[0].split("Facility Name: ")[1] + "</b><br>";
            var contact = (haryana_data[i]["HOSPITAL_INFO"].split("Helpline: ")[1] ? "Contact: " + haryana_data[i]["HOSPITAL_INFO"].split("Helpline: ")[1] + "<br><br>" : "");
            var last_updated_at = haryana_data[i]["LAST_UPDATED"] + "<br><br>";
            var bed_tot = (haryana_data[i]["HOSPITAL_INFO"].split("Availability of Oxygen:")[0].split("Allocated Beds:")[1] ? "<b>TOTAL BEDS</b><br>" + haryana_data[i]["HOSPITAL_INFO"].split("Availability of Oxygen:")[0].split("Allocated Beds:")[1] + "<br><br>" : "");
            var bed_vac = (haryana_data[i]["HOSPITAL_INFO"].split("Allocated Beds:")[0].split("Availability of Beds:")[1] ? "<b>AVAILABLE BEDS</b><br>" + haryana_data[i]["HOSPITAL_INFO"].split("Allocated Beds:")[0].split("Availability of Beds:")[1] + "<br><br>" : "");
            var oxy_avail = (haryana_data[i]["HOSPITAL_INFO"].split("Availability of Drugs")[0].split("Availability of Oxygen: ")[1] ? "<b>AVAILABILITY OF OXYGEN</b><br>" + haryana_data[i]["HOSPITAL_INFO"].split("Availability of Drugs")[0].split("Availability of Oxygen: ")[1] + "<br><br>" : "");
            var drug_avail = (haryana_data[i]["HOSPITAL_INFO"].split("Helpline:")[0].split("Availability of Drugs")[1] ? "<b>AVAILABILITY OF DRUGS</b><br>" + haryana_data[i]["HOSPITAL_INFO"].split("Helpline:")[0].split("Availability of Drugs")[1] + "<br><br>" : "");
            
            var marker = L.marker(new L.LatLng(coord[0], coord[1])).bindPopup(hspInfo + contact + last_updated_at + bed_tot + bed_vac + oxy_avail + drug_avail);
            mcg.addLayer(marker);
          }
        }
      } catch(err) {
        console.log(err);
      }
    }
  }
}
