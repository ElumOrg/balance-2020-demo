$('#form-customer-dashboard').validate({
  ignore: [],
  errorElement: 'span', //default input error message container
  errorClass: 'span-error', // default input error message class
  focusInvalid: false, // do not focus the last invalid input
  rules: {
    available_date	:{
      required : true,
    },
    v_post_code	:{
      required : true,
      digits:true,
    },
    service_id	:{
      required : true,
    },
    select_duration	:{
      required : true,
    },
  },
    messages : {
      available_date	:{
        required : 'Please select the date and time.',
      },
      v_post_code	:{
        required : 'Please enter the zip code.',
        digits: 'Please enter the numbers.',
      },
      service_id	:{
        required : 'Please select the sessions type.',
      },
      select_duration	:{
        required : 'Please select the duration.',
      },


    },
    submitHandler: function (form) {
      form.submit();
      $("#btnSubmit").attr("disabled","disabled");
    }
});
