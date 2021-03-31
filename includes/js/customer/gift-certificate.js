$('#form-customer-gift-session-modal').validate({
		errorElement: 'span', //default input error message container
		focusInvalid: false, // do not focus the last invalid input
		invalidHandler: function(form, validator) {
	    $('html,body').animate({
	       scrollTop: $("form").offset().top},
	      50);
	    },
		rules: {
			v_receiver_email:{
				required:true,
				email:true,
				//phoneNumber :true,
			},
			v_receiver_name:{
				required:true,
			},
		},
    	messages : {
			v_receiver_email:{
				required:'Please enter email address.',
				email:'Please enter the valid email address.'
			},
			v_receiver_name:{
				required:'Please enter name.',
			},
	    },
		submitHandler: function (form, event) {
			e_addressId = $('input[name="add_edit_id"').val();
			event.preventDefault();
			var url = baseURL + '/gift-session';
			
			$('#loader-div').show();

	      	$.ajax({
	        url: url,
	        type: 'POST',
	        data: $('#form-customer-gift-session-modal').serialize(),
	        success: function (result) {
				console.log(result.status);
			  	$('#loader-div').hide();
			  	
			  	if (result.status=='error') {
					
					$('.alert-danger').show();
					$('.alert-danger').html(result.msg);
				
					return false;
				}

	          	if (result.status=='success') {
					//$("#AddressModal").modal('hide');
					//$('#alert-ajax-error').text('').hide();
					swal(result.msg, {
						icon: "success",
					}).then((willProceed) => {
						window.location.href = result.url;
						//window.location.reload();
					});
				} 
        },
        error: function (xhr, ajaxOptions, thrownError) {
          $("#error-action-supplier").html('Something went wrong. Please try again');
        }
      });
    }
  });

$('#form-customer-gift-a-session-modal').validate({
		errorElement: 'span', //default input error message container
		focusInvalid: false, // do not focus the last invalid input
		invalidHandler: function(form, validator) {
	    $('html,body').animate({
	       scrollTop: $("form").offset().top},
	      50);
	    },
		rules: {
			v_receiver_email:{
				required:true,
				email:true,
				//phoneNumber :true,
			},
			v_receiver_name:{
				required:true,
			},
		},
    	messages : {
			v_receiver_email:{
				required:'Please enter email address.',
				email:'Please enter the valid email address.'
			},
			v_receiver_name:{
				required:'Please enter name.',
			},
	    },
		submitHandler: function (form, event) {
			e_addressId = $('input[name="add_edit_id"').val();
			event.preventDefault();
			var url = baseURL + '/gift-session';
			
			$('#loader-div').show();

	      	$.ajax({
	        url: url,
	        type: 'POST',
	        data: $('#form-customer-gift-a-session-modal').serialize(),
	        success: function (result) {
				console.log(result.status);
			  	$('#loader-div').hide();
			  	
			  	if (result.status=='error') {
					
					$('.alert-danger').show();
					$('.alert-danger').html(result.msg);
				
					return false;
				}

	          	if (result.status=='success') {
					//$("#AddressModal").modal('hide');
					//$('#alert-ajax-error').text('').hide();
					swal(result.msg, {
						icon: "success",
					}).then((willProceed) => {
						window.location.href = result.url;
						//window.location.reload();
					});
				} 
        },
        error: function (xhr, ajaxOptions, thrownError) {
          $("#error-action-supplier").html('Something went wrong. Please try again');
        }
      });
    }
  });

jQuery.validator.addMethod("phoneNumber", function (value, element) {
    return /^[\d+ ]*$/.test(value)
}, "Please enter the valid phone number.");


$('#form-customer-gift-certificates-reddem').validate({
		errorElement: 'span', //default input error message container
		focusInvalid: false, // do not focus the last invalid input
		invalidHandler: function(form, validator) {
	    $('html,body').animate({
	       scrollTop: $("form").offset().top},
	      50);
	    },
		rules: {
			v_giftcard_code:{
				required:true,
			},
		},
    	messages : {
			v_giftcard_code:{
				required:'Please enter giftcertificate code.',
			},
	    },
		submitHandler: function (form, event) {
			event.preventDefault();
			var url = baseURL + '/gift-certificates/redeem';
			
			$('#loader-div').show();

	      	$.ajax({
	        url: url,
	        type: 'POST',
	        data: $('#form-customer-gift-certificates-reddem').serialize(),
	        success: function (result) {
			  	$('#loader-div').hide();
			  	if (result.status=='error') {
					swal(result.msg, {
						icon: "error",
					});
				}
	          	if (result.status=='success') {
					swal(result.msg, {
						icon: "success",
					}).then((willProceed) => {
						window.location.reload();
					});
				} 
        },
        error: function (xhr, ajaxOptions, thrownError) {
          $("#error-action-supplier").html('Something went wrong. Please try again');
        }
      });
    }
  });


$('#addGiftCertRedeemModal').on('hidden.bs.modal', function () {
    $("#form-customer-gift-certificates-reddem").validate().resetForm();
    $("#form-customer-gift-certificates-reddem")[0].reset();
    $("#form-customer-gift-certificates-reddem").find('input.error').removeClass("error");
});