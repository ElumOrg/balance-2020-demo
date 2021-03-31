$(document).ready(function() {
	// $('#btnUpdateProfile').attr("disabled", false);
	var hidden_intro_video_type = $('#hidden_intro_video_type').val();
	if (hidden_intro_video_type == 'Upload') {
		$('#video-youtube-or-vimeo-div').hide();
  		$('#video-upload-div').show();
	}else
	{
		$('#video-youtube-or-vimeo-div').show();
  		$('#video-upload-div').hide();
	}

	$("#my-profile-div :input").attr("disabled", true);
	$("#my-profile-div :input").css('cursor','not-allowed');

	$("textarea").attr("disabled", true);
	$("textarea").css('cursor','not-allowed');
	$("select").attr("disabled", true);
	$("select").css('cursor','not-allowed');

	$('#btnUpdateProfile').hide();
	$('#btnCancel').hide();
	$('#pencil-edit-cover-image').hide();
	$('#pencil-edit-profile-image').hide();
	$('.div_v_mute_duration').hide();

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
	$(".open_video_section").hide();
	$(".video_section").hide();

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
	$('#btnUpdateProfile').show();
	$('#btnCancel').show();
	// $('#pencil-edit-cover-image').show();
	$('#pencil-edit-profile-image').show();

	$("#my-profile-div :input").attr("disabled", false);
	$("#my-profile-div :input").css('cursor','');

	$("input").attr("disabled", false);
	$("textarea").attr("disabled", false);
	$("select").attr("disabled", false);
	$("input").css('cursor','');
	$("select").css('cursor','');
	$("textarea").css('cursor','');
	$(".open_video_section").show();
	//$(".video_section").hide();


});

//on click of the cancel button
$('#btnCancel').on('click',function(){
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
  reader.onload = function (evt)
	 {
			 if((file.type == 'video/mp4' || file.type == 'video/avi' || file.type == 'video/mpg') )
			 {
					 if(~~(file.size/1024) <10000)
					 {
							 image.src = evt.target.result;
							 fileName = file.name;
							 $('#video-error').html('');

					 } else {
					 		$('#video-error').html('The maximum size for file upload is 10Mb.');
							 return false;
					 }

			 } else {
			 		 $('#video-error').html('Please upload video only.');
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