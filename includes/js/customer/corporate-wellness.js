$('#wellness_contact_form').validate({
    rules: {
      email :{
        required:true,
        email:true,
      },
      firstname: {
        required: true,
      },
      lastname: {
        required: true,
      },
      companyname: {
        required: true,
      },
      Phonenumber: {
        digits:true,
        minlength:10,
        maxlength:10,
      },
      city: {
        required: true,
      },
      state: {
        required: true,
      },
      country: {
        required: true,
      }
    },
    messages : {
      email :{
          required:'Email ID is required.',
          email:'Please enter a valid Email-Id.',
      },
      firstname  :{
          required:'Please enter the first name.',
      },
      lastname  :{
          required:'Please enter the last name.',
      },
      companyname  :{
          required:'Please enter the company name.',
      },
      city: {
        required: 'Please enter the city.',
      },
      state: {
        required: 'Please enter the state.',
      },
      country: {
        required: 'Please enter the country.',
      }
    },
    submitHandler: function (form) {
      $.ajax( {
        url: baseURL+'/corporate-wellness/submit',
        type: "POST",
        data: $('#wellness_contact_form').serialize(),
        beforeSend: function () {
          $('#loader-div').show();
        }

      } )
      .done( function ( data ) {
        $('#loader-div').hide();

        if (data.status) {
          swal(data.message, {
                icon: "success",
              }).then((willProceed) => {
                window.location.reload();
              });

        }else{
          swal(data.message, {
                icon: "error",
              }).then((willProceed) => {
                window.location.reload();
              });
        }
      
      } );
    }
  });