var gnctd_covid_facilities_data;
var gnctd_covid_data;

class DelhiHospital {
  constructor(name) {
    this.name = name;
  }

  contact(hsp_name) {
    return "Contact: " + gnctd_covid_facilities_data[hsp_name]["contact_numbers"].join(", ") + "<br>";
  }

  location(hsp_name) {
    if(hsp_name in missing_delhi_hsp_location) {
      var loc = missing_delhi_hsp_location[hsp_name];
    } else {
      var loc = gnctd_covid_facilities_data[hsp_name]["location"]
    } 
    return "<a href=" + loc + " target='_blank'>View on Google Maps</a><br>";
  }

  // private or govt
  hsp_type(hsp_name) {
    return gnctd_covid_facilities_data[hsp_name]["type"] + "<br>"
  }

  last_updated_at(hsp_name) {
    for(var j in gnctd_covid_data) {
      if(gnctd_covid_data[j][hsp_name]){
        return "Last Updated: " + gnctd_covid_data[j][hsp_name]["last_updated_at"] + "<br>";
      }
    }
    return "";
  }

  bed_info(hsp_name) {
    var bedInfo = ""
      for(var j in gnctd_covid_data) {
        if(gnctd_covid_data[j][hsp_name]){
          var type = gnctd_covid_data[j][hsp_name]["type"] + "<br>";
          var last_updated_at = "Last Updated: " + gnctd_covid_data[j][hsp_name]["last_updated_at"] + "<br>";

          bedInfo = bedInfo + "<br><b>" + j.split("_").join(" ").replace(/(^|\s)\S/g, l => l).toUpperCase() + "</b><br>Total: " + gnctd_covid_data[j][hsp_name]["total"] + "<br>Vacant: " + gnctd_covid_data[j][hsp_name]["vacant"] + "<br>";
        }
      }
    return bedInfo;
  }

  coord(hsp_name) {
    try {
      if(hsp_name in missing_delhi_hsp_location) {
          if(missing_delhi_hsp_location[hsp_name].split("/")[6].split(",").length == 3) {
            return missing_delhi_hsp_location[hsp_name].split("/")[6].replace("@", "").split(",");
          } else {
            return missing_delhi_hsp_location[hsp_name].split("/")[7].replace("@", "").split(",");
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

      if(hsp_name in missing_delhi_hsp_location) {
        if(missing_delhi_hsp_location[hsp_name].split("/")[6].split(",").length == 3) {
          return missing_delhi_hsp_location[hsp_name].split("/")[6].replace("@", "").split(",");
        } else {
          return missing_delhi_hsp_location[hsp_name].split("/")[7].replace("@", "").split(",");
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
    $.getJSON('https://coronabeds.jantasamvad.org/covid-info.js?callback=?', function(data) {
      gnctd_covid_data = data;
    });

    setTimeout(function() {
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
            var hsp_info = "<b>" + i + "</b><br>";
            var contact_numbers = hsp.contact(i);
            var loc = hsp.location(i);
            var bed_info = hsp.bed_info(i);
            var type = hsp.hsp_type(i);
            var last_updated_at = hsp.last_updated_at(i);

            if (coord[0] || coord[1]) {
              var marker = L.marker(new L.LatLng(coord[0], coord[1])).bindPopup(hsp_info + type + contact_numbers + loc + last_updated_at + bed_info);
              mcg.addLayer(marker);
            }
          }
        } catch(err) {
          console.log(err);
        }
      }
    }, 2000);
  }
}
