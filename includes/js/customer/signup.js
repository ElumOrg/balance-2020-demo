$(document).ready(function() {
	$('#form-customer-signup').validate({
		rules: {
      firstname :{
          required:true,
          // noSpace: true
      },
      lastname  :{
          required:true,
          // noSpace: true
      },
      email :{
          required:true,
					email:true
      },
      country_code:{
        required:true,
        countryCode:true,
      },
      mobile  :{
          required:true,
          phoneNumber :true,
      },
      old_password  :{
          required:true,
          minlength:6,
      },
      password  :{
          equalTo: "#old_password"
      },
      captcha_code  :{
          required:true,
      },
      e_terms :{
          required:true,
      },
		},
    messages : {
      firstname :{
          required:'Please enter the first name.',
      },
      lastname  :{
          required:'Please enter the last name.',
      },
      email :{
          required:'Please enter the email address.',
					email:'Please enter the valid email address.'
      },
      mobile  :{
          required:'Please enter the mobile number.',
      },
      country_code:{
        required:'Please enter country code.',
      },
      old_password  :{
          required:'Please enter the password.',
          minlength:'Password must be atleast 6 digits.'
      },
      password  :{
          equalTo: "Password confirmation should match."
      },
      captcha_code  :{
          required:'Please enter the captcha code.',
      },
      e_terms :{
          required:'Please check this box .',
      },
    },
  	submitHandler: function (form) {
      form.submit();
      $("#customer-signup").attr("disabled","disabled");
    }
  });

});


jQuery.validator.addMethod("phoneNumber", function (value, element) {
    return /^[\d+ ]*$/.test(value)
}, "Please enter the valid phone number.");

jQuery.validator.addMethod("noSpace", function(value, element) { 
  return value.indexOf(" ") < 0 && value != ""; 
}, "Please remove space.");


jQuery.validator.addMethod("countryCode", function (value, element) {
    return /^\+\d+$/.test(value)
}, "Please enter the valid country code.");