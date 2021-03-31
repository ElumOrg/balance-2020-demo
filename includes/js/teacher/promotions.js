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

// $(document).on('click', '.send-promotion-invitaion', function () {
//     couponid = $(this).data('coupon-id');
//     $('#loader-div').show();
//     $.ajax({
//                     url: baseURL+'/teacher-coupon-promotions/send-invitation',
//                     type: 'POST',
//                     data: {couponid:couponid},
//                     success: function (result) {
//                         if (result.status) {
//                             $('#loader-div').hide();
//                             $('#view-package-table').html(result.html);
//                             $('#address-modal-title').html(result.arrPackaeDetails.title);
//                             $('#studentsInvitation').modal({
//                                 backdrop: 'static',
//                                 keyboard: false
//                             });
//                         } else {
//                             $('#loader-div').hide();
//                             $('#alert-ajax-danger').show();
//                             $('#alert-ajax-danger').html(result.message);
//                         }
//                     },
//                     error: function (xhr, ajaxOptions, thrownError) {
//                         $('#loader-div').hide();
//                         $('#alert-ajax-danger').html('Something went wrong. Please try again');
//                     }
//                 });
    
// });

$('#form-invitation-student').validate({
        errorElement: 'span', //default input error message container
        focusInvalid: false, // do not focus the last invalid input
        invalidHandler: function(form, validator) {
          $('html,body').animate({
           scrollTop: $("form").offset().top},
          50);
        },
        rules: {
                "v_email":{
                    required:true,
                },
                'v_invitation_subject' : {
                    required:true,
                },
                'v_invitation_content' : {
                    required:true,
                },
            },
        messages : {
                "v_email":{
                    required:'Please enter the email(s).',
                },
                'v_invitation_subject' : {
                    required:'Please enter the subject.',
                },
                'v_invitation_content' : {
                    required:'Please enter the content',
                },
        },
        submitHandler: function (form, event) {
            url = baseURL + '/teacher-coupon-promotions/send-invitation';
            $('#loader-div').show();
          $.ajax({
            url: url,
            type: 'POST',
            data: $('#form-invitation-student').serialize(),
            success: function (result) {
              console.log(result.status);
              if (result.status) {
                            $('#loader-div').show();
                            $("#customService").modal('hide');
                            $('#alert-ajax-danger').hide();
                            swal(result.message, {
                                icon: "success",
                            }).then((willProceed) => {
                                window.location.reload();
                            });
              } else {
                $('#alert-ajax-danger').show();
                            $('#alert-ajax-danger').html(result.message);
              }
            },
            error: function (xhr, ajaxOptions, thrownError) {
              $("#error-action-supplier").html('Something went wrong. Please try again');
            }
          });
        }
  });

$(document).on('click', '.send-promotion-invitaion', function () {
    couponid = $(this).data('coupon-id');
    v_coupon = $(this).data('coupon');
    $('#invite_coupon_id').val(couponid);
    $('#v_coupon').val(v_coupon);

    var content = 'Please use the '+v_coupon+' coupon code to book the classes, and enjoy the Balance Withus!';
    $('#v_invitation_content').val(content);
    $('#studentsInvitation').modal({
        backdrop: 'static',
        keyboard: false
    });
});


jQuery.validator.addMethod("greaterThan", 
function(value, element, params) {

    if (!/Invalid|NaN/.test(new Date(value))) {
        return new Date(value) > new Date($(params).val());
    }

    return isNaN(value) && isNaN($(params).val()) 
        || (Number(value) > Number($(params).val())); 
},'Must be greater than start date.');

$('#form-add-coupon').validate({
        errorElement: 'span', //default input error message container
        focusInvalid: false, // do not focus the last invalid input
        ignore: [],
        invalidHandler: function(form, validator) {
          $('html,body').animate({
           scrollTop: $("form").offset().top},
          50);
        },
        rules: {
                'v_title' : {
                    required : true,
                },
                'coupon_code' : {
                    required : true,
                },
                
                'v_desc':{
                         required: function() 
                        {
                         CKEDITOR.instances.v_desc.updateElement();
                        },

                },
                'f_discount_in_precentage' : {
                    required : true,
                    number:true
                },
                'd_max_amount' : {
                    required : true,
                    number:true
                },
                'd_start_date' : {
                    required : true,
                },
                'd_end_date' : {
                    required : true,
                    greaterThan: "#d_start_date"
                },
                'i_max_use_per_user' : {
                    required : true,
                    digits:true
                },
                'video_access_count' : {
                    required:function(){
                        if ($('#video_access').is(':checked')) {
                            return true;
                        }else{
                            return false;
                        }
                    },
                    digits:true,
                },
            },
        messages : {
                'v_title' : {
                    required : 'Please enter the title.',
                },
                'coupon_code' : {
                    required : 'Please enter the copun code.',
                },
                'v_desc' : {
                    required : 'Please enter the description.',
                },
                'f_discount_in_precentage' : {
                    required : 'Please enter the discount.',
                },
                'd_max_amount' : {
                    required : 'Please enter the maximum amount.',
                },
                'd_start_date' : {
                    required : 'Please enter the start date.',
                },
                'd_end_date' : {
                    required : 'Please enter the end date.',
                },
                'i_max_use_per_user' : {
                    required : 'Please enter the maximum use per user.',
                },
                'is_visible_to_all':{
                    required : 'Please select the option.',
                }
        },
        errorPlacement: function(error, element) 
        {
            console.log(element);
            if (element.attr("type") == "file") {
                error.insertAfter(element.parent());
            }else if(element.attr("name") == "v_desc"){
                error.insertAfter(element.parent());
            }else{
                error.insertAfter(element);
            }
        },
        submitHandler: function (form, event) {
            $('#loader-div').show();
            form.submit();
            
        }
  });


$(document).on('click','.delete-teacher-coupon', function(){
    couponid = $(this).data('coupon-id');

    swal({
      title: 'Delete Coupon?',
      text: 'Are you sure you want to delete this coupon?',
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willProceed) => {
        if (willProceed) {  
        $('#loader-div').show();  
            $.ajax({
                            url: baseURL+'/teacher-coupon-promotions/delete',
                            type: 'POST',
                            data: {couponid:couponid},
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

$(document).on('change','.selectallCoupons',function(){
   $('.selectedCouponId').prop('checked', this.checked);       
});

$(document).on('click', '.delete-selected-coupon', function () {
        
        var selectedIds = [];
        $(".selectedCouponId").each(function () {
            if (this.value != '' && this.checked) {
                var id = this.value;
                selectedIds.push(id);
            }
        });

        if (selectedIds.length == 0) {
            swal("please select records.", {
                                    icon: "error",
                                });
        }else{


            swal({
              title: 'Delete Coupons?',
              text: 'Are you sure you want to delete selected coupons?',
              icon: "warning",
              buttons: true,
              dangerMode: true,
            })
            .then((willProceed) => {
                if (willProceed) {
                    $('#loader-div').show();
                    $.ajax({
                        url: baseURL+'/teacher-coupon-promotions/delete-selected',
                        type: 'POST',
                        data: {selectedIds:selectedIds},
                        success: function (result) {
                            if (result.status) {
                                $('#alert-ajax-danger').hide();
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
        }
});

function validURL() {
      var str = $('#v_email').val();

      if(str != ''){
          var emails = str.split(',');
            // console.log(str);
          var invalidEmails = [];

          for (i = 0; i < emails.length; i++) { 
                // alert(emails[i]);
              if(!validateEmail(emails[i].trim())) {
                invalidEmails.push(emails[i].trim());
               }
          }
      }else{
        $('#invalid-email').hide();
      }
}

function validateEmail(str)
{
    
       var pattern =  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
       var status = pattern.test(str);
       if(status == false)
       {
        $('#invalid-email').show();
        $('#invalid-email').html("please enter valid emails");
        
        $('#btn-send-register-link').prop('disabled',true);
        return false;
       }else{
                $('#invalid-email').html("");
        $('#btn-send-register-link').prop('disabled',false);
       }
}


/*****************************      GIFT CERTIFICATES    ***********************************/

$('#pencil-gift-card-image').on('click',function(){
    $('#giftcardUpload').trigger('click');
});

$('#giftcardUpload').on('change',function(evt){
    var file=evt.currentTarget.files[0];
    var reader = new FileReader();
    var image  = new Image();
    reader.onload = function (evt)
     {
             if((file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/gif') )
             {
                     if(~~(file.size/1024) <4000)
                     {
                             image.src = evt.target.result;
                             image.onload = function()
                             {
                                     var w = this.width, h = this.height, t = file.type, n = file.name, file_size = ~~(file.size/1024);
                                         $('#service-banner-image-src').attr("src", evt.target.result);
                                     
                             }
                     } else {
                             $('#giftcardUpload').val('');
                             alert("The maximum size for file upload is 4Mb.");
                             return false;
                     }

             } else {
                     $('#giftcardUpload').val('');
                     alert("Please upload image with extensions:jpeg,jpg,png.");
                     return false;
             }
     };
     reader.readAsDataURL(file);
});

$('#form-add-gift-sertificate').validate({
        errorElement: 'span', //default input error message container
        focusInvalid: false, // do not focus the last invalid input
        ignore: [],
        invalidHandler: function(form, validator) {
          $('html,body').animate({
           scrollTop: $("form").offset().top},
          50);
        },
        rules: {
                'v_title' : {
                    required : true,
                },
                't_instruction' : {
                    required : true,
                },
                'd_price' : {
                    required : true,
                    number:true
                },
                'i_validity_days' : {
                    required : true,
                    digits:true
                },
                
            },
        messages : {
                'v_title' : {
                    required : 'Please enter the title.',
                },
                't_instruction' : {
                    required : 'Please enter the instructions.',
                },
                'd_price' : {
                    required : 'Please enter the price.',
                },
                'i_validity_days' : {
                    required : 'Please enter the validity (in days).',
                },
        },
        errorPlacement: function(error, element) 
        {
            console.log(element);
            if (element.attr("type") == "file") {
                error.insertAfter(element.parent());
            }else if(element.attr("name") == "v_desc"){
                error.insertAfter(element.parent());
            }else{
                error.insertAfter(element);
            }
        },
        submitHandler: function (form, event) {
            $('#loader-div').show();
            form.submit();
            
        }
});

$(document).on('click','.delete-teacher-gift-certificate', function(){
    certificateid = $(this).data('certificate-id');

    swal({
      title: 'Delete Gift Certificate?',
      text: 'Are you sure you want to delete this gift certificate?',
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willProceed) => {
        if (willProceed) {  
        $('#loader-div').show();  
            $.ajax({
                            url: baseURL+'/teacher-coupon-promotions/gift-certificate/delete',
                            type: 'POST',
                            data: {certificateid:certificateid},
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

$(document).on('change','.selectallGifts',function(){
   $('.selectedGiftsId').prop('checked', this.checked);       
});

$(document).on('click', '.delete-selected-gift-certificate', function () {
        
        var selectedIds = [];
        $(".selectedGiftsId").each(function () {
            if (this.value != '' && this.checked) {
                var id = this.value;
                selectedIds.push(id);
            }
        });

        if (selectedIds.length == 0) {
            swal("please select records.", {
                                    icon: "error",
                                });
        }else{


            swal({
              title: 'Delete Gift Certificates?',
              text: 'Are you sure you want to delete selected gift certificate?',
              icon: "warning",
              buttons: true,
              dangerMode: true,
            })
            .then((willProceed) => {
                if (willProceed) {
                    $('#loader-div').show();
                    $.ajax({
                        url: baseURL+'/teacher-coupon-promotions/gift-certificate/delete-selected',
                        type: 'POST',
                        data: {selectedIds:selectedIds},
                        success: function (result) {
                            if (result.status) {
                                $('#alert-ajax-danger').hide();
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
        }
});


$('#d_price').on('input',function(){
    $('#waiting-spinner').html('<i class="fa fa-refresh fa-spin"></i></span>');
    $.ajax({
            url: baseURL+'/teacher-coupon-promotions/gift-certificate/get-images',
            type: 'POST',
            data: {price:$('#d_price').val()},
            success: function (result) {
                if (result) {
                    $('#waiting-spinner').html('');
                    $('#extra-images-according-price').append(result);
                } else {
                    $('#waiting-spinner').html('');
                    $('.new-element').remove('');
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $('#waiting-spinner').html('');
                $('#loader-div').hide();
                $('#alert-ajax-danger').html('Something went wrong. Please try again');
            }
        });
});