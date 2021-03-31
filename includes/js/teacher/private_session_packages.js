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

$(document).on('click', '.view-private-session-package', function () {
    packageid = $(this).data('package-id');
    $('#loader-div').show();
    $.ajax({
                    url: baseURL+'/teacher-private-session-packages/view',
                    type: 'POST',
                    data: {packageid:packageid},
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


$('#form-add-private-packages').validate({
        errorElement: 'span', //default input error message container
        focusInvalid: false, // do not focus the last invalid input
        ignore: [],
        invalidHandler: function(form, validator) {
          $('html,body').animate({
           scrollTop: $("form").offset().top},
          50);
        },
        rules: {
                'p_title' : {
                    required:true,
                },
                'p_description' : {
                    required:true,
                },
                'p_price' : {
                    required:true,
                },
                
                'included_in_package' : {
                    required:true,
                },
                
                'i_service' : {
                    required:true,
                },

                'e_type' : {
                    required:true,
                },
            },
        messages : {
                'p_title' : {
                    required:'Please enter the title.',
                },
                'p_description' : {
                    required:'Please enter the description.',
                },
                'p_price' : {
                    required:'Please enter the price.',
                },
                // 'i_hours' : {
                //     required:'Please enter the no. of hours.',
                // },
                // 'no_of_session_included' : {
                //     required:'Please enter the no. of sessions.',
                // },
                'included_in_package' : {
                    required:'Please select the one.',
                },
                'i_service' : {
                    required:'Please select the service.',
                },
                'e_type' : {
                    required:'Please select the type.',  
                }
        },
        errorPlacement: function(error, element) 
        {
            error.insertAfter(element.parent());
        },
        submitHandler: function (form, event) {
            $('#loader-div').show();
            form.submit();
            
        }
  });

$(document).on('click','.delete-private-session-package', function(){
    packageId = $(this).data('package-id');

    swal({
      title: 'Delete Package?',
      text: 'Are you sure you want to delete this package?',
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willProceed) => {
        if (willProceed) {  
        $('#loader-div').show();  
            $.ajax({
                            url: baseURL+'/teacher-private-session-packages/delete',
                            type: 'POST',
                            data: {packageId:packageId},
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


