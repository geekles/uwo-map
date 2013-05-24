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

/*
 * initialize namespace
 */
var uwo = {};
jQuery.support.cors = true;
(function() {

  uwo.map = {};
  // vars
  uwo.map.buildingPolys = [],
  uwo.map.parkingPolys = [],
  uwo.map.sportPolys = [],
  uwo.map.platform = "",
  uwo.map.baseUrl = "";
  uwo.map.apiUrl = "http://m.uwosh.edu/api/beta/";

  /**
   * create a marker but don't add to map
   * Params {Object} data, {String} type
   * Return
   */
  uwo.map.createMarker = function(data, image, shadow, markerArray)
  {
    var posn = new google.maps.LatLng(data.lat,data.lng);

    var title = data.title;

    if(data.typeId === '102') {
      var image = new google.maps.MarkerImage("http://m.uwosh.edu/api/beta/images/parking"+data.acronym+".png",
            new google.maps.Size(24.0, 28.0),
            new google.maps.Point(0, 0),
            new google.maps.Point(12.0, 14.0)
        );
    }

    if(data.pan === 'y') {
      var image = new google.maps.MarkerImage("http://m.uwosh.edu/api/beta/images/buildings-p.png",
            new google.maps.Size(32.0, 37.0),
            new google.maps.Point(0, 0),
            new google.maps.Point(16.0, 18.0)
        );
    }

    var markerOptions = {
      position: posn,
      title: title,
      shadow: shadow,
      icon: image
    };

    var marker = new google.maps.Marker(markerOptions);

    if(data.typeId === '101') {

      var infoWindow = new google.maps.InfoWindow({
        content: data.title
      });

      // add event handler here
      google.maps.event.addListener(marker,'click',function(){
        overlayInit(data);
        /* infoWindow.open(uwo.map.map,marker); */
      });
    }

    markerArray.push(marker);
  };

  /**
   * Remove markers from the map
   * Params {String} markerType
   * Return
   */
  uwo.map.removeMarkerSet = function(markerArray)
  {
    for (var marker in markerArray) {
      if (markerArray[marker]) {
        markerArray[marker].setMap(null);
        }
    }
  };

  /**
   * create a polygon but don't add it to the map
   * Params {Object} data, {String} type
   * Return
   */
  uwo.map.createPolygon = function(data,type)
  {
    var pts = [];

    for(var i=0; i<data.points.length; i++){
      var point = new google.maps.LatLng(data.points[i].lat, data.points[i].lng);
      pts.push(point);
    }

    var poly = new google.maps.Polygon({
      paths: pts,
      strokeColor: data.fill,
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor: data.fill,
      fillOpacity: 0.65
    });

    switch(type)
    {
      case 'building':
        uwo.map.buildingPolys.push(poly);
        break;

      case 'parking':
        uwo.map.parkingPolys.push(poly);
        break;

      case 'sports':
        uwo.map.sportPolys.push(poly);
        break;
    }

  };

  /**
   * Proccess the returned polygons
   * Params {Object} polys, {String} type
   * Return
   */
  uwo.map.proccessPolygons = function(polys,type)
  {
    for(var polygon in polys) {
      if(polys[polygon]) {
        uwo.map.createPolygon(polys[polygon],type);
      }
    }

    switch(type)
    {
      case 'building':
        for(var bPoly in uwo.map.buildingPolys) {
          uwo.map.buildingPolys[bPoly].setMap(uwo.map.map);
        }
        break;

      case 'parking':
        for(var i=0; i<uwo.map.parkingPolys.length; i++) {
          uwo.map.parkingPolys[i].setMap(uwo.map.map);
        }
        break;

      case 'sports':
        for(var i=0; i<uwo.map.sportPolys.length; i++) {
          uwo.map.sportPolys[i].setMap(uwo.map.map);
        }
        break;
    }
  };

  /**
   * start the AJAX call for polygons
   * Params {String} type
   * Return
   */
  uwo.map.getPolygons = function(type)
  {
    var params = {
      type: type
    };
    $.ajax({
      url: uwo.map.apiUrl+'2.0/map/getpolygons?callback=?',
      cache: false,
      dataType: "jsonp",
      data: params,
      success: function(results){
        uwo.map.proccessPolygons(results,type);
      },
      error: function (request, status, error) { alert(status + ", " + error); }
    });
    /*
    $.getJSON(uwo.map.apiUrl+'2.0/map/getpolygons',params,function(results){
      uwo.map.proccessPolygons(results,type);
    });
    */
  };

  /**
   * Sets the base Polygons based on platform
   */
  uwo.map.setBasePolygons = function()
  {
    if(uwo.map.platform == 'ios' || uwo.map.platform == 'desktop') {
      uwo.map.getPolygons('building');
      uwo.map.getPolygons('sports');
    }
  };

  /**
   * Location Namespace
   */
  uwo.location = {};

  uwo.location.currentLat;
  uwo.location.currentLng;
  uwo.location.userLocation = {};
  uwo.location.userMarker ={};
  uwo.location.wpid = false;

  uwo.location.getUserLocation = function()
  {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(uwo.location.initialPositionSuccess, uwo.location.positionError,{maximumAge:30000});

    } else if (google.gears) {
        var geo = google.gears.factory.create('beta.geolocation');
        geo.getCurrentPosition(uwo.location.initialPositionSuccess, uwo.location.positionError);

    } else {
      // Browser doesn't support Geolocation
      uwo.location.positionError(-1);
    }
  };

  uwo.location.initialPositionSuccess = function(position)
  {
    var coords = position.coords || position.coordinate || position;
    uwo.location.userLocation = new google.maps.LatLng(coords.latitude,coords.longitude);
  }

  uwo.location.getAppPosition = function() {
    uwo.location.userLocation = google.maps.LatLng(uwo.location.currentLat, uwo.location.currentLng);
  }

  uwo.location.positionError = function(err)
  {
    var msg;
    switch(err.code) {
        case err.UNKNOWN_ERROR:
          msg = "Unable to find your location";
          break;
        case err.PERMISSION_DENIED:
          msg = "Permission denied in finding your location";
          break;
        case err.POSITION_UNAVAILABLE:
          msg = "Your location is currently unknown";
          break;
        case err.BREAK:
          msg = "Attempt to find location took too long";
          break;
        default:
          msg = "Location detection not supported in browser";
      }
      $('#info').val(msg);
  };

  uwo.map.setUserPosition = function()
  {
    var bounds = uwo.map.map.getBounds();
    if(bounds.contains(uwo.location.userLocation)) {
      // create location marker
      if(uwo.location.wpid !== false) {
        uwo.location.userMarker.setPosition(uwo.location.userLocation);
      } else {
        var image = new google.maps.MarkerImage('http://m.uwosh.edu/api/beta/images/user.png',
          new google.maps.Size(32.0, 37.0),
          new google.maps.Point(0, 0),
          new google.maps.Point(16.0, 18.0)
          );
        var shadow = new google.maps.MarkerImage('http://m.uwosh.edu/api/beta/images/shadow.png',
          new google.maps.Size(51.0, 37.0),
          new google.maps.Point(0, 0),
          new google.maps.Point(16.0, 18.0)
        );
        uwo.location.userMarker = new google.maps.Marker({
          map: uwo.map.map,
          position: uwo.location.userLocation,
          title: 'current location',
          icon: image,
          shadow: shadow
        });
        //map.setCenter(uwo.location.userLocation);
      }
    }
  };

  /**
   * namespace for utility functions
   * Utilities
   */
  uwo.util = {};

  uwo.util.getWindowHeight = function()
  {
      return $(window).height();
  };

  uwo.util.getWindowWidth = function()
  {
      return $(window).width();
  };

  /**
   * Parses the current url and breaks it into its parts
   * @param {Object} url
   * @return {Object} params
   */
  uwo.util.parseUrl = function(url)
  {
      if (!url) url = location.href;
      if (url.substring(url.length -1) == '#') url = url.substring(0, url.length -1);
      var query = decodeURI(url.substr(url.lastIndexOf('?')+1));
      var params_array = query.split('&');

      var params = [];
      for (var i in params_array) {
          var key = params_array[i].substring(0, params_array[i].indexOf('='));
          var value = params_array[i].substring(params_array[i].indexOf('=')+1);

          // if the parameter is an array
          if (key.indexOf('[]', 1) > 0 && value != 'undefined' && value) {
              key = key.replace('[]', '');
              if (!params[key]) params[key] = [];
                  params[key].push(value);
          }
          else {
              if (value != 'undefined' && value)
                  params[key] = value;
          }
      }
      return params;
  };

  uwo.util.checkUrl = function()
  {
    var params = uwo.util.parseUrl();
    var id = params['id'];
    var office = params['search'];
    uwo.location.currentLat = params['lat'] || 0.0;
    uwo.location.currentLng = params['lng'] || 0.0;

    if(id) return uwo.map.idSearch(id);
    if (office) return uwo.map.officeSearch(office,'building');
  };

  uwo.util.showLoading = function() {
    $("#loading").show();
  };

  uwo.util.hideLoading = function() {
    $("#loading").hide();
  };

  /**
   * Gets the windowHeight and then reassigns the map size
   */
  uwo.map.resizeMap = function()
  {
      var offset = 0;
      for (var elem = $("#map_canvas")[0]; elem !== null; elem = elem.offsetParent) {
          offset += elem.offsetTop;
      }
      var windowHeight = uwo.util.getWindowHeight();
      var height = windowHeight - offset;
      if (height >= 0) {
          $("#map_canvas").css('height', height+'px');
      }
  };


  /**
   * base startup functions
   */
  uwo.map.setupMap = function()
  {
    $(window).resize(uwo.map.resizeMap);
    var uwoCenter = new google.maps.LatLng(44.0253,-88.551);
    var uwoOptions = {
      zoom: 16,
      maxZoom: 19,
      minZoom: 15,
      center: uwoCenter,
      streetViewControl: false,
      mapTypeControl: true,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.ROADMAP]
      },
      mapTypeId: google.maps.MapTypeId.SATELLITE
    };
    uwo.map.map = new google.maps.Map($("#map_canvas")[0], uwoOptions);

    // check url for platform
    uwo.util.checkUrl();

    //get user position
    /*
    if(uwo.map.platform === 'ios' || uwo.map.platform === 'android') {
      uwo.location.getAppPosition();
    } else {
      uwo.location.getUserLocation();
    }

    // set listener of map tileload
    google.maps.event.addListener(uwo.map.map, 'tilesloaded', function() {
      uwo.map.setUserPosition();
    });
    */
  };

  uwo.map.startUp = function()
  {
    uwo.map.resizeMap();
    uwo.map.setupMap();
  };

}());
