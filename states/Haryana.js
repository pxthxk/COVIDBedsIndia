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

            var bed_info = {"total": {}, "avail": {}};

            if(flag == 1) {
              var coord = [i["LAT"], i["LONG"]];

              var hspInfo = hspName(i["HOSPITAL_INFO"].split("Availability of Beds: ")[0].split("Facility Name: ")[1], "https://maps.google.com/?q=" + i["LAT"] + "," + i["LONG"]);

              var contact1 = (i["HOSPITAL_INFO"].split("Helpline: ")[1] ? "Contact: " + i["HOSPITAL_INFO"].split("Helpline: ")[1].split("BoardLine Number:")[0] + "<br>" : "");
              var contact2 = (i["HOSPITAL_INFO"].split("Helpline: ")[1] ? "BoardLine Number: " + contactInfo(i["HOSPITAL_INFO"].split("Helpline: ")[1].split("BoardLine Number:")[1]) + "<br>" : "");
              var last_updated_at = i["LAST_UPDATED"] + "<br><br>";

              var bed_tot = (i["HOSPITAL_INFO"].split("Availability of Oxygen:")[0].split("Allocated Beds:")[1] ? i["HOSPITAL_INFO"].split("Availability of Oxygen:")[0].split("Allocated Beds:")[1] : null);
              var bed_vac = (i["HOSPITAL_INFO"].split("Allocated Beds:")[0].split("Availability of Beds:")[1] ? i["HOSPITAL_INFO"].split("Allocated Beds:")[0].split("Availability of Beds:")[1] : null);

              if(bed_tot) {
                bed_tot.split(",").forEach(function(item) { 
                  if(item.includes("Non-Oxygen")) {
                    bed_info["total"]["nonoxy"] = item.match(/\d+/)[0];
                  } else if(item.includes("Oxygen")) {
                    bed_info["total"]["oxy"] = item.match(/\d+/)[0];
                  } else if(item.includes("ICU")) {
                    bed_info["total"]["icu"] = item.match(/\d+/)[0];
                  } else if(item.includes("Ventilators")) {
                    bed_info["total"]["ven"] = item.match(/\d+/)[0];
                  }
                });
              }
              
              if(bed_vac) {
                bed_vac.split(",").forEach(function(item) { 
                  if(item.includes("Non-Oxygen")) {
                    bed_info["avail"]["nonoxy"] = item.match(/\d+/)[0];
                  } else if(item.includes("Oxygen")) {
                    bed_info["avail"]["oxy"] = item.match(/\d+/)[0];
                  } else if(item.includes("ICU")) {
                    bed_info["avail"]["icu"] = item.match(/\d+/)[0];
                  } else if(item.includes("Ventilators")) {
                    bed_info["avail"]["ven"] = item.match(/\d+/)[0];
                  }
                });
              }

              var nonoxy = ((bed_info["total"]["nonoxy"] && bed_info["avail"]["nonoxy"]) ? bedDetails("NONOXYGEN BEDS", bed_info["total"]["nonoxy"], bed_info["avail"]["nonoxy"]) : "");
              var oxy = ((bed_info["total"]["oxy"] && bed_info["avail"]["oxy"]) ? bedDetails("OXYGEN BEDS", bed_info["total"]["oxy"], bed_info["avail"]["oxy"]) : "");
              var icu = ((bed_info["total"]["icu"] && bed_info["avail"]["icu"]) ? bedDetails("ICU BEDS", bed_info["total"]["icu"], bed_info["avail"]["icu"]) : "");
              var ven = ((bed_info["total"]["ven"] && bed_info["avail"]["ven"]) ? bedDetails("VENTILATOR BEDS", bed_info["total"]["ven"], bed_info["avail"]["ven"]) : "");

              var oxy_avail = (i["HOSPITAL_INFO"].split("Availability of Drugs")[0].split("Availability of Oxygen: ")[1] ? "<b>AVAILABILITY OF OXYGEN: </b>" + i["HOSPITAL_INFO"].split("Availability of Drugs")[0].split("Availability of Oxygen: ")[1] + "<br><br>" : "");
              var drug_avail = (i["HOSPITAL_INFO"].split("Helpline:")[0].split("Availability of Drugs")[1] ? "<b>AVAILABILITY OF DRUGS: </b>" + i["HOSPITAL_INFO"].split("Helpline:")[0].split("Availability of Drugs")[1] + "<br><br>" : "");
              
              var marker = L.marker(new L.LatLng(coord[0], coord[1]), {icon: govIcon}).bindPopup(hspInfo + contact1 + contact2 + last_updated_at + nonoxy + oxy + icu + ven + oxy_avail + drug_avail);
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
