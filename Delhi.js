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
    return "<a href=" + gnctd_covid_facilities_data[hsp_name]["location"] + " target='_blank'>Click for Google Maps</a><br>";
  }

  // private or govt
  hsp_type(hsp_name) {
    for(var j in gnctd_covid_data) {
        if(gnctd_covid_data[j][hsp_name]){
          return gnctd_covid_data[j][hsp_name]["type"] + "<br>";
      }
    }
    return "";
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
        if(gnctd_covid_facilities_data[hsp_name]["location"]) {
          if(gnctd_covid_facilities_data[hsp_name]["location"].split("/")[6].split(",").length == 3) {
            return gnctd_covid_facilities_data[hsp_name]["location"].split("/")[6].replace("@", "").split(",");
          } else {
            return gnctd_covid_facilities_data[hsp_name]["location"].split("/")[7].replace("@", "").split(",");
          }
        } else {
          if(hsp_name in missing_delhi_hsp_location) {
            if(missing_delhi_hsp_location[hsp_name].split("/")[6].split(",").length == 3) {
              return missing_delhi_hsp_location[hsp_name].split("/")[6].replace("@", "").split(",");
            } else {
              return missing_delhi_hsp_location[hsp_name].split("/")[7].replace("@", "").split(",");
            }
          } else {
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

  populate(mymap){

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicHh0aHhrIiwiYSI6ImNrbnN0cHE2bTA3cGoycXBkajNuMnV5bTQifQ.si6acX_-tJGxBIiQWrHHCQ', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'pk.eyJ1IjoicHh0aHhrIiwiYSI6ImNrbnN0cHE2bTA3cGoycXBkajNuMnV5bTQifQ.si6acX_-tJGxBIiQWrHHCQ'
        }).addTo(mymap);

    $.getJSON('https://coronabeds.jantasamvad.org/covid-facilities.js?callback=?', function(data) {
      gnctd_covid_facilities_data = data;
    });
    $.getJSON('https://coronabeds.jantasamvad.org/covid-info.js?callback=?', function(data) {
      gnctd_covid_data = data;
    });

    setTimeout(function() {

    for(var i in gnctd_covid_facilities_data) {
      var hsp = new DelhiHospital(i);
      var coord = hsp.coord(i);
      var hsp_info = "<b>" + i + "</b><br>";
      var contact_numbers = hsp.contact(i);
      var loc = hsp.location(i);
      var bed_info = hsp.bed_info(i);
      var type = hsp.hsp_type(i);
      var last_updated_at = hsp.last_updated_at(i);

      var marker = L.marker([coord[0], coord[1]]).addTo(mymap).bindPopup(hsp_info + type + contact_numbers + loc + last_updated_at + bed_info).openPopup();
    }
    }, 2000);
  }

}