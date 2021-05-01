class Haryana {
  populate(mcg, bedtype) {
    let fetchPromise = fetch("https://api.covidbedsindia.in/v1/storages/6089834e03eef33448d05a74/Haryana");

    fetchPromise.then(response => {
      return response.json();
    }).then(haryana_data => {
      haryana_data.map(i => {
        var flag = 0;
        var  icu_tot = (i["HOSPITAL_INFO"].split("Availability of Oxygen:")[0].split("Allocated Beds:")[1] ? parseInt(i["HOSPITAL_INFO"].split("Availability of Oxygen:")[0].split("Allocated Beds:")[1].split(", Ventilators: ")[0].split("ICU: ")[1]) : null);
        var  ven_tot = (i["HOSPITAL_INFO"].split("Availability of Oxygen:")[0].split("Allocated Beds:")[1] ? parseInt(i["HOSPITAL_INFO"].split("Availability of Oxygen:")[0].split("Allocated Beds:")[1].split(", Ventilators: ")[1]) : null);

        try {
          if(i["LAT"] != 0 && i["LONG"] != 0) {
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
              var coord = [i["LAT"], i["LONG"]];

              var hspInfo = "<b>" + i["HOSPITAL_INFO"].split("Availability of Beds: ")[0].split("Facility Name: ")[1] + "</b><br>";
              var contact = (i["HOSPITAL_INFO"].split("Helpline: ")[1] ? "Contact: " + i["HOSPITAL_INFO"].split("Helpline: ")[1] + "<br>" : "");
              var loc = "<a href=" + "https://maps.google.com/?q=" + i["LAT"] + "," + i["LONG"] + " target='_blank'>View on Google Maps</a><br>";
              var last_updated_at = i["LAST_UPDATED"] + "<br><br>";
              var bed_tot = (i["HOSPITAL_INFO"].split("Availability of Oxygen:")[0].split("Allocated Beds:")[1] ? "<b>TOTAL BEDS</b><br>" + i["HOSPITAL_INFO"].split("Availability of Oxygen:")[0].split("Allocated Beds:")[1] + "<br><br>" : "");
              var bed_vac = (i["HOSPITAL_INFO"].split("Allocated Beds:")[0].split("Availability of Beds:")[1] ? "<b>AVAILABLE BEDS</b><br>" + i["HOSPITAL_INFO"].split("Allocated Beds:")[0].split("Availability of Beds:")[1] + "<br><br>" : "");
              var oxy_avail = (i["HOSPITAL_INFO"].split("Availability of Drugs")[0].split("Availability of Oxygen: ")[1] ? "<b>AVAILABILITY OF OXYGEN</b><br>" + i["HOSPITAL_INFO"].split("Availability of Drugs")[0].split("Availability of Oxygen: ")[1] + "<br><br>" : "");
              var drug_avail = (i["HOSPITAL_INFO"].split("Helpline:")[0].split("Availability of Drugs")[1] ? "<b>AVAILABILITY OF DRUGS</b><br>" + i["HOSPITAL_INFO"].split("Helpline:")[0].split("Availability of Drugs")[1] + "<br><br>" : "");
              
              var marker = L.marker(new L.LatLng(coord[0], coord[1])).bindPopup(hspInfo + contact + loc + last_updated_at + bed_tot + bed_vac + oxy_avail + drug_avail);
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
