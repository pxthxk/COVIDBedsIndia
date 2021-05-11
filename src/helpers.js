function hspName(name, loc) {
	return(
		"<h6>" + name + "<a href=" + loc + " target='_blank'><i class='icon-map-marker'></i></a></h6>"
	);
}

function bedDetails(bedType, bedTypeTotalOrOccupied, bedTypeAvailable, total=true) {
	return(
		"<div class='container'><div class='row'><div class='col-5'><b>" + bedType + "</b></div><div class='col-7'>" + 
		(bedTypeTotalOrOccupied ? "<span class='badge " + (total ? "badge-primary" : "badge-warning") + "'>" + (total ? "Total: " : "Occupied: ") + bedTypeTotalOrOccupied + "</span>" : "") +
		(bedTypeAvailable ? "<span class='badge badge-success'>Available: " + bedTypeAvailable + "</span>" : "") +
		"</div></div></div>"
	);
}

function contactInfo(contactNumber) {
	return(
		"<a href='tel:" + contactNumber + "'>" + contactNumber + "</a>"
	);
}
