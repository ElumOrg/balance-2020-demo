$(document).ready(function()
{

        $('.collapse_filter').hide();
        if ("geolocation" in navigator){ //check geolocation available 
          //try to get user current location using getCurrentPosition() method
          navigator.geolocation.getCurrentPosition(function(position){ 
            console.log(position);
             console.log("Found your location <br />Lat : "+position.coords.latitude+" </br>Lang :"+ position.coords.longitude);
              var status = 'page-load';

              $('#hidden_latitude').val(position.coords.latitude);
              $('#hidden_longitude').val(position.coords.longitude);
              $('#hidden_selected_status').val(status);

              todayDate = (new Date()).toISOString().slice(0, 10);
              getEvents(todayDate,status);
          });
        }else{
          console.log("Browser doesn't support geolocation!");
        }
        

        $('#loader-div').hide();
        //getrecords on page load
        todayDate = (new Date()).toISOString().slice(0, 10);
        var status = 'page-load';
        $('#hidden_selected_status').val(status);

        getEvents(todayDate,status);
        var teacherName = $('#hidden_teacher_name').val();
        var classType = $('#hidden_class_type').val();
        arrClassType = [];


        var hidden_get_url_param = $('#hidden_get_url_param').val();

        if (hidden_get_url_param != '' ) {
          $(":checkbox[value="+hidden_get_url_param+"]").trigger('click');
        }

        var calendar = $('#calendar').fullCalendar({
            editable: false,
            selectable: true,
            disableDragging :true,
            eventSources:[
                    {
                        url: baseURL +'/live/classes/calender/getRecords-for-dots',
                        type: 'GET',
                        data:function() { // a function that returns an object
                            return {
                              teacherName:$('#hidden_teacher_name').val(),
                              classType:$('#hidden_class_type').val(),
                              class_tags:$('#hidden_tags').val()
                            };
                        },
                        color: '#65a9d7',    // an option!
                        textColor: '#3c3d3d',  // an option!
                        

                    },
                                 
            ],
            
            eventAfterAllRender:function() {
              var events = $('#calendar').fullCalendar('clientEvents');
              // console.log(events.backgroundColor);
            },

            viewRender: function (view, element) {
              console.log(view);
              // alert('here');
              if (view.intervalStart) {
                var selected_date = (new Date(view.intervalStart._d)).toISOString().slice(0, 10);
                var status = 'page-load';

                getEvents(selected_date,status);
              }
            },

            eventClick: function(info) {
              selected_date = info.start._i;
              var status = 'calendar-click';
              $('#hidden_selected_status').val(status);

              $(".fc-state-highlight").removeClass("fc-state-highlight");
              $(".fc-date-text-highlight").removeClass("fc-date-text-highlight");

              $('td').find("[data-date='" + selected_date + "']").addClass('fc-date-text-highlight');
              $('.fc-day[data-date="' + info.start.format('YYYY-MM-DD') + '"]').addClass("fc-state-highlight");

              getEvents(selected_date,status);
            },
            dayClick: function (date, allDay, jsEvent, view) {
                  var selected_date = (new Date(date)).toISOString().slice(0, 10);
                  $(".fc-state-highlight").removeClass("fc-state-highlight");
                  $(".fc-date-text-highlight").removeClass("fc-date-text-highlight");

                  if (selected_date != todayDate) {
                    $('td').find("[data-date='" + selected_date + "']").addClass('fc-date-text-highlight');  
                  }
                  // $('td').find("[data-date='" + selected_date + "']").addClass('fc-date-text-highlight');
                  $('.fc-day[data-date="' + date.format('YYYY-MM-DD') + '"]').addClass("fc-state-highlight");
             },
            select: function(start, end) {
              if (start) {
                var selected_date = (new Date(start._d)).toISOString().slice(0, 10);
                var status = 'calendar-click';
                $('#hidden_selected_status').val(status);

                getEvents(selected_date,status);
              }
            },
        });
        calendar.find('.fc-today-button').removeClass('fc-state-disabled');
        calendar.find('.fc-today-button').prop('disabled','');
        calendar.find('.fc-today-button').click(function(){
          var start = (new Date()).toISOString().slice(0, 10);
          var status = 'calendar-click';
          $('#hidden_selected_status').val(status);

          getEvents(start,status);
        })
});

function getLocation(){
    if ("geolocation" in navigator){ //check geolocation available 
          //try to get user current location using getCurrentPosition() method
          navigator.geolocation.getCurrentPosition(function(position){ 
            console.log(position);
             console.log("Found your location <br />Lat : "+position.coords.latitude+" </br>Lang :"+ position.coords.longitude);
              $('#hidden_latitude').val(position.coords.latitude);
              $('#hidden_longitude').val(position.coords.longitude);
          });
        }else{
          console.log("Browser doesn't support geolocation!");
        }
}

function getEvents(selected_date,status){
  $('#loader-div').show();

  if ($('#hidden_selected_view').val() == 'map') {
    getMapEvents(selected_date,status);
  }else{   
    $('#hidden_selected_date').val(selected_date);
    var teacherName = $('#hidden_teacher_name').val();
    var classType = $('#hidden_class_type').val();
    var latitude = $('#hidden_latitude').val();
    var longitude = $('#hidden_longitude').val();
    var v_zipcode = $('#v_zipcode').val();
    var v_city = $('#v_city').val();
    var v_state = $('#v_state').val();
    var v_miles = $('#v_miles').val();
    var class_tags = $('#hidden_tags').val();
    var hidden_iframe_teacher_id = $('#hidden_iframe_teacher_id').val();

    $.ajax({
      url: baseURL +'/live/classes/calender/getRecords',
      type: 'GET',
      data: {
              selected_date:selected_date,
              status:status,
              teacherName:teacherName,
              classType:classType,
              latitude:latitude,
              longitude:longitude,
              v_zipcode : v_zipcode,
              v_city : v_city,
              v_state : v_state,
              v_miles : v_miles,
              class_tags : class_tags,
              hidden_iframe_teacher_id:hidden_iframe_teacher_id
            },
      success: function (result) {
        if (result.status) {
          $('#calendar_events').show();
          $('#map_canvas').hide();
          $('#calendar_events').html(result.html);
          $('#loader-div').hide();
        } else {
          $('#calendar_events').show();
          $('#map_canvas').hide();
          $('#calendar_events').html(result.html);
          $('#loader-div').hide();
        }
      }
    });
  }
}


function getMapEvents(selected_date,status){
  $('#loader-div').show();

  $('#hidden_selected_date').val(selected_date);
  var teacherName = $('#hidden_teacher_name').val();
  var classType = $('#hidden_class_type').val();
  var latitude = $('#hidden_latitude').val();
  var longitude = $('#hidden_longitude').val();
  var v_zipcode = $('#v_zipcode').val();
  var v_city = $('#v_city').val();
  var v_state = $('#v_state').val();
  var v_miles = $('#v_miles').val();

  $.ajax({
    url: baseURL +'/online/clases/google-map',
    type: 'GET',
    data: {
            selected_date:selected_date,
            status:status,
            teacherName:teacherName,
            classType:classType,
            latitude:latitude,
            longitude:longitude,
            v_zipcode : v_zipcode,
            v_city : v_city,
            v_state : v_state,
            v_miles : v_miles
          },
    success: function (result) {
      if (result.status) {
        
        $('#data').val((result.arrLocation));
        $('#arrCountValue').val((result.arrCountValue));
        $('#calendar_events').hide();
        $('#loader-div').hide();
        $('#map_canvas').show();

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
            h:   '<b>Class Title:'+myArray[j].class_title+'</b>\nPrice: '+myArray[j].price+'',
            d:   '<a target="+blank" href="'+myArray[j].class_url+'"}}"><b style="font-size:14px">Class Title: '+myArray[j].class_title+'</b><br>Date-Time: '+myArray[j].date_time_for_event+'</a>'
          });

        }
        if (data != '') {
          window.mapData = data;
          funcDisplayMap();
        }
      } else {
        $('#calendar_events').show();
        $('#calendar_events').html(result.message);
        $('#loader-div').hide();
        $('#data').val('');
        $('#arrCountValue').val('');
        $('#map_canvas').hide();
      }
    }
  });
}



function getEventsSources(teacherName,classType){
  $('#loader-div').show();
  var teacherName = $('#hidden_teacher_name').val();
  var classType = $('#hidden_class_type').val();
  $.ajax({
    url: baseURL +'/live/classes/calender/getRecords-for-dots',
    type: 'GET',
    data: {teacherName:teacherName,classType:classType},
    success: function (result) {
      return result;
    }
  });
}

$("#tab_online_classes").on('click',function(){
  $("#tab_online_classes").addClass('active');
  $("#tab_workshop_classes").removeClass('active');
  $('#hidden_class_type').val('Online_Class');

  var selected_date =  $('#hidden_selected_date').val();
  // var status = 'calendar-click';
  var status = $('#hidden_selected_status').val();

  getEvents(selected_date,status);
  var teacherName = $('#hidden_teacher_name').val();
  var classType = $('#hidden_class_type').val();
});


$("#tab_workshop_classes").on('click',function(){
  $("#tab_workshop_classes").addClass('active');
  $("#tab_online_classes").removeClass('active');
  $('#hidden_class_type').val('In_Person');

  var selected_date =  $('#hidden_selected_date').val();
  // var status = 'calendar-click';
  var status = $('#hidden_selected_status').val();
  getEvents(selected_date,status);
  var teacherName = $('#hidden_teacher_name').val();
  var classType = $('#hidden_class_type').val()
   
})

$("input[name=checkbox_class_filter]").on('click',function(){
  var classtype = $(this).val();

  if(this.checked) {
    arrClassType.push(classtype);
    if (classtype == 'In_Person') {
      $('.collapse_filter').show();
      $('.list_map_tab_view').show();
      makeActiveTab();
      getLocation();
    }

    
  }else{
    if (classtype == 'In_Person') {
      $('.collapse_filter').hide();
      $('.list_map_tab_view').hide();
      $('#v_zipcode').val('');
      $('#v_city').val('');
      $('#v_state').val('');
    }
    arrClassType = jQuery.grep(arrClassType, function(value) {
        return value != classtype;
      });
  }

  $('#hidden_selected_view').val('list');
  $('#nav-map').removeClass('active');
  $('#nav-list').addClass('active');
  makeActiveTab();

  $("#tab_online_classes").addClass('active');
  $("#tab_workshop_classes").removeClass('active');
  $('#hidden_class_type').val(JSON.stringify(arrClassType));

  var selected_date =  $('#hidden_selected_date').val();
  // var status = 'calendar-click';
  var status = $('#hidden_selected_status').val();
  getEvents(selected_date,status);
  var teacherName = $('#hidden_teacher_name').val();
  var classType = $('#hidden_class_type').val();
});


$('#filetCLasses').on('click',function(){
   var selected_date =  $('#hidden_selected_date').val();
   // var status = 'calendar-click';
   var status = $('#hidden_selected_status').val();
   getEvents(selected_date,status);
});

$('#resetFiletCLasses').on('click',function(){
  $('#v_zipcode').val('');
  $('#v_city').val('');
  $('#v_state').val('');
  $('#v_miles').val('');
   var selected_date =  $('#hidden_selected_date').val();
   // var status = 'calendar-click';
   var status = $('#hidden_selected_status').val();
   getEvents(selected_date,status);
});



$('#nav-list').on('click',function(){
  $(this).addClass('active');
  $('#nav-map').removeClass('active');
  $('#hidden_selected_view').val('list');
  var selected_date =  $('#hidden_selected_date').val();
  // var status = 'calendar-click';
  var status = $('#hidden_selected_status').val();
  makeActiveTab();
  getEvents(selected_date,status);
});

$('#nav-map').on('click',function(){
  $(this).addClass('active');
  $('#nav-list').removeClass('active');
  $('#hidden_selected_view').val('map');
  var selected_date =  $('#hidden_selected_date').val();
  // var status = 'calendar-click';
  var status = $('#hidden_selected_status').val();
  makeActiveTab();
  getMapEvents(selected_date,status);
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

$(document).on('click','.listing_show_map',function(){

  $('.list_map_tab_view').show();
  $('#nav-map').addClass('active');
  $('#nav-list').removeClass('active');
  $('#hidden_selected_view').val('map');
  var selected_date =  $('#hidden_selected_date').val();
  var status = $('#hidden_selected_status').val();
  makeActiveTab();
  getMapEvents(selected_date,status);
})

function makeActiveTab(){
  var position = $("#tile-1 .nav-tabs a").parent().position();
  var width = $("#tile-1 .nav-tabs a").parent().width();
      $("#tile-1 .slider").css({"left":+ position.left,"width":width});
   var actWidth = $("#tile-1 .nav-tabs").find(".active").parent("li").width();
   var actPosition = $("#tile-1 .nav-tabs .active").position();
   $("#tile-1 .slider").css({"left":+ actPosition.left,"width": actWidth});
   return true;
}