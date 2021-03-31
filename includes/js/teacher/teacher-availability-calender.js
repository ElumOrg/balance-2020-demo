$(document).ready(function()
{
        $('#loader-div').hide();
        $('#v_timezone').select2();
        //getrecords on page load
        todayDate = (new Date()).toISOString().slice(0, 10);
        var status = 'page-load';
        // getavailability(todayDate,status);
        
        $('#calendar').fullCalendar({
            editable: false,
            selectable: true,
            disableDragging :true,
            dayRender: function(date, cell){
                var todayDate = new Date();
                var maxDate = new Date();
                maxDate.setDate(maxDate.getDate() + 50);
                
                if (date < todayDate){
                    $(cell).addClass('previous-disabled');
                }

                if (date > maxDate){
                    $(cell).addClass('max-disabled');
                }
            },
            eventSources:[
                    {
                        url: baseURL +'/teacher/availability/calender/getRecords-for-dots',
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
              selected_date = [];
              var start_selected_date = info.start._i;
              var end_selected_date = info.end._i;

              selected_date.push({'start':start_selected_date,'end' : end_selected_date});
              var status = 'calendar-click';

              $(".fc-state-highlight").removeClass("fc-state-highlight");
              $(".fc-date-text-highlight").removeClass("fc-date-text-highlight");

              $('td').find("[data-date='" + selected_date + "']").addClass('fc-date-text-highlight');
              $('.fc-day[data-date="' + info.start.format('YYYY-MM-DD') + '"]').addClass("fc-state-highlight");

              getavailability(selected_date,status);
            },
            dayClick: function (date, allDay, jsEvent, view) {
                  var selected_date = (new Date(date)).toISOString().slice(0, 10);
                  // alert(selected_date);
                  $(".fc-state-highlight").removeClass("fc-state-highlight");
                  $(".fc-date-text-highlight").removeClass("fc-date-text-highlight");

                  if (selected_date != todayDate) {
                    $('td').find("[data-date='" + selected_date + "']").addClass('fc-date-text-highlight');  
                  }

                  // $('td').find("[data-date='" + selected_date + "']").addClass('fc-date-text-highlight');
                  $('.fc-day[data-date="' + date.format('YYYY-MM-DD') + '"]').addClass("fc-state-highlight");
             },
            select: function(start, end, jsEvent, view) {
                var todayDate = new Date();
                todayDate.setHours(0, 0, 0, 0);

                var maxDate = new Date();
                maxDate.setDate(maxDate.getDate() + 60);

                var date = new Date(start._d);
                date.setHours(0, 0, 0, 0);


                console.log((date),(todayDate))
                if (date >= todayDate) {
                  if (start) {
                    selected_date = [];
                    var start_selected_date = (new Date(start._d)).toISOString().slice(0, 10);


                    var end_date = end._d;
                    var end_selected_date = new Date(end_date.getTime());
                    end_selected_date.setDate(end_date.getDate() - 1);
                    var end_selected_date = (new Date(end_selected_date)).toISOString().slice(0, 10);

                    selected_date.push({'start':start_selected_date,'end' : end_selected_date});
                    var status = 'calendar-click';

                    getavailability(selected_date,status);
                  }
              
              }
            },
        });
});

function convertDate(inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat)
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
}

function getavailability(selected_date,status){
                console.log(selected_date);
  // $('#loader-div').show();
  $.ajax({
    url: baseURL +'/teacher/availability/calender/getRecords',
    type: 'GET',
    data: {selected_date:selected_date,status:status},
    success: function (result) {
      if (result.status) {
        $('#availabilityModel').modal({
              backdrop: 'static',
              keyboard: false
        });
        $('#availabilityTable').html(result.formatHtml);
        $('#sub-title').text(result.selectedDateTime);
        $('#input_selected_date').val(JSON.stringify(selected_date));
        $('#loader-div').hide();
      } else {
        $('#calendar_events').html(result.html);
        $('#loader-div').hide();
      }
    }
  });
}


function getavailability_old(selected_date,status){
  $('#loader-div').show();
  $('#schedule-buttons').show();
  $('#cancel-schedule-buttons').attr('data-date',selected_date);
  $('#set-schedule-buttons').attr('data-date',selected_date);
}

$('#set-schedule-buttons').on('click',function(){
  selected_date = $(this).attr('data-date');
  status = 'calendar-click'
  $.ajax({
    url: baseURL +'/teacher/availability/calender/getRecords',
    type: 'GET',
    data: {selected_date:selected_date,status:status},
    success: function (result) {
      if (result.status) {
        $('#availabilityModel').modal({
              backdrop: 'static',
              keyboard: false
        });
        $('#availabilityTable').html(result.formatHtml);
        $('#sub-title').text(result.selectedDateTime);
        $('#input_selected_date').val(selected_date);
        $('#loader-div').hide();
      } else {
        $('#calendar_events').html(result.html);
        $('#loader-div').hide();
      }
    }
  });

})


$('#modal-btn-cancel-availability').on('click',function(){
  $('#availabilityModel').modal('hide');
});

$('#modal-btn-save-availability').on('click',function(){
  // console.log($("input[name='selectAvailabilityId[]']").val());

  var no_of_week_recurring = $('#no_of_week_recurring').val();
  var regex = /^\d+$/;
  var error = 0;

  if($('.is_weekly_recurring').prop('checked')) {
    if (no_of_week_recurring == '') {
      $('#recurr_error').text('Please enter the count of recurring.');
      error ++;
      return false;
    }else if(!regex.test(no_of_week_recurring)){
      $('#recurr_error').text('Please enter valid number.');
      return false;
      error ++;
    }
  }

  if (error == '0') {
    $('#recurr_error').text('');
    $('#loader-div').show();
    $.ajax({
      url: baseURL +'/teacher/availability/save',
      type: 'post',
      data: $('#form-save-availability').serialize(),
      success: function (result) {
        console.log(result);
        $('#loader-div').hide();
        if (result.status) {
          swal(result.message, {
            icon: "success",
          }).then((willProceed) => {
            window.location.reload();
          });
        }else{
            swal(result.message, {
              icon: "error",
            }).then((willProceed) => {
              // window.location.reload();
            });
        }
      }
    });
  }

  return false;

});

$(document).on('change','.selectAllAvailability',function(){
   $('.selectAvailabilityId').prop('checked', this.checked);       
});


$('#availabilityModel').on('hidden.bs.modal', function () {
    $("#form-save-availability").validate().resetForm();
    $("#form-save-availability")[0].reset();
    $("#form-save-availability").find('input.error').removeClass("error");
    $('.selectAvailabilityId').prop('checked', false);     
    $('input[name=is_weekly_recurring]').prop('checked', false); 
    $('#weekly_recurrnces_div').hide();   

});



$('#change-timezone').on('click',function(){
  selected_timezone = $('#v_timezone').val();
  $('#loader-div').show();
  $.ajax({
    url: baseURL +'/teacher/availability/change/timezone',
    type: 'POST',
    data: {selected_timezone:selected_timezone},
    success: function (result) {
      if (result.status) {
        
        $('#loader-div').hide();
        swal(result.message, {
            icon: "success",
          }).then((willProceed) => {
            window.location.reload();
          });
      } else {
        $('#loader-div').hide();
          swal(result.message, {
            icon: "error",
          }).then((willProceed) => {
            // window.location.reload();
          });
      }
    }
  });

})