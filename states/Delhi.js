var gnctd_covid_facilities_data;
var gnctd_covid_data;
var missing_delhi_hsp_location;

class DelhiHospital {
  constructor(name) {
    this.name = name;
  }

  contact(hsp_name) {
    var contactString = "";

    for(var i=0; i<gnctd_covid_facilities_data[hsp_name]["contact_numbers"].length; i++) {
      contactString += contactInfo(gnctd_covid_facilities_data[hsp_name]["contact_numbers"][i]) + (i != gnctd_covid_facilities_data[hsp_name]["contact_numbers"].length-1 ? ", " : "")
    }
    
    return "Contact: " + contactString + "<br>";
  }

  location(hsp_name) {
    if(missing_delhi_hsp_location.find(o => o["HOSPITAL_NAME"] === hsp_name)) {
      var loc = missing_delhi_hsp_location.find(o => o["HOSPITAL_NAME"] === hsp_name)["LOCATION"];
    } else {
      var loc = gnctd_covid_facilities_data[hsp_name]["location"]
    } 
    return loc;
  }

  // private or govt
  hsp_type(hsp_name) {
    return gnctd_covid_facilities_data[hsp_name]["type"] + "<br>"
  }

  last_updated_at(hsp_name) {
    for(var j in gnctd_covid_data) {
      if(gnctd_covid_data[j][hsp_name]){
        return "Last Updated: " + gnctd_covid_data[j][hsp_name]["last_updated_at"] + "<br><br>";
      }
    }
    return "";
  }

  bed_info(hsp_name) {
    var bedInfo = ""
      for(var j in gnctd_covid_data) {
        if(gnctd_covid_data[j][hsp_name]){
          if(j!="oxygen_left_for") {
            bedInfo += bedDetails(j.split("_").join(" ").replace(/(^|\s)\S/g, l => l).toUpperCase(), String(gnctd_covid_data[j][hsp_name]["total"]), String(gnctd_covid_data[j][hsp_name]["vacant"]));
          } else {
            bedInfo += "<b>Oxygen left for " + gnctd_covid_data[j][hsp_name]["days"] + " day(s) and " + gnctd_covid_data[j][hsp_name]["hours"] + " hours</b>";
          }
        }
      }
    return bedInfo;
  }

  coord(hsp_name) {
    try {
      if(missing_delhi_hsp_location.find(o => o["HOSPITAL_NAME"] === hsp_name)) {
          if(missing_delhi_hsp_location.find(o => o["HOSPITAL_NAME"] === hsp_name)["LOCATION"].split("/")[6].split(",").length == 3) {
            return missing_delhi_hsp_location.find(o => o["HOSPITAL_NAME"] === hsp_name)["LOCATION"].split("/")[6].replace("@", "").split(",");
          } else {
            return missing_delhi_hsp_location.find(o => o["HOSPITAL_NAME"] === hsp_name)["LOCATION"].split("/")[7].replace("@", "").split(",");
          }
        }
       else {
        if(gnctd_covid_facilities_data[hsp_name]["location"]) {
        if(gnctd_covid_facilities_data[hsp_name]["location"].split("/")[6].split(",").length == 3) {
          return gnctd_covid_facilities_data[hsp_name]["location"].split("/")[6].replace("@", "").split(",");
        } else {
          return gnctd_covid_facilities_data[hsp_name]["location"].split("/")[7].replace("@", "").split(",");
        }
      } else {
          console.log(`No location found for ${hsp_name} in Delhi`);
          return ["", ""]
        }
      }
    } catch(err) {
      console.log(err);
      console.log(hsp_name);

      if(missing_delhi_hsp_location.find(o => o["HOSPITAL_NAME"] === hsp_name)) {
        if(missing_delhi_hsp_location.find(o => o["HOSPITAL_NAME"] === hsp_name)["LOCATION"].split("/")[6].split(",").length == 3) {
          return missing_delhi_hsp_location.find(o => o["HOSPITAL_NAME"] === hsp_name)["LOCATION"].split("/")[6].replace("@", "").split(",");
        } else {
          return missing_delhi_hsp_location.find(o => o["HOSPITAL_NAME"] === hsp_name)["LOCATION"].split("/")[7].replace("@", "").split(",");
        }
      }
      return ["", ""]
    }
  }
}

class Delhi {
  populate(mcg, bedtype) {
    $.getJSON('https://coronabeds.jantasamvad.org/covid-facilities.js?callback=?', function(data) {
      gnctd_covid_facilities_data = data;
    });
    $.getJSON("https://coronabeds.jantasamvad.org/covid-info.js?callback=?", function(data) {
      gnctd_covid_data = data;
    });

    setTimeout(function() {
      fetch("https://api.covidbedsindia.in/v1/storages/60b1c92490b4574e2c831017/Delhi").then(response => {
        return response.json();
      }).then(data => {
        missing_delhi_hsp_location = data;

        for(var i in gnctd_covid_facilities_data) {
          var flag = 0;

          var icu_tot = (gnctd_covid_data["covid_icu_beds"][i] ? gnctd_covid_data["covid_icu_beds"][i]["total"] : null)
          var ven_tot = (gnctd_covid_data["ventilators"][i] ? gnctd_covid_data["ventilators"][i]["total"] : null)

          try {
            if(bedtype == "icu") {
              if(icu_tot) {
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
              var hsp = new DelhiHospital(i);

              var coord = hsp.coord(i);

              var hspInfo = hspName(i, hsp.location(i));

              var contact = hsp.contact(i);
              var type = hsp.hsp_type(i);
              var last_updated_at = hsp.last_updated_at(i);

              var bed_info = hsp.bed_info(i);

              if (coord[0] || coord[1]) {
                var marker = L.marker(new L.LatLng(coord[0], coord[1]), {icon: govIcon}).bindPopup(hspInfo + contact + type + last_updated_at + bed_info);
                mcg.addLayer(marker);
              }
            }
          } catch(err) {
            console.log(i);
            console.log(err);
          }
        }
      });
    }, 2500);
  }
}
