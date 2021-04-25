class Haryana {
  populate(mcg) {
    for(var i in haryana_data) {
      if((haryana_data[i]["LAT"] != 0) && (haryana_data[i]["LONG"] != 0)) {
        var coord = [haryana_data[i]["LAT"], haryana_data[i]["LONG"]];

        var hspInfo = haryana_data[i]["HOSPITAL_INFO"] + "<br>";
        var last_updated_at = haryana_data[i]["LAST_UPDATED"] + "<br><br>";
        
        var marker = L.marker(new L.LatLng(coord[0], coord[1])).bindPopup(last_updated_at + hspInfo);
        mcg.addLayer(marker);
      }
    }
  }
}
