$(document).ready(function() {
	$('#form-collection-form').validate({
		rules: {
      firstname :{
          required:true,
          noSpace: true
      },
      lastname  :{
          required:true,
          noSpace: true
      },
      email :{
          required:true,
					email:true
      },
      mobile  :{
          required:true,
          phoneNumber :true,
      },
			job_title : {
					required:true,
			},
			company_name : {
					required:true,
			},
			city : {
					required:true,
			},
			state : {
					required:true,
			},
			'service[]' : {
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
			job_title : {
					required:'Please enter the job title.',
			},
			company_name : {
					required:'Please enter the company name.',
			},
			city : {
					required:'Please enter the city.',
			},
			state : {
					required:'Please enter the state.',
			},
			'service[]' : {
					required:'Please select the service.',
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
