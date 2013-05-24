/*******************************************************************
*
* File: searchFunctionProcessor.js
* Author: Kody Burg
* Date: 4/20/2012
* Description: This file handles the toggling of the search
*			   Overlay, and displays results from the UWO JSON feed.
*
********************************************************************/

var searchData = []; // global searchResults array
var idResults = [];  // global searchID array

function toggleSearchOverlay() {
	$(function () { //shows and hides the search overlay
		uwo.map.removeMarkerSet(uwo.map.searchMarkers);
		$('#searchResults').empty();
		$('#searchOverlay').toggle();
	}());
}

function searchMap()
{ // searches the map for entered string of text
	uwo.map.removeMarkerSet(uwo.map.searchMarkers);
	uwo.map.searchMarkers = [];
	textVar = $('input:text').val().trim();
	if (textVar == "")
	{
		$('#searchResults').append("Please enter a search term.");
	}
	else {
		$.getJSON(uwo.map.apiUrl+'2.0/map/search/'+textVar,function(searchData){
			$('#searchResults').append('<h3>Results</h3>');
			$('#searchResults').append('<br>');
			if (searchData === null) {
				$('#searchResults').append("No Results.");
			}
			else {
				for(var i = 0; i < searchData.length; i++) {
					$('#searchResults').append('<li id="'+searchData[i].id+'">'+ searchData[i].title +'</li>');
				}
				
				$("#searchResults li").click(function() {
				uwo.map.removeMarkerSet(uwo.map.searchMarkers);
				uwo.map.searchMarkers = [];
				var clickedID = this.id;
				getOverlayById(clickedID);
				});
			}
		});
	}
}

function getOverlayById(currentID) { // sends the clicked results data to the info overlay
	$.getJSON(uwo.map.apiUrl+'2.0/map/searchId/'+currentID,function(idResults){
		uwo.map.proccessSearchMarkers(idResults);
		overlayInit(idResults[0]);
	});
}