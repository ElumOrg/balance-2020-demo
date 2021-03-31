$(document).ready(function(){
    $('#loader-div').hide();
});

function showNewsletterPopup(){
    $("#onlineClassPopup").css('display','inline-flex');
}
function closeNewsletterPopup(){
    $("#onlineClassPopup").css('display','none');
}

$('#online-class-popup-form').validate({
        errorElement: 'span', //default input error message container
        focusInvalid: false, 
        rules: {
            v_firstname:{
                required:true,
            },
            v_lastname:{
                required:true,
            },
            v_email:{
                required:true,
            },
        },
        messages : {
            v_firstname:{
                required:'Please enter the first name.',
            },
            v_lastname:{
                required:'Please enter the last name.',
            },
            v_email:{
                required:'Please enter the email address.',
            }
        },
        submitHandler: function (form, event) {
            $('#online-class-popup-submit').attr("disabled","disabled");
            $('#loader-div').show();
          $.ajax({
            url: baseURL+'/newsletter/online-class-free',
            type: 'POST',
            data: $('#online-class-popup-form').serialize(),
            success: function (result) {
                $('#online-class-popup-submit').attr("disabled",false);
                        console.log(result.status);
                if (result.status) {
                    // $('#loader-div').show();
                    $('#loader-div').hide();
                    $('#alert-online-class-popup-success').show();
                    $('#alert-online-class-popup-success').html(result.message);
                    $('#alert-online-class-popup-danger').hide();
                } else {
                    $('#loader-div').hide();
                    $('#alert-online-class-popup-danger').show();
                    $('#alert-online-class-popup-success').hide();
                    $('#alert-online-class-popup-danger').html(result.message);
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
              $("#alert-online-class-popup-danger").html('Something went wrong. Please try again');
            }
          });
        }
  });