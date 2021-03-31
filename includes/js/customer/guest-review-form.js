$(document).ready(function() {
	$('#form-survay').validate({
    ignore: [],
    errorElement: 'span', //default input error message container
    errorClass: 'span-error', // default input error message class
		rules: {
      first_name:{
        required : true
      },
      last_name:{
        required : true
      },
      email:{
        required : true,
        email:true,
      },
      teacher_review:{
        required : true
      },
      rate_satisfied :{
        required : true
      },
      teacher_testimonial : {
        required : true,
      },
		},
    messages : {
      first_name:{
        required : 'Please enter the first name.'
      },
      last_name:{
        required : 'Please enter the last name.'
      },
      email:{
        required : 'Please enter the email.',
        email:true,
      },
      teacher_review:{
        required : 'Please enter the review.'
      },
      rate_satisfied :{
        required : 'Plase add ratings',
      },
      rate_logistics :{
        required : 'Plase add ratings',
      },
      teacher_testimonial : {
        required : 'Please enter the testimonial',
      },
    },
    
  	submitHandler: function (form) {
      form.submit();
      $("#customer-signup").attr("disabled","disabled");
    }
  });

});