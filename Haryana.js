class Haryana {
  populate(mymap) {
    for(var i in haryana_data) {
      if((haryana_data[i]["LAT"] != 0) && (haryana_data[i]["LONG"] != 0)) {
        var coord = [haryana_data[i]["LAT"], haryana_data[i]["LONG"]];

        var hspInfo = "<b>" + haryana_data[i]["HOSPITAL_NAME"].replace(/Facility Name: /g,'') + "</b><br>";
        var contact = haryana_data[i]["CONTACT"] + "<br>";
        var last_updated_at = haryana_data[i]["LAST_UPDATED"] + "<br><br>";
        var bed_avail = haryana_data[i]["BED_AVAILABILITY"] + "<br>";
        
        var marker = L.marker([coord[0], coord[1]]).addTo(mymap).bindPopup(hspInfo + contact + last_updated_at + bed_avail).openPopup();
      }
    }
  }
}
