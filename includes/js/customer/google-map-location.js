$(document).ready(function() {
	  var latitude = $('input[name="lat"]').val();
	  var longitude = $('input[name="lng"]').val();
	  var map_data =  $('input[name="data"]').val();

    if ($('input[name="arrCountValue"]').val() != '') {
	     var arrCountValue =  jQuery.parseJSON($('input[name="arrCountValue"]').val());
    }

    var myArray = [];
    if ($('input[name="data"]').val() != '') {
	     var myArray = jQuery.parseJSON(map_data);
    }

	  var data = [];
	  var clusterSizes = arrCountValue; 
    if (myArray.length > 0) {
  		for (var j = 0; j < myArray.length ; j ++) data.push({
  		  lon: myArray[j].lng,
  		  lat: myArray[j].lat,
  		  h:   '<b>Class Title:'+myArray[j].class_title+'\n</b>Price: '+myArray[j].price+'',
  		  d:   '<a target="+blank" href="'+myArray[j].class_url+'"}}">Class Title: '+myArray[j].class_title+'<br>Price: '+myArray[j].price+'</a>'
  		});

    }
	 // }

  console.log('test=>' + data);
  if (data != '') {
	  window.mapData = data;
    window.onload  = funcDisplayMap();
  }
});

//Display map
function funcDisplayMap() {
      var gm = google.maps;
			var latitude = $('input[name="lat"]').val();
		 	var longitude = $('input[name="lng"]').val();
      var map = new gm.Map(document.getElementById('map_canvas'), {
        mapTypeId: gm.MapTypeId.ROAD,
        center: new gm.LatLng(latitude, longitude),
				zoom: 13,  // whatevs: fitBounds will override
        scrollwheel: true
      });
      var iw = new gm.InfoWindow();
      var oms = new OverlappingMarkerSpiderfier(map,
        {markersWontMove: true, markersWontHide: true});

      var usualColor = 'E74C3C';
      var spiderfiedColor = 'FF7F00';
      var iconWithColor = function(color) {
        return 'https://chart.googleapis.com/chart?chst=d_map_xpin_letter&chld=pin|+|' +
          color + '|000000|ffff00';
      }
      var shadow = new gm.MarkerImage(
        'https://www.google.com/intl/en_ALL/mapfiles/shadow50.png',
        new gm.Size(37, 34),  // size   - for sprite clipping
        new gm.Point(0, 0),   // origin - ditto
        new gm.Point(10, 34)  // anchor - where to meet map location
      );

      oms.addListener('click', function(marker) {
        iw.setContent(marker.desc);
        iw.open(map, marker);
      });
      oms.addListener('spiderfy', function(markers) {
        for(var i = 0; i < markers.length; i ++) {
          markers[i].setIcon(iconWithColor(spiderfiedColor));
          markers[i].setShadow(null);
        }
        iw.close();
      });
      oms.addListener('unspiderfy', function(markers) {
        for(var i = 0; i < markers.length; i ++) {
          markers[i].setIcon(iconWithColor(usualColor));
          markers[i].setShadow(shadow);
        }
      });

      var bounds = new gm.LatLngBounds();
      for (var i = 0; i < window.mapData.length; i ++) {
        var datum = window.mapData[i];
        var loc = new gm.LatLng(datum.lat, datum.lon);
        bounds.extend(loc);
        var marker = new gm.Marker({
          position: loc,
          title: datum.h,
          map: map,
          icon: iconWithColor(usualColor),
          shadow: shadow
        });
        marker.desc = datum.d;
        oms.addMarker(marker);
      }
			map.fitBounds(bounds);
			// map.setZoom(13);
			zoomChangeBoundsListener = 
			    google.maps.event.addListenerOnce(map, 'bounds_changed', function(event) {
			        if (this.getZoom()){
			            this.setZoom(10);
			        }
			});

      // for debugging/exploratory use in console
      window.map = map;
      window.oms = oms;
}