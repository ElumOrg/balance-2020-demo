$(document).ready(function() {
	$('#form-contact-us').validate({
		rules: {
      v_email :{
          required:true,
					email:true
      },
      t_message :{
          required:true,
      },
      captcha_code:{
        required:true,
      }
		},
    messages : {
      t_message :{
          required:'Please type a message',
      },
      v_email :{
          required:'Please enter the email address.',
					email:'Please enter the valid email address.'
      },
      captcha_code:{
        required:'Please enter the captcha code.',
      }
    },
  	submitHandler: function (form) {
      form.submit();
      $("#customer-signup").attr("disabled","disabled");
    }
  });

});