$(document).ready(function() {
    $('div .main').next().removeClass("col-lg-9");
    $('div .main').next().removeClass("col-xl-9");
    $('div .main').next().addClass("sup-dasboard custom_collapse_nav");
    $('#classTagsInput').parents('div .col-md-12').hide();
      
    if(window.matchMedia("(max-width: 767px)").matches){
         $('.main').removeClass('fliph'); 
    }
    else{
          $('.main').addClass('fliph'); 
    }
    $('a[data-toggle=tooltip]').tooltip();
    $('.button-left').click(function(){
         $('.main').toggleClass('fliph');  
         $('.main .user-panel').toggle(); 
         if($('.main').hasClass('fliph')){
            $('.button-left').find('span').removeClass('fa-bars');
            $('.button-left').find('span').addClass('fas fa-times');
         }else{
            $('.button-left').find('span').addClass('fa-bars');
            $('.button-left').find('span').removeClass('fas fa-times');
         }
    });

    if($('.main').hasClass('fliph')){
            $('.button-left').find('span').removeClass('fa-bars');
            $('.button-left').find('span').addClass('fas fa-times');
    }

    $(".table_nav ul li > a").click(function() {
            $('.table_nav ul li a.active').removeClass('active');
            $(this).toggleClass("active");
            $(this).parent("li").siblings("li").find("ul").removeClass("active");
            $(this).parent("li").siblings("a").removeClass("active");
        });

    $(".sidebar-dropdown > a").click(function () {
            
          if ($(".sub-menu").hasClass("show")) {

            $(".sub-menu").removeClass("show");
            $(".sub-menu").slideUp(200);
            return false;
          } else {
                $('this').next('ul').addClass('show');
          }
        });

    if($(window).width() < 1025) {
        $("nav ul li.sub-menu > a").click(function() {
            if($(this).parent("li").find("ul").css('display') == 'block') {
                $(this).parent("li").find("ul").css('display','none');
                // $(".menu-overlay-pad").removeClass("active");
            } else {
                $(this).parents("ul").find("ul").hide();
                $(this).parent("li").find("ul").show();
                // $(".menu-overlay-pad").addClass("active");
            }
        });
      
    }
    if($(window).width() < 991) {
       $("#nav-icon").click(function() {
            $(this).toggleClass("active");
            $("nav").toggleClass("active");
            $(".menu-overlay").toggleClass("active");
            $("body").toggleClass("stop");
            $("header nav ul li.sub-menu ul").removeClass("active");
            $("header nav ul li.sub-menu").removeClass("active");
        });
       $(".menu-overlay").click(function() {
            $("nav").removeClass("active")
            $(".menu-overlay").removeClass("active");
            $("#nav-icon").removeClass("active");
            $("body").removeClass("stop");
            $("header nav ul li.sub-menu ul").removeClass("active");
            $("header nav ul li.sub-menu").removeClass("active");
        });
        $("nav ul li.sub-menu > a").click(function() {

            $(this).siblings("ul").toggleClass("active");
            $("nav ul li.sub-menu").toggleClass("active");
            $(this).parent("li").siblings("li").find("ul").removeClass("active");
            $(this).parent("li").siblings("nav ul li.sub-menu").removeClass("active");
        });

    }

   
    $("nav ul li.sub-menu > a").unbind('mouseenter mouseleave');
    $('#new-slider').owlCarousel({
        loop: true,
        margin: 0,
        autoplay: true,
        autoplayTimeout: 3000,
        responsiveClass: true,
        nav:true,
        navText: ['<img src="'+imagePath+'images/left-logo.png">','<img src="'+imagePath+'images/right-logo.png">'],
        responsive: {
            320: {
                items: 1,
                loop: true,
                stagePadding: 30,
            },
            610: {
                items: 2,
                loop: true,
                stagePadding: 50,
            },
            767: {
                items: 2,
                loop: true,
                stagePadding: 50,
            },
            800: {
                items: 3,
                loop: true,
                stagePadding: 10,
                loop: false
            },
            1025: {
                items: 3,
                autoplay: false,
                loop: false
            }
        }
    });
    $('#lesson-slider').owlCarousel({
        loop: true,
        margin: 0,
        nav:true,
        autoplay: true,
        navText: ['<img src="'+imagePath+'images/left-logo.png">','<img src="'+imagePath+'images/right-logo.png">'],
        autoplayTimeout: 3000,
        responsiveClass: true,
        responsive: {
            320: {
                items: 1,
            },
            400: {
                items: 2,
            },
            576: {
                items: 3,
            },
            768: {
                items: 4,
            },
            1025: {
                items: 5,
            },
            1200: {
                items: 7,
            }
        }
    });


    $('#yoga-quotes-slider').owlCarousel({
        loop: true,
        margin: 0,
        nav:false,
        autoplay: true,
        // navText: ['<img src="'+imagePath+'images/left-logo.png">','<img src="'+imagePath+'images/right-logo.png">'],
        autoplayTimeout: 4000,
        responsiveClass: true,
        responsive: {
            320: {
                items: 1,
            }
        }
    });
    
    $('#welness-testimonial-slider').owlCarousel({
        loop: true,
        margin: 0,
        nav:false,
        autoplay: true,
        // navText: ['<img src="'+imagePath+'images/left-logo.png">','<img src="'+imagePath+'images/right-logo.png">'],
        autoplayTimeout: 4000,
        responsiveClass: true,
        responsive: {
            320: {
                items: 1,
            }
        }
    });
    
    $(".fancybox").fancybox();

    if (navigator.userAgent.search("MSIE") >= 0) {
        $('html').addClass('MSIE');
    } else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
        $('html').addClass('Safari');
    }

    setTimeout(function(){
      $('.alert-success').hide();
      $('.alert-danger').hide();
    },15000);

    window.addEventListener("resize", myFunction);
    myFunction();
    function myFunction() {
        var screenWidthCurr = $(document).width();
        if (screenWidthCurr > 670) {
            $(".flaticon-phone-receiver").parent().attr("href","javascript:void(0)");
        } else {
            $(".flaticon-phone-receiver").parent().attr("href","tel:1"+contactPhoneTo);
        }
    } 
});
$('.on_co_details_fdtt li.sub_menu .drop_menu').click(function(){
    $(this).parent('li.sub_menu').toggleClass('active');
    $(this).parent("li.sub_menu").siblings().removeClass("active");
    $('.menu_overlay').addClass('active');
    
    if ($(this).parent('li.sub_menu').hasClass('redirect_on_click')) {
        var hrefLoc = $(this).parent('li.sub_menu').find('a').attr('href');
        if (hrefLoc) {
            window.location.href = hrefLoc;
        }
    }
    // return false;
});

$('.my_profile_menu_toggle').click(function(){
    $(this).toggleClass("active");
    $('.on_co_details_fdtt').toggleClass("active");
});

// $(document).click(function (e){
//     var element = $(".my_profile_menu_toggle");

//     if (!element.is(e.target) && element.has(e.target).length === 0)
//         //element.removeClass("active");
//         $('.on_co_details_fdtt').removeClass('active');
// });


$(document).on('click','.add-individual-coupon',function(){
    var assetId = $(this).attr('data-id');
    var applicableType = $(this).attr('data-applicable-type');

    $('#is_applicable_for').val(applicableType);
    $('#applicable_asset_id').val(assetId);
    $('#addIndividualCouponModal').modal('show');
    // alert(assetId);
})

$('#form-add-individual-coupon').validate({
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
                },
                'd_max_amount' : {
                    required : true,
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


$('#btn-show-contact-instructor-form').on('click',function(){
    var id = $(this).attr('data-id');
    var name = $(this).attr('data-name');
    var image = $(this).attr('data-image');

    $('#supplier_img').attr('src',image);
    $('#supplier_name').text(name);
    $('#supplier_name_1').text(name);
    $('#supplier_id').val(id);
    $('#showContactInstructorForm').modal('show');
});

$('#form-contact-instructor').validate({
        errorElement: 'span', //default input error message container
        focusInvalid: false, // do not focus the last invalid input
        ignore: [],
        invalidHandler: function(form, validator) {
          $('html,body').animate({
           scrollTop: $("form").offset().top},
          50);
        },
        rules: {
                name : {
                    required : true,
                },
                email : {
                    required : true,
                },
                message : {
                    required : true,
                },
            },
        messages : {
                 name : {
                    required : 'Please enter your name.',
                },
                email : {
                    required : 'Please enter your email-id.',
                },
                message : {
                    required : 'Please enter the message.',
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
            $.ajax( {
                url: baseURL+'/instructor-contact-form-submit',
                type: "POST",
                data: $('#form-contact-instructor').serialize(),
                beforeSend: function () {
                }

              } )
              .done( function ( data ) {
                console.log(data);
                if (data.status) {
                    // $('#loader-div').show();
                    $('#loader-div').hide();
                    $('#alert-online-class-popup-success').show();
                    $('#alert-online-class-popup-success').html(data.message);
                    $('#alert-online-class-popup-danger').hide();
                } else {
                    $('#loader-div').hide();
                    $('#alert-online-class-popup-danger').show();
                    $('#alert-online-class-popup-success').hide();
                    $('#alert-online-class-popup-danger').html(data.message);
                }
              } );
        }
  });


//Add meeting into the zoom account
function addZoomLinkToAccount(dataZoom){
        console.log(dataZoom);
        $('#loader-div').show();
        $.ajax( {
            url: baseURL+'/add-meeting-into-zoom',
            type: "POST",
            data: dataZoom,
            beforeSend: function () {
            }

          } )
          .done( function ( data ) {
            console.log(data);
            if (data.status) {
                $('#loader-div').hide();
                $('.add-to-zoom-link-textbox').val(data.zoom_link);
                $('#zoom-custom-error-span').remove();
            } else {
                $('#loader-div').hide();
                $('#zoom-custom-error-span').remove();
                var html = "<span class='error' id='zoom-custom-error-span'>"+data.message+"</span>";
                // $('.add-to-zoom-link-textbox').after( html );
                swal(data.message, {
                    icon: "warning",
                }).then((willProceed) => {
                    // window.location.reload();
                    url = baseURL+'/my-profile#profile-zoom-integration-div';
                    window.open(url,'_blank');
                    // $('html, body').animate({
                    //    scrollTop: $("#moreInfo").offset().top
                    //  }, 1000);
                });
            }
          } );
}

//Srervice category on change 
$('#service_category_id').on('change',function(){
    var service_category_id = $('#service_category_id').val();
    if (service_category_id) {
        $('#loader-div').show();
        $.ajax( {
            url: baseURL+'/get-category-services',
            type: "POST",
            data: {i_category_id:service_category_id},
            beforeSend: function () {
            }

          } )
          .done( function ( data ) {
            console.log(data);
            if (data.status) {
                $('#loader-div').hide();
                $('#service_id').html(data.html);
            } else {
                $('#loader-div').hide();
                
                swal(data.message, {
                    icon: "error",
                });
            }
          } );
    }
})


//On click of signup for free buton or label on home page
$('.sign_up_free_label').on('click',function(){
    $('#freeSignupLabelModal').modal({
        backdrop: 'static',
        keyboard: false
    });
})

function addClassTypeChange(){
    var selectvalue = $('input[name=add_class_type]:checked').val();

    if(selectvalue == "Online"){
    window.open(baseURL+'/add-live-class','_self');
    return true;
    }
    else if(selectvalue == "Pre_Recorded"){
    window.open(baseURL+'/add-prerecorded-live-class','_self');
    return true;
    }else if(selectvalue == 'In_Person'){
    window.open(baseURL+'/add-in-person-live-class','_self');
    return true;
    }else if(selectvalue == 'Series'){
    window.open(baseURL+'/add-series-class','_self');
    return true;
    }
    return false;
}