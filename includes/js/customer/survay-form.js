$(document).ready(function() {
	$('#form-survay').validate({
    ignore: [],
    errorElement: 'span', //default input error message container
    errorClass: 'span-error', // default input error message class
		rules: {
      rate_satisfied :{
        required : true
      },
      rate_logistics :{
        required : true
      },
      // teacher_testimonial : {
      //   required : true,
      // },
      // class_testimonial : {
      //   required : true,
      // },
		},
    messages : {
      rate_satisfied :{
        required : 'Plase add ratings',
      },
      rate_logistics :{
        required : 'Plase add ratings',
      },
      // teacher_testimonial : {
      //   required : 'Please enter the review',
      // },
      // class_testimonial : {
      //   required : 'Please enter the testimonial',
      // },
    },
    
  	submitHandler: function (form) {
      form.submit();
      $("#customer-signup").attr("disabled","disabled");
    }
  });

});