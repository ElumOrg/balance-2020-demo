function subscriptionPopup(){
    // get the mPopup
    // var mpopup = $('#mpopupBox');
    // mpopup.show();
    // $(".close").on('click',function(){
    //     mpopup.hide();
    // });
    // $(window).on('click', function(e) {
    //     if(e.target == mpopup[0]){
    //         mpopup.hide();
    //     }
    // });

    var mpopup = $('#mpopupBox');
    $('#mpopupBox').addClass('active');

    $(".close").on('click',function(){
        $('#mpopupBox').removeClass('active');
        $.cookie('popDisplayed', '1', { expires: 7 });
    });
    $(window).on('click', function(e) {
        if(e.target == mpopup[0]){
            $('#mpopupBox').removeClass('active');
            $.cookie('popDisplayed', '1', { expires: 7 });
        }
    });

}

$(document).ready(function() {
    $('#alert-ajax-success').hide();
    $('#alert-ajax-danger').hide();
    var popDisplayed = $.cookie('popDisplayed');
    // alert(popDisplayed);
    if(popDisplayed == '1'){
        return false;
    }else{
        setTimeout( function() {
            subscriptionPopup();
        },1000);
        // $.cookie('popDisplayed', '1', { expires: 7 });
    }
    // subscriptionPopup();
});


$('#newletter-form').validate({
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
            },
            
        },
        submitHandler: function (form, event) {
            $('#submit-newsletter').attr("disabled","disabled");

          $.ajax({
            url: baseURL+'/newsletter/subscribe',
            type: 'POST',
            data: $('#newletter-form').serialize(),
            success: function (result) {
                $('#submit-newsletter').attr("disabled",false);
                        console.log(result.status);
              if (result.status) {
                            // $('#loader-div').show();
                            $('#alert-ajax-success').show();
                            $('#alert-ajax-danger').hide();
                            $.cookie('popDisplayed', '1', { expires: 21 })
              } else {
                            $('#alert-ajax-danger').show();
                            $('#alert-ajax-success').hide();
                            $('#alert-ajax-danger').html(result.message);
              }
            },
            error: function (xhr, ajaxOptions, thrownError) {
              $("#error-action-supplier").html('Something went wrong. Please try again');
            }
          });
        }
  });