$(document).ready(function() {
	$('#loader-div').hide();
	$('#prerecorded-popup').attr("href",'');

	 $('#from_date').datepicker({
	        format: 'mm-dd-yyyy',
	        showClear: true,
	        autoclose: true,
	        todayHighlight: true,
	        orientation: "bottom"
	  })

	  $('#to_date').datepicker({
	      format: 'mm-dd-yyyy',
	      showClear: true,
	      autoclose: true,
	      todayHighlight: true,
	      orientation: "bottom"
	  });
});

$('.btn-countdown').on('click',function(){
	var obj = $(this);
	if ($(this).text() == 'Join Now' || $(this).attr('data-practised') == 'Yes') {
		$.ajax({
			url: baseURL + '/update/live/classes/minutes',
			type: 'POST',
			data: {transaction_id : $(this).attr('data-transaction-id')},
			success: function (result) {
				if(result.status){
					action = obj.data('zoom-url');
					// alert(action);
					preRecorded = obj.data('prerecorded');

					if(action != '' && action != undefined){
						if (preRecorded == 'Yes') {
							preRecordedUrl = obj.data('prerecorded-url');
							// window.open(action);
							$('#prerecorded-popup').attr("href",'');
							$('#prerecorded-popup').attr("href",preRecordedUrl);
							$('#prerecorded-popup').click();
						}else
						{
							window.open(action);
						}
					}
				}
			},
		});
	}
	return false;
});

$('.btn-cancel-event').on('click',function(){
	var price = parseFloat($(this).attr('data-price'));
	var diffinmin = parseFloat($(this).attr('data-diffinmin'));
	
	var myhtml = document.createElement("div");
	if (price > 0) {
		if (diffinmin >= 24) {
			myhtml.innerHTML = "Credit will be deposited in your balance wallet. ";
		}else{
	 		myhtml.innerHTML = "Less than 24 hours are remaining to start class. You wont get any refund if cancel! ";
		}
	}

	swal({
		title: 'Are you sure??',
		content: myhtml,
		icon: "warning",
		buttons: true,
		dangerMode: true,
	})
	.then((willProceed) => {
		if (willProceed) {
			$('#loader-div').show();
			$.ajax({
				url: baseURL+'/my-live-class/cancel',
				type: 'POST',
				data: {transaction_id : $(this).attr('data-transaction-id')},
				success: function (result) {
					if (result.status) {
						$('#alert-ajax-danger').hide();
						swal(result.msg, {
							icon: "success",
						}).then((willProceed) => {
							window.location.reload();
						});
					} else {
						$('#alert-ajax-danger').show();
						$('#alert-ajax-danger').html(result.msg);
					}
				},
				error: function (xhr, ajaxOptions, thrownError) {
					$('#alert-ajax-danger').html('Something went wrong. Please try again');
				}
			});
		}

	});
});

$('.btn-teacher-tip').on('click',function(){
	$("#address-modal-title").html('Send Tip To Instructor');
	$("#address-modal-button").html('Proceed');


	var transaction_id = $(this).attr('data-transaction-id');
	// alert(transaction_id);
	var teacher_name = $(this).attr('data-teacher-name');
	$('input[name="transaction_id"').val(transaction_id);
	$('#teacher_title').html('<strong>Would you like to offer some donation to '+teacher_name+' ? </strong>');
	$('#tip-modal-title').html('Send Tip To '+teacher_name);
	$('#TipModal').modal({
			backdrop: 'static',
			keyboard: false
	});
});

$("#form-tip").validate({
  errorElement: 'span', //default input error message container
  errorClass: 'span-error', // default input error message class
  focusInvalid: false, // do not focus the last invalid input
    rules: {
      v_tip_amount: {
        required: true,
				number:true,
      },
    },
    messages: {
      v_tip_amount: {
        required: 'Please enter the amount',
      },
    },
		errorPlacement: function(error, element) {
			if (element.attr("type") == "radio") {
     			error.insertAfter(element.parent().parent());
			}else{
     			error.insertAfter(element.parent('.form-group'));
			}
    },
    submitHandler: function (form, event) {
      // form.submit();
      $('#address-modal-button').prop('disabled','disabled');
			$('#loader-div').show();
      form.submit();
    }
});

$('#TipModal').on('hidden.bs.modal', function () {
    $("#form-tip").validate().resetForm();
    $("#form-tip")[0].reset();
    $("#form-tip").find('input.error').removeClass("error");
});

$(document).on('click', '.read-more-description', function () {
    title = $(this).attr('data-title');
    var message =  $(this).attr('data-message');

    var id =  $(this).attr('data-id');
    var message =  atob($("#"+id).val());

    console.log(message);
    $('#description-message').html('');
    $('#description-message').html(message);
    $('#description-title').html(title);
    $('#descriptionModal').modal({
        backdrop: 'static',
        keyboard: false
    });
});


$('.btn-write-review').on('click',function(){


	var transaction_id = $(this).attr('data-transaction-id');
	var teacher_name = $(this).attr('data-teacher-name');

	$("#review-title").html('Write a review about '+teacher_name);
	$("#address-modal-button").html('Proceed');
	
	$('input[name="transaction_id"').val(transaction_id);
	$('input[name="teacher_name"').val(teacher_name);

	$('#reviewModal').modal({
			backdrop: 'static',
			keyboard: false
	});
});

$("#form-review").validate({
  errorElement: 'span', //default input error message container
  errorClass: 'span-error', // default input error message class
  focusInvalid: false, // do not focus the last invalid input
    rules: {
      rate:{
        required: true,
      }
    },
    messages: {
      rate: {
        required: 'Please add rating',
      }
    },
    submitHandler: function (form, event) {
		if ($('#rate').val() != '') {
			$('#review-modal-button').prop('disabled','disabled');
			$('#rating-error').hide();
			$('#rating-error').html('');
   //    		$('#address-modal-button').prop('disabled','disabled');
			$('#loader-div').show();
      		form.submit();

		}else{
			$('#rating-error').show();
			$('#rating-error').html('Please add rating to instructor.');
		}
    }
});

$('#reviewModal').on('hidden.bs.modal', function () {
    $("#form-review").validate().resetForm();
    $("#form-review")[0].reset();
    $("#form-review").find('input.error').removeClass("error");
});

$('.btn-teacher-donate').on('click',function(){
	$("#address-modal-title").html('Send Donation To Instructor');
	$("#address-modal-button").html('Proceed');


	var transaction_id = $(this).attr('data-transaction-id');
	// alert(transaction_id);
	var teacher_name = $(this).attr('data-teacher-name');
	$('input[name="transaction_id"').val(transaction_id);
	$('#teacher_title').html('<strong>Would you like to offer some donation to '+teacher_name+' ? </strong>');
	$('#donation-modal-title').html('Donate To '+teacher_name);
	$('#donation-modal').modal({
			backdrop: 'static',
			keyboard: false
	});
});

$('.btn-pay-for-subscription-class').on('click',function(){
	url = $(this).attr('data-url');

	window.location.href = url;
});