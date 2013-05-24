/**
 *  UWO Maps
 *  Author: Joel Herron
 *  @h3r2on
 *  version: 2.0
 *  Requires: Google Maps Javascript API v3
 *
 *  Modified on 4/20/2012 by Kody Burg
 *
 */

(function() {
  uwo.map.buildingMarkers = [],
  uwo.map.dEntryMarkers = [],
  uwo.map.emergMarkers = [];
  uwo.map.searchMarkers = [];

  /**
   * Make data call for Building markers
   * Params {String} markerType
   * Return
   */
  uwo.map.getBuildingMarkers = function()
  {
    var params = {
      type: 101
    };
    uwo.util.showLoading();
    $.ajax({
      url: uwo.map.apiUrl+'2.0/map/getmarkers?callback=?',
      cache: false,
      dataType: "jsonp",
      data: params,
      success: function(results){
        uwo.map.proccessBuildingMarkers(results);
      },
      error: function (request, status, error) { alert(status + ", " + error); }
    });
  };

  /**
   * Process Building markers
   * Params {Object} results, {String} type
   * Return
   */
  uwo.map.proccessBuildingMarkers = function(results)
  {
    var markers = results;

    var image = new google.maps.MarkerImage('http://m.uwosh.edu/api/beta/images/buildings.png',
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
      uwo.map.createMarker(markers[key],image,shadow,uwo.map.buildingMarkers);
    }

    for (var marker in uwo.map.buildingMarkers) {
      if (uwo.map.buildingMarkers[marker]) {
        uwo.map.buildingMarkers[marker].setMap(uwo.map.map);
        }
    }

    uwo.util.hideLoading();
  };

  uwo.map.getAcademicsMarkers = function()
  {
    var params = {
      type: 101
    };
    uwo.util.showLoading();
    $.ajax({
      url: uwo.map.apiUrl+'2.0/map/getmarkers?callback=?',
      cache: false,
      dataType: "jsonp",
      data: params,
      success: function(results){
        uwo.map.proccessBuildingMarkers(results);
      },
      error: function (request, status, error) { alert(status + ", " + error); }
    });
  };

  /**
   * Process Building markers
   * Params {Object} results, {String} type
   * Return
   */
  uwo.map.proccessAcademicsMarkers = function(results)
  {
    var markers = results;

    var image = new google.maps.MarkerImage('http://m.uwosh.edu/api/beta/images/buildings.png',
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
      uwo.map.createMarker(markers[key],image,shadow,uwo.map.buildingMarkers);
    }

    for (var marker in uwo.map.buildingMarkers) {
      if (uwo.map.buildingMarkers[marker]) {
        uwo.map.buildingMarkers[marker].setMap(uwo.map.map);
        }
    }

    uwo.util.hideLoading();
  };
  /**
   * Make data call for Disability Entrance markers
   * Params {String} markerType
   * Return
   */
  uwo.map.getDEntryMarkers = function()
  {
    var params = {
      type: 106
    };
    uwo.util.showLoading();
    $.ajax({
      url: uwo.map.apiUrl+'2.0/map/getmarkers?callback=?',
      cache: false,
      dataType: "jsonp",
      data: params,
      success: function(results){
        uwo.map.proccessDEntryMarkers(results);
      },
      error: function (request, status, error) { alert(status + ", " + error); }
    });
  };

  /**
   * Process Disability Entrance markers
   * Params {Object} results, {String} type
   * Return
   */
  uwo.map.proccessDEntryMarkers = function(results)
  {
    var markers = results;

    var image = new google.maps.MarkerImage("http://m.uwosh.edu/api/beta/images/entry.png",
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
      uwo.map.createMarker(markers[key],image,shadow,uwo.map.dEntryMarkers);
    }

    for (var marker in uwo.map.dEntryMarkers) {
      if (uwo.map.dEntryMarkers[marker]) {
        uwo.map.dEntryMarkers[marker].setMap(uwo.map.map);
        }
    }

    uwo.util.hideLoading();
  };

  /**
   * Make data call for Emergency Phone markers
   * Params {String} markerType
   * Return
   */
  uwo.map.getEmergMarkers = function()
  {
    var params = {
      type: 105
    };
    uwo.util.showLoading();
    $.ajax({
      url: uwo.map.apiUrl+'2.0/map/getmarkers?callback=?',
      cache: false,
      dataType: "jsonp",
      data: params,
      success: function(results){
        uwo.map.proccessEmergMarkers(results);
      },
      error: function (request, status, error) { alert(status + ", " + error); }
    });
  };

  /**
   * Process Disability Entrance markers
   * Params {Object} results, {String} type
   * Return
   */
  uwo.map.proccessEmergMarkers = function(results)
  {
    var markers = results;

    var image = new google.maps.MarkerImage("http://m.uwosh.edu/api/beta/images/bluephone.png",
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
      uwo.map.createMarker(markers[key],image,shadow,uwo.map.emergMarkers);
    }

    for (var marker in uwo.map.emergMarkers) {
      if (uwo.map.emergMarkers[marker]) {
        uwo.map.emergMarkers[marker].setMap(uwo.map.map);
        }
    }

    uwo.util.hideLoading();
  };

  /**
   * start the AJAX call for office location search
   * Params {String} officeLocation, {String} markerType
   * Return
   */
  uwo.map.officeSearch = function(officeLocation,type)
  {
    var q = officeLocation.split(" ");
    uwo.util.showLoading();
    $.ajax({
      url: uwo.map.apiUrl+'2.0/map/search?callback=?'+q[0],
      cache: false,
      dataType: "jsonp",
      success: function(results){
        uwo.map.proccessSearchMarkers(results);
      },
      error: function (request, status, error) { alert(status + ", " + error); }
    });
  };

  /**
   * start the AJAX call for markers
   * Params {String} markerType
   * Return
   */
  uwo.map.idSearch = function(id)
  {

    uwo.util.showLoading();
    $.ajax({
      url: uwo.map.apiUrl+'2.0/map/searchId?callback=?'+id,
      cache: false,
      dataType: "jsonp",
      success: function(results){
        uwo.map.proccessSearchMarkers(results);
      },
      error: function (request, status, error) { alert(status + ", " + error); }
    });
  };

  /**
   * Process returned markers
   * Params {Object} results, {String} type
   * Return
   */
  uwo.map.proccessSearchMarkers = function(results)
  {
    var markers = results;

    var image = new google.maps.MarkerImage("http://m.uwosh.edu/api/beta/images/search.png",
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
      uwo.map.createMarker(markers[key],image,shadow,uwo.map.searchMarkers);
    }

    for (var marker in uwo.map.searchMarkers) {
      if (uwo.map.searchMarkers[marker]) {
        uwo.map.searchMarkers[marker].setMap(uwo.map.map);
        }
    }

    uwo.util.hideLoading();
  }

  /**
   * Remove markers from the map
   * Params {String} markerType
   * Return
   */
  uwo.map.removeSearchMarkers = function()
  {
    // remove the markers
    for (var marker in uwo.map.searchMarkers) {
      if (uwo.map.searchMarkers[marker]) {
        uwo.map.searchMarkers[marker].setMap(null);
        }
    }
    //clear out the array
    uwo.map.searchMarkers = 0;
  }
}());

/**
 * onclick actions for buttons bar
 */
$(function () {

  $('#b-label').toggle(function () {
    // add building Markers
    uwo.map.getBuildingMarkers();
  },function () {
    // remove building markers
    uwo.map.removeMarkerSet(uwo.map.buildingMarkers);
  });

  $('#de-label').toggle(function () {
    // add building Markers
    uwo.map.getDEntryMarkers();
  },function () {
    // remove building markers
    uwo.map.removeMarkerSet(uwo.map.dEntryMarkers);
  });

  $('#e-label').toggle(function () {
    // add building Markers
    uwo.map.getEmergMarkers();
  },function () {
    // remove building markers
    uwo.map.removeMarkerSet(uwo.map.emergMarkers);
  });
  // set base poygons
  uwo.map.setBasePolygons();

});
