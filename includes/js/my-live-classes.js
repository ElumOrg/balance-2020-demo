$(document).ready(function() {
	$('#loader-div').hide();
});

$('.btn-countdown').on('click',function(){
	if ($(this).text() == 'Join Now') {
		$.ajax({
			url: baseURL + '/update/live/classes/minutes',
			type: 'POST',
			data: {transaction_id : $(this).attr('data-transaction-id')},
			success: function (result) {
				if(result.status){
					action = $('.btn-countdown').attr('data-zoom-url');
					// alert(action);
					// if(action != '' && action != undefined){
					// 	window.location.href = action;
					// }
				}
			},
		});
	}
});

$('.btn-cancel-event').on('click',function(){

	swal({
		title: 'Are you sure?',
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
	$("#address-modal-title").html('Send Tip To Teacher');
	$("#address-modal-button").html('Proceed');


	var transaction_id = $(this).attr('data-transaction-id');
	// alert(transaction_id);
	var teacher_name = $(this).attr('data-teacher-name');
	$('input[name="transaction_id"').val(transaction_id);
	$('#teacher_title').html('<strong>Would you like to offer some donation to '+teacher_name+' ? </strong>');
	$('#tip-modal-title').html('Send Donation To '+teacher_name);
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