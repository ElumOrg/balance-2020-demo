$(document).ready(function() {
	$('#loader-div').hide();
	// $('#alert-ajax-danger').hide();
	$('input[name="v_card_num"]').mask('9999 9999 9999 9999');
	$('input[name="v_date"]').mask('99/99');
});


$('#form-guest-gift-certificate').validate({
		errorElement: 'span', //default input error message container
		focusInvalid: false, // do not focus the last invalid input
		invalidHandler: function(form, validator) {
      $('html,body').animate({
       scrollTop: $("form").offset().top},
      50);
    },
		rules: {
			v_firstname:{
				required:true,
			},
			v_lastname:{
				required:true,
			},
			email:{
				required:true,
			},
			v_mobile:{
				required:true,
				digits:true
			},
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
		},
    messages : {
    		v_firstname:{
				required:'Please enter your first name.',
			},
			v_lastname:{
				required:'Please enter your last name.',
			},
			email:{
				required:'Please enter your email.',
			},
			v_mobile:{
				required:'Please enter your mobile number.',
			},
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
		$('#loader-div').show();
		form.submit();
	}
  });