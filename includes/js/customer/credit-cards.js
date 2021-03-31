$(document).ready(function() {
	$('#loader-div').hide();
	// $('#alert-ajax-danger').hide();
	$('input[name="v_card_num"]').mask('9999 9999 9999 9999');
	$('input[name="v_date"]').mask('99/99');
});


$('#form-customer-credit-modal').validate({
		errorElement: 'span', //default input error message container
		focusInvalid: false, // do not focus the last invalid input
		invalidHandler: function(form, validator) {
      $('html,body').animate({
       scrollTop: $("form").offset().top},
      50);
    },
		rules: {
			v_name:{
				required:true,
			},
			v_card_num:{
				required:true,
				creditcard: true
			},
			v_date:{
				required:true,
			},
			v_cvv:{
				required:true,
				digits:true,
			},
			/*v_state:{
				required:true,
			},
			v_zipcode:{
				required:true,
				digits:true,
				minlength:5,
				maxlength:8,
			},*/
		},
    messages : {
			v_name:{
				required:'Please enter credit card name.',
			},
			v_card_num:{
				required:'Please enter credit card number.',
			},
			v_date:{
				required:'Please enter the expiry date.',
			},
			v_cvv:{
				required:'Please enter the cvv.',
			},
			
    },
		submitHandler: function (form, event) {
			e_creditId = $('input[name="add_edit_id"').val();
			event.preventDefault();
			var url = '';
			if (e_creditId > 0) {
				url = baseURL + '/credit/edit'
			} else {
				url = baseURL + '/credit-cards/store'
			}
			console.log(url);
			// return false;
		$('#loader-div').show();
      	$.ajax({
        url: url,
        type: 'POST',
        data: $('#form-customer-credit-modal').serialize(),
        success: function (result) {
					console.log(result.status);
		  	$('#loader-div').hide();
		  if (result.status=='error') {

			const errorBag = result.errors;
			if(errorBag){
	            $.each(errorBag, function (fieldName, value) {
	                $('#' + fieldName+"-error").text(value[0]).show();
	            })
			}else{
		  	// console.log('ss');
			  	$('#alert-ajax-error').show();
				$('#alert-ajax-error').html(result.msg);
			}

			return false;
		  }

          if (result.status=='success') {
			$("#creditModal").modal('hide');
			$('#alert-ajax-error').text('').hide();
			swal(result.msg, {
				icon: "success",
			}).then((willProceed) => {
				if (result.cardCount == 1) {
						window.location.href = result.redirect_url;
				}else {
					window.location.reload();
				}
			});
			/*			$('#loader-div').show();
			*/
          } /*else {
            $('#alert-ajax-danger').show();
			$('#alert-ajax-danger').html(result.message);
          }*/
        },
        error: function (xhr, ajaxOptions, thrownError) {
          $("#error-action-supplier").html('Something went wrong. Please try again');
        }
      });
    }
  });

$(document).on('click', '.btn-delete-credit', function () {
		var creditcardId = $(this).attr('data-id');
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
					url: baseURL+'/credit-cards/delete',
					type: 'POST',
					data: {creditcardId:creditcardId},
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

$(document).on('click', '.btn-set-default-credit,.selectable-radio', function () {
		var creditcardId = $(this).attr('data-id');
		if ($('#page_status').val() != '') {
			var confirmMsg = "Do you want to proceed with credit card ?";
		}else {
			var confirmMsg = "Do you want to make this as a default credit card?";
		}
		swal({
		  text: confirmMsg,
		  icon: "warning",
		  buttons: true,
		  dangerMode: false,
		})
		.then((willProceed) => {
		  if (willProceed) {
				$('#loader-div').show();
				$.ajax({
					url: baseURL+'/credit-cards/set/default',
					type: 'POST',
					data: {creditcardId:creditcardId},
					success: function (result) {
						if (result.status) {
							$('#alert-ajax-success').show();
							$('#alert-ajax-danger').hide();
							if ($('#page_status').val() != '') {
								// window.location.href = baseURL+"/pay";
								window.location.href = result.redirect_url;
							}else {
								swal(result.msg, {
						      icon: "success",
						    }).then((willProceed) => {
									window.location.reload();
								});
							}
						} else {
							$('#alert-ajax-danger').show();
							$('#alert-ajax-danger').html(result.msg);
						}
					},
					error: function (xhr, ajaxOptions, thrownError) {
						$('#alert-ajax-danger').html('Something went wrong. Please try again');
					}
				});
		  } else {
				if ($('#page_status').val() != '') {
					$('.selectable-radio').prop('checked',false);
				}
		  }
		});
});

$(document).on('click', '#btn-add-credit-card', function () {
    $("#credit-modal-title").html('Add a new credit card');
    $("#credit-modal-button").html('ADD  Credit Card');
		$('input[name="add_edit_id"').val('0');
    $('#creditModal').modal({
        backdrop: 'static',
        keyboard: false
    });
});