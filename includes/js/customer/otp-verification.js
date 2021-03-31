$(document).ready(function() {
	$('#alert-ajax-success').hide();
	$('#alert-ajax-danger').hide();
	setTimeout(function(){
		$('.alert-danger').hide();
	},4000);

	setTimeout(function(){
		$('.alert-success').hide();
	},4000);

	$('#form-customer-otp-verify').validate({
		ignore: [],
		focusInvalid: false, // do not focus the last invalid input
		rules: {
		  otp :{
			  required:true,
				digits:true
		  },
		},
    messages : {
      otp :{
          required:'Please enter the OTP.',
					digits:'The OTP must be a number.'
      },
    },
  	submitHandler: function (form) {
      form.submit();
			$('#alert-ajax-success').hide();
			$('#alert-ajax-danger').hide();
      $("#btnSubmit").attr("disabled","disabled");
    }
  });

});

$('#btnResendOTP').on('click',function(){

	$.ajax({
			headers: {
			 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		 },
		 url: baseURL+'/customer/otp/resend',
		 type: "POST",
		 data : {user_id:$('#user_id').val()},
		 success:function(result) {
			 console.log(result);
			 if (result.status) {
				 $('#alert-ajax-success').show();
				 $('#alert-ajax-danger').hide();
				 $('#alert-ajax-success').html(result.message);
			 }else {
				 $('#alert-ajax-danger').show();
				 $('#alert-ajax-success').hide();
				 $('#alert-ajax-danger').html(result.message);
			 }
		 }
	 });
});
