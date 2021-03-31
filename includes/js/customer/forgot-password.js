$(document).ready(function() {
	$('input').attr('autocomplete','off');
	setTimeout(function(){
		$('.alert-danger').hide();
	},2000);

	$('#form-customer-forgot-password').validate({
		ignore: [],
		errorElement: 'span', //default input error message container
		errorClass: 'span-error', // default input error message class
		focusInvalid: false, // do not focus the last invalid input
		rules: {
		  email :{
			  required:true,
			  email:true,
		  },
			mobile  :{
          required:true,
          phoneNumber :true,
      },
		},
    messages : {
      email :{
          required:'Please enter the email-id.',
          email:'Please enter the valid email id.',
      },
			mobile  :{
          required:'Please enter the mobile number.',
      },
    },
  	submitHandler: function (form) {
      form.submit();
      $("#btnSubmit").attr("disabled","disabled");
    }
  });

	$('#form-customer-reset-password').validate({
		ignore: [],
		errorElement: 'span', //default input error message container
		errorClass: 'span-error', // default input error message class
		focusInvalid: false, // do not focus the last invalid input
		rules: {
			otp :{
			  required:true,
				digits:true
		  },
			old_password  :{
          required:true,
          minlength:6,
      },
      password  :{
          equalTo: "#old_password"
      },
		},
    messages : {
			otp :{
          required:'Please enter the verification code.',
					digits:'The verification code must be a number.'
      },
			old_password  :{
          required:'Please enter the password.',
          minlength:'Password must be atleast 6 characters.'
      },
      password  :{
          equalTo: "Password confirmation should match."
      },
    },
  	submitHandler: function (form) {
      form.submit();
      $("#btnSubmit").attr("disabled","disabled");
    }
  });
});

jQuery.validator.addMethod("phoneNumber", function (value, element) {
    return /^[\d+ ]*$/.test(value)
}, "Please enter the valid phone number");
