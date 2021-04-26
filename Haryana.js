class Haryana {
  populate(mcg) {
    for(var i in haryana_data) {
      if((haryana_data[i]["LAT"] != 0) && (haryana_data[i]["LONG"] != 0)) {
        var coord = [haryana_data[i]["LAT"], haryana_data[i]["LONG"]];

        var hspInfo = "<b>" + haryana_data[i]["HOSPITAL_INFO"].split("\n")[0].split("Contact Number :")[0].split("Facility Name: ")[1] + "</b><br>";
        var contact = "Contact: " + haryana_data[i]["HOSPITAL_INFO"].split("\n")[0].split("Contact Number :")[1] + "<br><br>";
        var last_updated_at = haryana_data[i]["LAST_UPDATED"] + "<br><br>";
        var bed_avail = haryana_data[i]["HOSPITAL_INFO"].split(haryana_data[i]["HOSPITAL_INFO"].split("\n")[0])[1];
        
        var marker = L.marker(new L.LatLng(coord[0], coord[1])).bindPopup(hspInfo + contact + last_updated_at + bed_avail);
        mcg.addLayer(marker);
      }
    }
  }
}
