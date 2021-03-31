 $(document).ready(function() {
        $("#video_access").on('click', function() {
            if($(this).prop("checked") == true){
                $("#video_access_count_div").show();
                $("#video_access_count").addClass('required');

            }else{
                $("#video_access_count_div").hide();
                $("#video_access_count").removeClass('required');

            }
        });

        $('#loader-div').hide();
});

$(document).on('click', '.send-invitaion', function () {
    subscriptionid = $(this).data('package-id');
    $('#loader-div').show();
    $.ajax({
                    url: baseURL+'/teacher-own-class-membership/view',
                    type: 'POST',
                    data: {subscriptionid:subscriptionid},
                    success: function (result) {
                        if (result.status) {
                            $('#loader-div').hide();
                            $('#view-package-table').html(result.html);
                            $('#address-modal-title').html(result.arrPackaeDetails.title);
                            $('#studentsInvitation').modal({
                                backdrop: 'static',
                                keyboard: false
                            });
                        } else {
                            $('#loader-div').hide();
                            $('#alert-ajax-danger').show();
                            $('#alert-ajax-danger').html(result.message);
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        $('#loader-div').hide();
                        $('#alert-ajax-danger').html('Something went wrong. Please try again');
                    }
                });
    
});


$('#form-add-membership').validate({
        errorElement: 'span', //default input error message container
        focusInvalid: false, // do not focus the last invalid input
        ignore: [],
        invalidHandler: function(form, validator) {
          $('html,body').animate({
           scrollTop: $("form").offset().top},
          50);
        },
        rules: {
                'title' : {
                    required:true,
                },
                'tagline' : {
                    required:true,
                    maxlength:300,
                },
                'original_monthly_cost' : {
                    number:true,
                },
                'monthly_cost' : {
                    required:true,
                    number:true,
                },
                'no_of_classes' : {
                    required:true,
                    
                    
                },
                'yearly_cost' : {
                    required:true,
                    number:true,
                },
                

                'video_access_count' : {
                    required:function(){
                        if ($('#video_access').is(':checked')) {
                            return true;
                        }else{
                            return false;
                        }
                    },
                    
                },
            },
        messages : {
                'title' : {
                    required:'Please enter the title.',
                },
                'tagline' : {
                    required:'Please enter the description.',
                },
                'monthly_cost' : {
                    required:'Please enter the monthly price.',
                },
                'no_of_classes' : {
                    required:'Please enter the no. of classes.',
                },
                'yearly_cost' : {
                    required:'Please enter the yearly cost.',
                },
                'video_access_count' : {
                    required:'Please enter the count of videos.',
                },
        },
        // errorPlacement: function(error, element) 
        // {
        //     error.insertAfter(element.parent());
        // },
        submitHandler: function (form, event) {
            $('#loader-div').show();
            form.submit();
            
        }
  });

$(document).on('click','.delete-own-membership', function(){
    subscriptionid = $(this).data('package-id');

    swal({
      title: 'Delete Package?',
      text: 'Are you sure you want to delete this membership?',
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willProceed) => {
        if (willProceed) {  
        $('#loader-div').show();  
            $.ajax({
                            url: baseURL+'/teacher-own-class-membership/delete',
                            type: 'POST',
                            data: {subscriptionid:subscriptionid},
                            success: function (result) {
                                if (result.status) {
                                    swal(result.message, {
                                        icon: "success",
                                    }).then((willProceed) => {
                                        window.location.reload();
                                    });
                                } else {
                                    $('#loader-div').hide();
                                    $('#alert-ajax-danger').show();
                                    $('#alert-ajax-danger').html(result.message);
                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                $('#loader-div').hide();
                                $('#alert-ajax-danger').html('Something went wrong. Please try again');
                            }
                        });
        }
    });
});


