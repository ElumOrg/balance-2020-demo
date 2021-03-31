$(document).ready(function() {

	setTimeout(function(){
		$('.alert-danger').hide();
	},5000);

	$('#form-supplier-signin').validate({
		ignore: [],
		errorElement: 'span', //default input error message container
		errorClass: 'span-error', // default input error message class
		focusInvalid: false, // do not focus the last invalid input
		rules: {
		  email :{
			  required:true,
			  email:true,
		  },
		  password  :{
			  required:true,
			  minlength:6,
		  }
		},
    messages : {
      email :{
          required:'Email ID is required.',
          email:'Please enter a valid Email ID.',
      },
      password  :{
          required:'Password is required.',
      },
    },
  	submitHandler: function (form) {
      form.submit();
      $("#btnSubmit").attr("disabled","disabled");
    }
  });

});
