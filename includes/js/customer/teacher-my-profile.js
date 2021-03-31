$(document).ready(function() {
	// $('#btnUpdateProfile').attr("disabled", false);
	var hidden_intro_video_type = $('#hidden_intro_video_type').val();
	var hidden_intro_video_added = $('#hidden_intro_video_added').val();

	if (hidden_intro_video_type == 'Upload') {
		$('#video-youtube-or-vimeo-div').hide();
  		$('#video-upload-div').show();
	}else
	{
		$('#video-youtube-or-vimeo-div').show();
  		$('#video-upload-div').hide();
	}

	if (hidden_intro_video_type == '') {
  		$('.video_section').show();
  		$('#video-youtube-or-vimeo-div').hide();
  		$('#video-upload-div').hide();
	}else
	{
		$('.video_section').hide();
	}

	// alert(hidden_intro_video_type,hidden_intro_video_added);
	if (hidden_intro_video_type != '' && hidden_intro_video_added == '') {
		$('.video_section').show();
	}

	var hidden_is_insurance = $('#hidden_is_insurance').val();
	if (hidden_is_insurance == '0') {
		$("#insurance_document_contact").show();
	}

	//Profile section
	$("#my-profile-div :input").attr("disabled", true);
	$("#my-profile-div :input").css('cursor','not-allowed');
	$('#btnUpdateProfile').hide();
	$('#btnCancel').hide();
	$('#pencil-edit-cover-image').hide();
	$('#pencil-edit-profile-image').hide();
	$('.div_v_mute_duration').hide();

	//doc section
	$("#profile-documents-div :input").attr("disabled", true);
	$("#profile-documents-div :input").css('cursor','not-allowed');
	$('#btnUpdateProfileDoc').hide();
	$('#btnCancelDoc').hide();

	//Settings section
	$("#profile-settings-div :input").attr("disabled", true);
	$("#profile-settings-div :input").css('cursor','not-allowed');
	$('#btnUpdateSettings').hide();
	$('#btnCancelSettings').hide();

	//Speciality section
	$("#profile-specialities-div :input").attr("disabled", true);
	$("#profile-specialities-div :input").css('cursor','not-allowed');
	$('#btnUpdateSpeciality').hide();
	$('#btnCancelSpeciality').hide();

	//Video section
	// $("#profile-intro-video-div :input").attr("disabled", true);
	// $("#profile-intro-video-div :input").css('cursor','not-allowed');
	// $('#btnUpdateIntroVideo').hide();
	// $('#btnCancelIntroVideo').hide();

	// $("textarea").attr("disabled", true);
	// $("textarea").css('cursor','not-allowed');
	// $("select").attr("disabled", true);
	// $("select").css('cursor','not-allowed');

	// $('.open_video_section').css({"pointer-events": "none"});

	

	$(".birth_date").datepicker({
      format: 'd-M-yyyy',
			autoclose: true
  	});

	$('.birth_date').keypress(function(e) {
	    e.preventDefault();
	});

	$('.calender-icons').on('click',function(){
		$(".birth_date").datepicker("show");
	});


	$('#form-customer-specif').submit(function(){
		$('#loader-div').show();
		$('#form-customer-specif').submit();
	});

	$('#form-customer-intro').submit(function(){
		if ($(this).data("changed")) {
			// alert();return false;
			$('#loader-div').show();
			$('#form-customer-intro').submit();
	    } else {
	    	// return false;
	        window.location.href = baseURL+'/my-profile';
	    }
	});

	$('#form-customer-profile-docs').submit(function(){
		$('#loader-div').show();
      	$('#form-customer-profile-docs').submit();
	});

	$('#form-customer-profile').validate({
		errorElement: 'span', //default input error message container
		focusInvalid: false, // do not focus the last invalid input
		invalidHandler: function(form, validator) {
      $('html,body').animate({
       scrollTop: $("form").offset().top},
      50);
      },
		rules: {
			v_firstname:{
          required:true,
      },
			v_lastname:{
          required:true,
      },
			e_gender:{
          required:true,
      },
			d_dob:{
          required:true,
      },
      	country_code:{
      		required:true,
      		countryCode:true,
      },
			v_phone:{
          required:true,
					phoneNumber :true,
      },
			v_email:{
          required:true,
					email:true
      },
			v_password:{
          minlength:6,
      },
			e_is_mute:{
          required:true,
      },
			v_timezone:{
          required:true,
      },
			v_mute_duration:{
					required:function(){
						 var mute_value =$('#e_is_mute').val();
						 if (mute_value == 'true') {
							 return true;
						 }else {
							 return false;
						 }
					},
			}
		},
      messages : {
			v_firstname:{
          required:'Please enter the first name.',
      },
			v_lastname:{
          required:'Please enter the last name.',
      },
			e_gender:{
          required:'Please select the gender.',
      },
			d_dob:{
          required:'Please enter the date of birth',
      },
			v_phone:{
          required:'Please enter the phone number.',
      },
			v_email:{
          required:'Please enter the email.',
					email:'Please enter the valid email.'
      },
			e_is_mute:{
          required:'Please select the mute status.',
      },
			v_timezone:{
          required:'Please enter the timezone.',
      },
			v_mute_duration:{
				required:'Please select the duration.'
			}
    },
  	submitHandler: function (form) {
  		$('#loader-div').show();
      form.submit();
      $("#customer-signup").attr("disabled","disabled");
    }
  });

});

$('#e_is_mute').on('change',function(){
	 var mute_value = $(this).val();
	 if (mute_value == 'true') {
		 $('.div_v_mute_duration').show();
	 }else {
		 $('.div_v_mute_duration').hide();
	 }
});

jQuery.validator.addMethod("phoneNumber", function (value, element) {
    return /^[\d+ ]*$/.test(value)
}, "Please enter the valid phone number");

//on click of the edit icon of theprofile form
$('#pencil-edit-profile').on('click',function(){
	$("#profile-documents-div *").attr('disabled',true);
	$('#btnUpdateProfileDoc').hide();
	$('#btnCancelDoc').hide();

	$('#btnCancelSettings').hide();
	$('#btnUpdateSettings').hide();
	$("#profile-settings-div *").attr('disabled',true);
	
	$("#profile-specialities-div *").attr('disabled',true);
	$('#btnUpdateSpeciality').hide();
	$('#btnCancelSpeciality').hide();

	$("#profile-intro-video-div *").attr('disabled',true);
	$('.open_video_section').css({"pointer-events": "none"});
	$('#btnUpdateIntroVideo').hide();
	$('#btnCancelIntroVideo').hide();

	$("#my-profile-div *").attr('disabled',false);
	$("#my-profile-div :input").attr("disabled", false);
	$("#my-profile-div :input").css('cursor','');
	$("select").css('cursor','');
	$("textarea").css('cursor','');
	$('#btnUpdateProfile').show();
	$('#btnCancel').show();
	$('#pencil-edit-profile-image').show();

});


//on click of the edit icon of the documents form
$('#pencil-edit-documents').on('click',function(){
	$('#btnUpdateProfile').hide();
	$('#btnCancel').hide();
	$("#my-profile-div *").attr('disabled',true);

	$('#btnCancelSettings').hide();
	$('#btnUpdateSettings').hide();
	$("#profile-settings-div *").attr('disabled',true);

	$("#profile-specialities-div *").attr('disabled',true);
	$('#btnUpdateSpeciality').hide();
	$('#btnCancelSpeciality').hide();

	$("#profile-intro-video-div *").attr('disabled',true);
	$('.open_video_section').css({"pointer-events": "none"});
	$('#btnUpdateIntroVideo').hide();
	$('#btnCancelIntroVideo').hide();

	$("#profile-documents-div *").attr('disabled',false);
	$('#btnUpdateProfileDoc').show();
	$('#btnCancelDoc').show();
	$("#profile-documents-div :input").css('cursor','');
	$("select").css('cursor','');
	$("textarea").css('cursor','');
	

});


//on click of the edit icon of the settings form
$('#pencil-edit-settings').on('click',function(){
	$('#btnUpdateProfile').hide();
	$('#btnCancel').hide();
	$("#my-profile-div *").attr('disabled',true);

	$("#profile-documents-div *").attr('disabled',true);
	$('#btnUpdateProfileDoc').hide();
	$('#btnCancelDoc').hide();

	$("#profile-specialities-div *").attr('disabled',true);
	$('#btnUpdateSpeciality').hide();
	$('#btnCancelSpeciality').hide();

	$("#profile-intro-video-div *").attr('disabled',true);
	$('.open_video_section').css({"pointer-events": "none"});
	$('#btnUpdateIntroVideo').hide();
	$('#btnCancelIntroVideo').hide();

	$("#profile-settings-div *").attr('disabled',false);
	$('#btnUpdateSettings').show();
	$('#btnCancelSettings').show();
	$("#profile-settings-div :input").css('cursor','');
	$("select").css('cursor','');
	$("textarea").css('cursor','');
	

});

//on click of the edit icon of the speciality form
$('#pencil-edit-specialities').on('click',function(){
	$('#btnUpdateProfile').hide();
	$('#btnCancel').hide();
	$("#my-profile-div *").attr('disabled',true);

	$("#profile-documents-div *").attr('disabled',true);
	$('#btnUpdateProfileDoc').hide();
	$('#btnCancelDoc').hide();

	$('#btnCancelSettings').hide();
	$('#btnUpdateSettings').hide();
	$("#profile-settings-div *").attr('disabled',true);

	$("#profile-intro-video-div *").attr('disabled',true);
	$('.open_video_section').css({"pointer-events": "none"});
	$('#btnUpdateIntroVideo').hide();
	$('#btnCancelIntroVideo').hide();

	$("#profile-specialities-div *").attr('disabled',false);
	$('#btnUpdateSpeciality').show();
	$('#btnCancelSpeciality').show();
	$("#profile-specialities-div :input").css('cursor','');
	$("select").css('cursor','');
	$("textarea").css('cursor','');
	

});

//on click of the edit icon of the speciality form
$('#pencil-edit-intro-video').on('click',function(){
	$('#btnUpdateProfile').hide();
	$('#btnCancel').hide();
	$("#my-profile-div *").attr('disabled',true);

	$("#profile-documents-div *").attr('disabled',true);
	$('#btnUpdateProfileDoc').hide();
	$('#btnCancelDoc').hide();
	$('.open_video_section').css({"pointer-events": "none"});

	$('#btnCancelSettings').hide();
	$('#btnUpdateSettings').hide();
	$("#profile-settings-div *").attr('disabled',true);

	$("#profile-specialities-div *").attr('disabled',true);
	$('#btnUpdateSpeciality').hide();
	$('#btnCancelSpeciality').hide();
	
	$("#profile-intro-video-div *").attr('disabled',false);
	$('#btnUpdateIntroVideo').show();
	$('#btnCancelIntroVideo').show();
	$("#profile-intro-video-div :input").css('cursor','');
	$("select").css('cursor','');
	$("textarea").css('cursor','');
	$('.open_video_section').css({"pointer-events": "all"});
	

});


//on click of the cancel button
$('#btnCancel').on('click',function(){
	window.location.reload();
});

$('#btnCancelDoc').on('click',function(){
	window.location.reload();
});

$('#btnCancelSettings').on('click',function(){
	window.location.reload();
});

//on click of edit icon on profile image
$('#pencil-edit-profile-image').on('click',function(){
	$('#profileImgupload').trigger('click');
});

//on click of edit icon on cover image
$('#pencil-edit-cover-image').on('click',function(){
	$('#coverImgupload').trigger('click');
});

$('#profileImgupload').on('change',function(evt){
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
									 if(w >= 150 && h >= 150)
									 {
										 $('#profile-image-src').attr("src", evt.target.result);
									 } else {
											 alert("Image must be greater than 150 X 150px", function(answer) {
												 $('#profileImgupload').val('');
											 });
											 return false;
									 }
							 }
					 } else {
							 alert("The maximum size for file upload is 4Mb.", function(answer) {
								 $('#profileImgupload').val('');
							 });
							 return false;
					 }

			 } else {
					 alert("Please upload image only.", function(answer) {
						 $('#profileImgupload').val('');
					 });
					 return false;
			 }
	 };
	 reader.readAsDataURL(file);
});

$('#coverImgupload').on('change',function(evt){
	var file=evt.currentTarget.files[0];
	var reader = new FileReader();
	var image  = new Image();
  reader.onload = function (evt)
	 {
			 if((file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/gif') )
			 {
					 if(~~(file.size/1024) <10000)
					 {
							 image.src = evt.target.result;
							 image.onload = function()
							 {

									 var w = this.width, h = this.height, t = file.type, n = file.name, file_size = ~~(file.size/1024);
									 if(w >= 500 && h >= 250)
									 {
										 $('#cover-image-src').attr("src", evt.target.result);
									 } else {
											 alert("Image must be greater than 500 X 250", function(answer) {
												 $('#coverImgupload').val('');
											 });
											 return false;
									 }

							 }
					 } else {
							 alert("The maximum size for file upload is 10Mb.", function(answer) {
								 $('#coverImgupload').val('');
							 });
							 return false;
					 }

			 } else {
					 alert("Please upload image only.", function(answer) {
						 $('#coverImgupload').val('');
					 });
					 return false;
			 }
	 };
	 reader.readAsDataURL(file);
});


$('#v_video_upload').on('change',function(evt){
	var file=evt.currentTarget.files[0];
	var reader = new FileReader();
	var image  = new Image();
	console.log(file);
  reader.onload = function (evt)
	 {
			 if((file.type == 'video/mp4' || file.type == 'video/avi' || file.type == 'video/mpg' || file.type == 'video/quicktime') )
			 {
					 if(~~(file.size/1024) <100000)
					 {
							 image.src = evt.target.result;
							 fileName = file.name;
							 $('#video-error').html('');
							 $('#video-name').html(file.name);

					 } else {
					 		$('#video-error').html('The maximum size for file upload is 100Mb.');
					 		$('#v_video_upload').val('');
					 		$('#video-name').html('');
							 return false;
					 }

			 } else {
			 		 $('#video-error').html('Please upload videos with mp4,avi,mov, or mpg extensions.');
			 		 $('#v_video_upload').val('');
			 		 $('#video-name').html('');
					 return false;
			 }
	 };
	 reader.readAsDataURL(file);
});


$(".open_video_section").on('click',function()
{
	$(".video_section").show();
	$(".open_video_section").hide();
});
   
  $('#intro_video_type').on('change',function(){
  	value = $(this).val();
  	if (value == 'Upload') {
  		$('#video-upload-div').show();
  		$('#video-youtube-or-vimeo-div').hide();
  	}else{
  		$('#video-youtube-or-vimeo-div').show();
  		$('#video-upload-div').hide();
  	}
  })

jQuery.validator.addMethod("countryCode", function (value, element) {
    return /^\+\d+$/.test(value)
}, "Please enter the valid country code.");




$('#social_linkdein_href').on('click', function(){
	var url = $('#social_linkdein').val();
	if (url != '') {
		$(this).attr('href',url);
		$('#social_linkdein_href_error').html('');
	}else{
		$('#social_linkdein_href_error').html('Please enter the link first');
		return false;
	}
});

$('#social_facebook_href').on('click', function(){
	var url = $('#social_facebook').val();
	if (url != '') {
		$('#social_facebook_href_error').html('');
		$(this).attr('href',url);
	}else{
		$('#social_facebook_href_error').html('Please enter the link first');		
		return false;
	}
});

$('#social_twitter_href').on('click', function(){
	var url = $('#social_twitter').val();
	if (url != '') {
		$('#social_twitter_href_error').html('');
		$(this).attr('href',url);
	}else{
		$('#social_twitter_href_error').html('Please enter the link first');		
		return false;
	}
});

$('#social_instagram_href').on('click', function(){
	var url = $('#social_instagram').val();
	if (url != '') {
		$('#social_instagram_href_error').html('');
		$(this).attr('href',url);
	}else{
		$('#social_instagram_href_error').html('Please enter the link first');		
		return false;
	}
});


/* ============= START: JQUERY CODE ADDED TO UPLOAD Waiver policy ============== */
$('.waiver_policy_file').on('change',function(evt){
    
    // Check for max 5 uploads
    var allFiles = evt.currentTarget.files;
        
    console.log(evt.currentTarget.files[0]);
    var file='';
    var file = evt.currentTarget.files[0];
    var reader = new FileReader();
    var image  = new Image();

     if(file.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type == 'application/pdf')
     {
            // alert('valid');
             if(~~(file.size/1024) <100000)
             {
                     image.src = evt.target.result;
                     fileName = file.name;
                     $('#v_waiver_policy_doc_name').html(fileName);

             } else {
                    alert('The maximum size for file upload is 10Mb.');
                    $('#v_waiver_policy_doc').val('');
                    $('#v_waiver_policy_doc_name').html('');
                     return false;
             }

     } else {
        // alert('invalid');
             alert('Please upload files with doc, docx or pdf extensions.');
             $('#v_waiver_policy_doc').val('');
             $('#v_waiver_policy_doc_name').html('');
             return false;
     }
});

/* ============= END: JQUERY CODE ADDED TO UPLOAD WAIVER POLICY ============== */