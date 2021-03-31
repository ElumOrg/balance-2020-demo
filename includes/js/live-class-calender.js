$(document).ready(function()
{
        $('#loader-div').hide();
        //getrecords on page load
        todayDate = (new Date()).toISOString().slice(0, 10);
        var status = 'page-load';
        getEvents(todayDate,status);

        $('#calendar').fullCalendar({
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            selectable: true,
            dayClick: function (date, allDay, jsEvent, view) {
                  var selected_date = (new Date(date)).toISOString().slice(0, 10);
                  $(".fc-state-highlight").removeClass("fc-state-highlight");
                  $(".fc-date-text-highlight").removeClass("fc-date-text-highlight");

                  $('td').find("[data-date='" + selected_date + "']").addClass('fc-date-text-highlight');
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
  var teacherName = $('#hidden_teacher_name').val();
  $.ajax({
    url: baseURL +'/live/classes/calender/getRecords',
    type: 'GET',
    data: {selected_date:selected_date,status:status,teacherName:teacherName},
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
      } else {
        $('#calendar_events').html(result.html);
        $('#loader-div').hide();
      }
    }
  });
}
