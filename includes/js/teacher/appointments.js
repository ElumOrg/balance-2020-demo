$(document).ready(function()
{
  $('#loader-div').hide();
	$('#alert-ajax-danger').hide();
  var date = new Date();

  $('#from_date').datepicker({
        format: 'mm-dd-yyyy',
        showClear: true,
        autoclose: true,
        todayHighlight: true,
        orientation: "bottom"
  })
  .on('changeDate', function (selected)
  {
      startDate = new Date(selected.date.valueOf());
      $('#to_date').val('').datepicker('setStartDate',startDate);
  })

  $('#to_date').datepicker({
      format: 'mm-dd-yyyy',
      showClear: true,
      autoclose: true,
      todayHighlight: true,
      orientation: "bottom"
  });

  $(".reschedule_datetime").datetimepicker({
    format: 'mm/dd/yyyy hh:ii',
    autoclose: true,
    startDate: new Date(),
    // endDate: '+1d',
	  minuteStep: 15
  }).on('change', function() {
    $(this).valid(); // triggers a validation test
  });

 
})

$('.btn-cancel-appointments').on('click',function(){
  var appointmentId = $(this).attr('data-id');
  var status = $(this).attr('data-status');
  swal({
    title: 'Cancel Appointment?',
    text: 'Are you sure you want to cancel this appointment?',
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willProceed) => {
    if (willProceed) {
      $('#loader-div').show();
      $.ajax({
        url: baseURL+'/teacher-appointments/virtual-sessions/cancel-approve',
        type: 'POST',
        data: {status : status,appointmentId:appointmentId},
        success: function (result) {
          if (result.status) {
            $('#alert-ajax-danger').hide();
            $('#loader-div').hide();
            swal(result.message, {
              icon: "success",
            }).then((willProceed) => {
              window.location.reload();
            });
          } else {
            $('#loader-div').hide();
            $('#alert-ajax-danger').show();
            $('#alert-ajax-danger').html('Something went wrong. Please try again');
          }
        },
        error: function (xhr, ajaxOptions, thrownError) {
          $('#loader-div').hide();
          $('#alert-ajax-danger').show();
          $('#alert-ajax-danger').html('Something went wrong. Please try again');
        }
      });
    }

  });
});

$('.btn-reject-appointments').on('click',function(){
  var appointmentId = $(this).attr('data-id');
  var status = $(this).attr('data-status');
  swal({
    title: 'Reject Appointment?',
    text: 'Are you sure you want to reject this appointment?',
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willProceed) => {
    if (willProceed) {
      $('#loader-div').show();
      $.ajax({
        url: baseURL+'/teacher-appointments/virtual-sessions/cancel-approve',
        type: 'POST',
        data: {status : status,appointmentId:appointmentId},
        success: function (result) {
          if (result.status) {
            $('#alert-ajax-danger').hide();
            $('#loader-div').hide();
            swal(result.message, {
              icon: "success",
            }).then((willProceed) => {
              window.location.reload();
            });
          } else {
            $('#loader-div').hide();
            $('#alert-ajax-danger').show();
            $('#alert-ajax-danger').html('Something went wrong. Please try again');
          }
        },
        error: function (xhr, ajaxOptions, thrownError) {
          $('#loader-div').hide();
          $('#alert-ajax-danger').show();
          $('#alert-ajax-danger').html('Something went wrong. Please try again');
        }
      });
    }

  });
});

$('.btn-approve-appointments').on('click',function(){
  var appointmentId = $(this).attr('data-id');
  var status = $(this).attr('data-status');

  var session_type = $(this).attr('data-session-type');
  
  if (session_type == 'Virtual') {
      var title  = $(this).attr('data-details');
      var description = $(this).attr('data-details');
      var timezone = $(this).attr('data-timezone');
      var duration = $(this).attr('data-hours');
      var date = $(this).attr('data-startdate');
      // alert(date);
      $('#modal_appointmentId').val(appointmentId);
      $('#modal_status').val(status);
      $('#modal_session_type').val(session_type);

      $('#title').val(title);
      $('#description').val(description);
      $('#class_timezone').val(timezone);
      $('#total_event_hours').val(duration);
      $('#from_date_event').val(date);

      $('#PrivateVirtualModal').modal({
        backdrop: 'static',
        keyboard: false
    });
  }else{
      swal({
        title: 'Approve Appointment?',
        text: 'Are you sure you want to approve this appointment?',
        icon: "success",
        buttons: true,
        dangerMode: false,
      })
      .then((willProceed) => {
        if (willProceed) {
          $('#loader-div').show();
          $.ajax({
            url: baseURL+'/teacher-appointments/virtual-sessions/cancel-approve',
            type: 'POST',
            data: {status : status,appointmentId:appointmentId,session_type:session_type},
            success: function (result) {
              if (result.status) {
                $('#alert-ajax-danger').hide();
                $('#loader-div').hide();
                swal(result.message, {
                  icon: "success",
                }).then((willProceed) => {
                  window.location.reload();
                });
              } else {
                $('#loader-div').hide();
                $('#alert-ajax-danger').show();
                $('#alert-ajax-danger').html(result.message);
              }
            },
            error: function (xhr, ajaxOptions, thrownError) {
              $('#loader-div').hide();
              $('#alert-ajax-danger').show();
              $('#alert-ajax-danger').html('Something went wrong. Please try again');
            }
          });
        }

      });
    }
});

$('#form-virtual-link-modal').validate({
    errorElement: 'span', //default input error message container
    focusInvalid: false, // do not focus the last invalid input
    invalidHandler: function(form, validator) {
      $('html,body').animate({
       scrollTop: $("form").offset().top},
      50);
    },
    rules: {
      session_link:{
        required:true,
      },
      session_instruction:{
        required:true
      }
    },
    messages : {
      session_link:{
        required:'Please enter the session link.',
      },
      session_instruction:{
        required:'Please enter the session instructions.',
      },
    },
    submitHandler: function (form, event) {
      $('#loader-div').show();
      $.ajax({
        url: baseURL+'/teacher-appointments/virtual-sessions/cancel-approve',
        type: 'POST',
        data: $('#form-virtual-link-modal').serialize(),
        success: function (result) {
          console.log(result.status);
          if (result.status) {
            $('#loader-div').hide();
            $("#PrivateVirtualModal").modal('hide');
            $('#alert-ajax-danger').hide();
            swal(result.message, {
              icon: "success",
            }).then((willProceed) => {
              window.location.reload();
            });
          } else {
            $('#alert-ajax-danger').show();
            $('#alert-ajax-danger').html(result.message);
          }
        },
        error: function (xhr, ajaxOptions, thrownError) {
          $("#error-action-supplier").html('Something went wrong. Please try again');
        }
      });
    }
  });

$('#PrivateVirtualModal').on('hidden.bs.modal', function () {
    $("#form-virtual-link-modal").validate().resetForm();
    $("#form-virtual-link-modal")[0].reset();
    $("#form-virtual-link-modal").find('input.error').removeClass("error");
    $('input[name="address_id"').val('0');
});

$('#BookSession').on('hidden.bs.modal', function () {
    $("#form-reschedule-session").validate().resetForm();
    $("#form-reschedule-session")[0].reset();
    $("#form-reschedule-session").find('input.error').removeClass("error");
});

$(document).on('click', '.btn-booking-reschedule', function(e){
	appointmentID = $(this).attr('data-id');
  minutes = $(this).attr('data-minute');
  supplierId = $(this).attr('data-supplier-id');
  serviceName = $(this).attr('data-service-name');

  $('#select_duration').val(minutes);
  $('#text_select_duration').val(minutes);
  $('#supplier_id').val(supplierId);
  $('#appointment_id').val(appointmentID);
  $('#select_duration').prop('disabled','disabled');
  $('#service_name').html(serviceName);
  $('#reschedule_date').prop('readonly','readonly');
  $('#reschedule_date').css('cursor','pointer');

	$('#BookSession').modal({
		backdrop: 'static',
		keyboard: false
	});

});


$( '#btn-show-more' ).on( 'click', function () {
  var last_id = $( ".page_number_div:last" ).attr( "id" );
  var start_count =  parseInt(last_id)+1;
  loadMoreData( start_count );
} );


function loadMoreData( start_count ) {
    $.ajax( {
        //url: '/loadMoreData.php?last_id=' + last_id,
        url: baseURL+'/teacher-appointments/virtual-sessions',
        type: "get",
        dataType: 'html',
        data: {
          'page_no': start_count,
          'service_name' : $('#filter_service_name').val(),
          'consumer_name' : $('#filter_supplier_name').val(),
          'from_date' : $('#from_date').val(),
          'to_date' : $('#to_date').val(),
          'v_zipcode' : $('#v_zipcode').val(),
          'v_city' : $('#v_city').val(),
          'sort_order' : $("input[name='sort_order']").val(),
          'page_status' : 'ajax-load',
          'e_status' : $('#page_status').val()
        },
        beforeSend: function () {
          $('#loader-div').show();
        }

      } )
      .done( function ( data ) {
        console.log(data);
        if ( data == '' ) {
          $('#loader-div').hide();
          $( '#btn-show-more' ).hide();
          $( ".refer-friends" ).append( '<span id="no_quotes" class="alert alert-danger"> No More Appointments Available. </span>' );
        } else {
          $('#loader-div').hide();
          $( ".teacher-approval" ).append( data );
          var total_booking = $('#total_booking').val();
          var const_page_record = $('#const-page-record').val();
          if (total_booking<const_page_record) {
            $( '#btn-show-more' ).hide();
          }
        }
      } );
}



$('#btn_add_to_zoom').on('click',function(){
  var title = $('input[name=title]').val();
  var description = $('input[name=description]').val();
  var form_datetime = $('input[name=from_date_event]').val();
  var total_event_hours = $('input[name=total_event_hours]').val();
  var class_timezone = $('select[name=class_timezone]').val();
  if (title == '' || 
    description == '' ||
    form_datetime == '' ||
    total_event_hours == '' ||
    class_timezone == '') 
  {
    alert('Please filled out all fields');
  }else{
    var dataZoom = {title:title, 
            description:description,
            form_datetime:form_datetime,
            total_event_hours:total_event_hours,
            class_timezone:class_timezone};
    var response = addZoomLinkToAccount(dataZoom);
  }
});

$(document).on('click', '.btn-booking-reschedule', function(e){
    appointmentID = $(this).attr('data-id');
    minutes = $(this).attr('data-minute');
    supplierId = $(this).attr('data-supplier-id');
    serviceName = $(this).attr('data-service-name');

    $('#select_duration').val(minutes);
    $('#text_select_duration').val(minutes);
    $('#supplier_id').val(supplierId);
    $('#appointment_id').val(appointmentID);
    $('#select_duration').prop('disabled','disabled');
    $('#service_name').html(serviceName);
    $('#reschedule_date').prop('readonly','readonly');
    $('#reschedule_date').css('cursor','pointer');

    $('#BookSession').modal({
      backdrop: 'static',
      keyboard: false
    });

});