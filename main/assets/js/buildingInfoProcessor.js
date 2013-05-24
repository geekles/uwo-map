/*******************************************************************
*
* File: buildingInfoProcessor.js
* Author: Kody Burg
* Date: 4/20/2012
* Description: This file handles the toggling of the building
*        info Overlay, and contained information from
*          the UWO JSON feed.
*
********************************************************************/

    function toggleOverlay() {
      $(function () { // shows and hides the info overlay
        $('#overlay').toggle();
      }());
    }
    function overlayInit(data)
    { // accepts incoming data array, passes it to the overlay
      displayInfo(data.title, data.image, data.panorama, data.description, data.address);
    }
    function displayInfo(title, image, panorama, description, address) { // construct and display the data
      document.getElementById('buildingTitle').innerHTML = title;
      document.getElementById('buildingTitle2').innerHTML = title;
      document.getElementById('overlayContentImage').innerHTML = '<img src="'+ image +'">';
      //if (panorama !=="#") {
      document.getElementById('360panorama').innerHTML = '<a href="'+ panorama +'" target="_blank">' + '360 Panorama' + '</a>';
      //}
      if (panorama =="#") {
        document.getElementById('360panorama').innerHTML = '';
      }
      document.getElementById('overlayAbout').innerHTML = '<u>About this Building</u>';
      document.getElementById('buildingInfo').innerHTML = description;
      document.getElementById('address1').innerHTML = address;
      document.getElementById('address2').innerHTML = 'Oshkosh, WI 54901';
      toggleOverlay();
    }