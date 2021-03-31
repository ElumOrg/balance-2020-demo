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
    endDate: '+1d',
	minuteStep: 15
  }).on('change', function() {
    $(this).valid(); // triggers a validation test
  });

  $('#form-reschedule-session').validate({
		ignore: [],
		errorElement: 'span', //default input error message container
		errorClass: 'span-error', // default input error message class
		focusInvalid: false, // do not focus the last invalid input
		rules: {
			reschedule_date	:{
				required : true,
			},
		},
	    messages : {
				reschedule_date	:{
					required : 'Please select the date and time.',
				},
	    },
    	submitHandler: function (form) {
	      form.submit();
	      $("#btnSubmit").attr("disabled","disabled");
	    }
  });
})

$('.btn-cancel-appointments').on('click',function(){
  var appointmentId = $(this).attr('data-id');
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
        url: baseURL+'/appointments/cancel',
        type: 'POST',
        data: {appointmentId:appointmentId},
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
        url: baseURL+'/my-appointments',
        type: "get",
        dataType: 'html',
        data: {
          'page_no': start_count,
          'service_name' : $('#filter_service_name').val(),
          'supplier_name' : $('#filter_supplier_name').val(),
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

$(document).on('click', '.accept-reschedule', function(e){
   var appointmentId = $(this).attr('data-id');
    swal({
      title: 'Accept Rescheduled Appointment?',
      text: 'Are you sure you want to accept this reschedule?',
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willProceed) => {
      if (willProceed) {
        $('#loader-div').show();
        $.ajax({
          url: baseURL+'/appointments-accept-or-decline',
          type: 'POST',
          data: {appointmentId:appointmentId,
                status:'Accept'},
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


$(document).on('click', '.decline-reschedule', function(e){
   var appointmentId = $(this).attr('data-id');
    swal({
      title: 'Decline Rescheduled Appointment?',
      text: 'Are you sure you want to decline this reschedule?',
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willProceed) => {
      if (willProceed) {
        $('#loader-div').show();
        $.ajax({
          url: baseURL+'/appointments-accept-or-decline',
          type: 'POST',
          data: {appointmentId:appointmentId,
                status:'Decline'},
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
              swal(result.message, {
                icon: "error",
              }).then((willProceed) => {
                window.location.reload();
              });
            }
          },
          error: function (xhr, ajaxOptions, thrownError) {
            $('#loader-div').hide();
            swal(result.message, {
                icon: "error",
              }).then((willProceed) => {
                window.location.reload();
              });
          }
        });
      }

    });

});

