/**
 *	UWO Maps - Parking
 *	Author: Joel Herron
 *	@h3r2on
 *	version: 2.0
 *	Requires: Google Maps Javascript API v3
 *
 *	Modified on 4/20/2012 by Kody Burg	
 *
 */

(function() {
	
	//setup parking marker arrays
	uwo.map.parkingMarkers = [],
	uwo.map.disabilityMarkers = [],
	uwo.map.meterParkingMarkers = [];

	/**
	 * Make data call for Parking Lot markers
	 * Params {String} markerType
	 * Return
	 */
	uwo.map.getParkingMarkers = function()
	{
		var params = {
			type: 102
		};
		uwo.util.showLoading();
		$.ajax({
			url: uwo.map.apiUrl+'2.0/map/getmarkers?callback=?',
			cache: false,
			dataType: "jsonp",
			data: params,
			success: function(results){
				uwo.map.proccessParkingMarkers(results);
			},
			error: function (request, status, error) { alert(status + ", " + error); }
		});
	};
	
	/**
	 * Process Parking Lot markers
	 * Params {Object} results, {String} type
	 * Return
	 */
	uwo.map.proccessParkingMarkers = function(results)
	{
		var markers = results;
		
		var image;
	    var shadow = new google.maps.MarkerImage("http://m.uwosh.edu/api/beta/images/shadow-parking.png",
	        new google.maps.Size(39.0, 28.0),
	        new google.maps.Point(0, 0),
	        new google.maps.Point(12.0, 14.0)
	    );
		
		for (var key in markers) {
			uwo.map.createMarker(markers[key],image,shadow,uwo.map.parkingMarkers);
		}
				
		for (var marker in uwo.map.parkingMarkers) {
			if (uwo.map.parkingMarkers[marker]) {
				uwo.map.parkingMarkers[marker].setMap(uwo.map.map);
		    }
		}
				
		uwo.util.hideLoading();
	};

	/**
	 * Make data call for Disability Parking markers
	 * Params {String} markerType
	 * Return
	 */
	uwo.map.getDisabilityMarkers = function()
	{
		var params = {
			type: 103
		};
		uwo.util.showLoading();
		$.ajax({
			url: uwo.map.apiUrl+'2.0/map/getmarkers?callback=?',
			cache: false,
			dataType: "jsonp",
			data: params,
			success: function(results){
				uwo.map.proccessDisabilityMarkers(results);
			},
			error: function (request, status, error) { alert(status + ", " + error); }
		});
	};
	
	/**
	 * Process Disability Parking markers
	 * Params {Object} results, {String} type
	 * Return
	 */
	uwo.map.proccessDisabilityMarkers = function(results)
	{
		var markers = results;
		
		var image = new google.maps.MarkerImage("http://m.uwosh.edu/api/beta/images/disability.png",
	        new google.maps.Size(32.0, 37.0),
			new google.maps.Point(0, 0),
			new google.maps.Point(16.0, 18.0)
	    );
		var shadow = new google.maps.MarkerImage('http://m.uwosh.edu/api/beta/images/shadow.png',
			new google.maps.Size(51.0, 37.0),
			new google.maps.Point(0, 0),
			new google.maps.Point(16.0, 18.0)
		);
		
		for (var key in markers) {
			uwo.map.createMarker(markers[key],image,shadow,uwo.map.disabilityMarkers);
		}
				
		for (var marker in uwo.map.disabilityMarkers) {
			if (uwo.map.disabilityMarkers[marker]) {
				uwo.map.disabilityMarkers[marker].setMap(uwo.map.map);
		    }
		}
				
		uwo.util.hideLoading();
	};

	/**
	 * Make data call for Parking Lot markers
	 * Params {String} markerType
	 * Return
	 */
	uwo.map.getMeterParkingMarkers = function()
	{
		var params = {
			type: 104
		};
		uwo.util.showLoading();
		$.ajax({
			url: uwo.map.apiUrl+'2.0/map/getmarkers?callback=?',
			cache: false,
			dataType: "jsonp",
			data: params,
			success: function(results){
				uwo.map.proccessMeterParkingMarkers(results);
			},
			error: function (request, status, error) { alert(status + ", " + error); }
		});	
	};
	
	/**
	 * Process Parking Lot markers
	 * Params {Object} results, {String} type
	 * Return
	 */
	uwo.map.proccessMeterParkingMarkers = function(results)
	{
		var markers = results;
		
		var image = new google.maps.MarkerImage("http://m.uwosh.edu/api/beta/images/metered.png",
	        new google.maps.Size(32.0, 37.0),
			new google.maps.Point(0, 0),
			new google.maps.Point(16.0, 18.0)
	    );
		var shadow = new google.maps.MarkerImage('http://m.uwosh.edu/api/beta/images/shadow.png',
			new google.maps.Size(51.0, 37.0),
			new google.maps.Point(0, 0),
			new google.maps.Point(16.0, 18.0)
		);
		
		for (var key in markers) {
			uwo.map.createMarker(markers[key],image,shadow,uwo.map.meterParkingMarkers);
		}
				
		for (var marker in uwo.map.meterParkingMarkers) {
			if (uwo.map.meterParkingMarkers[marker]) {
				uwo.map.meterParkingMarkers[marker].setMap(uwo.map.map);
		    }
		}
				
		uwo.util.hideLoading();
	};	
}());

/**
 * onclick actions parking buttons
 */
$(function () {
	// Parking Actions
	$('#p-label').toggle(function () {
		// add polys
		if(uwo.map.platform === 'ios' || uwo.map.platform === 'desktop') {
			uwo.map.getPolygons('parking');
		}
		// add parking markers
		uwo.map.getParkingMarkers();
	},function () {
		// remove polys
		if(uwo.map.platform == 'ios' || uwo.map.platform === 'desktop') {
			for(var p=0; p<uwo.map.parkingPolys.length; p++) {
				uwo.map.parkingPolys[p].setMap(null);
			}
		}
		// remove parking markers
		uwo.map.removeMarkerSet(uwo.map.parkingMarkers);
	});
	
	$('#dp-label').toggle(function () {
		// add building Markers
		uwo.map.getDisabilityMarkers();	
	},function () {
		// remove building markers	
		uwo.map.removeMarkerSet(uwo.map.disabilityMarkers);
	});
	
	$('#mp-label').toggle(function () {
		// add building Markers
		uwo.map.getMeterParkingMarkers();	
	},function () {
		// remove building markers	
		uwo.map.removeMarkerSet(uwo.map.meterParkingMarkers);
	});
});