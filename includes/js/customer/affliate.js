$(document).ready(function() {
	$('#form-customer-signup').validate({
		rules: {
      // name :{
      //     required:true,
      // },
      owner_first_name  :{
          required:true,
          noSpace: true
      },
      owner_last_name :{
          required:true,
          noSpace: true
      },
      email :{
          required:true,
					email:true
      },
      company_url :{
          url:true,
      },
      mobile_number  :{
          required:true,
          phoneNumber :true,
      },
      address :{
          required:true,
      },
		},
    messages : {
      // name :{
      //     required:'Please enter the business name.',
      // },
      owner_first_name :{
          required:'Please enter the first name.',
      },
      owner_last_name  :{
          required:'Please enter the last name.',
      },
      email :{
          required:'Please enter the business email.',
					email:'Please enter the valid business email.'
      },
      // company_url  :{
      //     required:'Please enter the company website URL.',
      // },
      mobile_number  :{
          required:'Please enter the mobile number.',
      },
      address  :{
          required:'Please enter the business address.',
      }
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
