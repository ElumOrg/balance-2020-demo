$(document).ready(function()
{

        



        $('#loader-div').hide();
        //getrecords on page load
        todayDate = (new Date()).toISOString().slice(0, 10);
        var status = 'page-load';
        getEvents(todayDate,status);
        
        $('#calendar').fullCalendar({
            editable: false,
            // eventLimit: true, // allow "more" link when too many events
            selectable: true,
            disableDragging :true,
            eventSources:[
                    {
                        url: baseURL +'/customer/dashboard/calender/getRecords-for-dots',
                        type: 'GET',
                        data:{},
                        color: '#65a9d7',    // an option!
                        textColor: '#3c3d3d',  // an option!
                        

                    }                    
            ],
            
            eventAfterAllRender:function() {
              var events = $('#calendar').fullCalendar('clientEvents');
              // console.log(events.backgroundColor);
            },

            eventClick: function(info) {
              selected_date = info.start._i;
              var status = 'calendar-click';

              $(".fc-state-highlight").removeClass("fc-state-highlight");
              $(".fc-date-text-highlight").removeClass("fc-date-text-highlight");

              $('td').find("[data-date='" + selected_date + "']").addClass('fc-date-text-highlight');
              $('.fc-day[data-date="' + info.start.format('YYYY-MM-DD') + '"]').addClass("fc-state-highlight");

              getEvents(selected_date,status);
            },
            // eventRender: function(event, element) {
            //   console.log(element);
            //   if(event.backgroundColor == '#BCE4FD'){
            //       element.addClass('dot-dot');
            //   }
            //    var nextEventLeft = element.offset().left + element.width() + 5;
            //     element.parent().children().eq(element.index()+1).css('left',nextEventLeft);
            // },
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

                getEvents(selected_date,status);
              }
            },
        });
});

function getEvents(selected_date,status){
  $('#loader-div').show();
  $.ajax({
    url: baseURL +'/customer/dashboard/calender/getRecords',
    type: 'GET',
    data: {selected_date:selected_date,status:status},
    success: function (result) {
      if (result.status) {

        // console.log((result.eventData).length);
        // var obj = result.eventData;
        // var contentHtml = '';
        // $.each(obj, function(key,value) {
        //   // alert(value.event_title);
        //   contentHtml += '<div class="row"><div class="col-md-12">';
        //   contentHtml += '<div class="col-md-2"><img class = "cal-img" src="'+value.event_banner+'"></div>';
        //   contentHtml += '<div class="col-md-6"><span>"'+value.event_title+'"</span></div>';
        //   contentHtml += '<div class="col-md-4"><a href="'+baseURL+'/liveclass/'+'">Enroll Now</a> </div>';
        //   contentHtml += '</div></div>';
        // });
        // $('#calendar_events').html(contentHtml);
        $('#calendar_events').html(result.html);
        $('#loader-div').hide();
        showCountDown();
      } else {
        $('#calendar_events').html(result.html);
        $('#loader-div').hide();
      }
    }
  });
}

function showCountDown(){  
    $('[data-countdown]').each(function(event) {
        // alert();
        var $this = $(this),
        finalDate = $(this).data('countdown');
        var pre_recorded_flag = $(this).data('prerecorded');

        $this.countdown(finalDate, function(event) {
                $('#zoom-class-notification').hide();
                $this.html(' ' + event.strftime('%D days %H:%M:%S'))
                if (event.strftime('%-D') == 0 && event.strftime('%-M') <= 0 && event.strftime('%-H') == 0) {
                  $('#session-start-line').hide();
                  $('#zoom-class-notification').show();
                    $('#zoom-class-notification-link').attr("href", $(this).data('zoom-url'));
                    $this.html('Join Now');
                }
            })
            .on('update.countdown', function(event) {
                if (event.elapsed) { // Either true or false
                    // alert('yey');
                } else {
                    var remainingMinutes = event.strftime('%-M');
                    var remainingHours = event.strftime('%-H');
                    $('#zoom-class-notification').hide();

                    // console.log(remainingMinutes);
                    if (event.strftime('%-D') == 0 && remainingMinutes <= 0 && remainingHours == 0) {
                      $('#session-start-line').hide();
                      $('#zoom-class-notification').show();
                        $('#zoom-class-notification-link').attr("href", $(this).data('zoom-url'));
                        $this.html('Join Now');
                    }
                }
            }).on('finish.countdown', function() {
                $this.attr("href", $(this).data('zoom-url'));
                $this.html('Join Now');
            });
    });
  }