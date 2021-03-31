$(document).ready(function() {
	$('#loader-div').hide();
	$('#alert-ajax-danger').hide();

	var edit_hidden_video_type = $('#edit_hidden_video_type').val();
	var edit_hidden_embedded_code = $('#edit_hidden_embedded_code').val();
	var edit_hidden_upload_video_name = $('#edit_hidden_upload_video_name').val();
	var edit_hidden_price = $('#edit_hidden_price').val();
	var edit_hidden_is_video_paid = $('#edit_hidden_is_video_paid').val();

	if(edit_hidden_video_type == 'Embedded_Code') {
		$('#edit-uploaded-video-div').hide();
		$('#upload-video-div').hide();
		$('#embedded-code-video-div').show();
		$("#embeded_code").val(edit_hidden_embedded_code);

	}else if(edit_hidden_video_type == 'Upload_Video'){
		$('#upload-video-div').show();
		$('#edit-uploaded-video-div').show();
		$('#embedded-code-video-div').hide();
	}else{
		$('#upload-video-div').hide();
		$('#embedded-code-video-div').hide();
	}

	if (edit_hidden_is_video_paid == 'Yes') {
		$('#price-div').show();
		$("#v_price").val(edit_hidden_price);
		
	}
});


$(document).on('change', '#video_type', function () {
	var video_type = $(this).val();
	if (video_type == 'Embedded_Code') {
		$('#upload-video-div').hide();
		$('#embedded-code-video-div').show();
		$('#edit-uploaded-video-div').hide();
	}else if(video_type == 'Upload_Video'){
		$('#upload-video-div').show();
		$('#embedded-code-video-div').hide();
		$('#edit-uploaded-video-div').show();
	}else{
		$('#upload-video-div').hide();
		$('#embedded-code-video-div').hide();
	}
});

$(document).on('change', '.is_paid', function () {	
	$('#price-div').toggle();
});


$('#form-video-add').validate({
		errorElement: 'span', //default input error message container
		focusInvalid: false, // do not focus the last invalid input
		ignore: [],
		invalidHandler: function(form, validator) {
	      $('html,body').animate({
	       scrollTop: $("form").offset().top},
	      50);
	    },
		rules: {
				v_name : {
					required:true,
				},
				i_service_id : {
					required:true,
				},
				video_type : {
					required:true,
				},
				upload_video : {
					required:function(){
						video_type = $('#video_type').val();
						if(video_type == 'Upload_Video'){
							return true;
						}else{
							return false;
						}
					}
				},
				embeded_code : {
					required:function(){
						video_type = $('#video_type').val();
						if (video_type == 'Embedded_Code') {
								return true;
						}else{
							return false;
						}
					}
				},
				v_price : {
					required:function(){
						if($('.is_paid').prop("checked") == true){   
							return true;
			            }else{
							return false;
						}
					},
					number:{
						required:true,
					}
				},
				v_desc:{
                         required: function() 
                        {
                         CKEDITOR.instances.v_desc.updateElement();
                        },

                  }
			},
	    messages : {
				'v_name' : {
					required : 'Please enter video title.',
				},
				i_service_id : {
					required:'Please select service.',
				},
				video_type : {
					required:'Please select video type.',
				},
				upload_video : {
					required : 'Please upload video.'
				},
				v_price : {
					required : 'Please enter price.'
				},
				embeded_code:{
                 	required: 'Please select service.',

                },
                v_desc:{
                 	required: 'Please enter video description.',

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
			$("#address-modal-button").attr("disabled","disabled");
			// form.submit();
			$('#loader-div').show();
			if($('#i_service_id').val() == 'add_new_service'){
					if (true) {}
					$.ajax({
						url: baseURL+'/teacher-video-gallery/check-custom-service-added',
						type: 'GET',
						success: function (result) {
							if (result.status) {
								form.submit();

							} else {
								$('#loader-div').hide();
								$("#address-modal-button").prop("disabled",false);
								swal(result.message, {
									icon: "error",
								});
							}
						},
						error: function (xhr, ajaxOptions, thrownError) {
							$('#loader-div').hide();
							$('#alert-ajax-danger').html('Something went wrong. Please try again');
						}
					});

			}else{
				form.submit();
			}
			
	    }
});

$('#form-video-edit').validate({
		errorElement: 'span', //default input error message container
		focusInvalid: false, // do not focus the last invalid input
		ignore: [],
		invalidHandler: function(form, validator) {
	      $('html,body').animate({
	       scrollTop: $("form").offset().top},
	      50);
	    },
		rules: {
				v_name : {
					required:true,
				},
				i_service_id : {
					required:function(){
						v_new_service = $('#v_new_service').val();
						if (v_new_service == '') {
							return true;
						}else{
							return false;
						}
					},
				},
				video_type : {
					required:true,
				},
				
				embeded_code : {
					required:function(){
						video_type = $('#video_type').val();
						if (video_type == 'Embedded_Code') {
								return true;
						}else{
							return false;
						}
					}
				},
				v_price : {
					required:function(){
						if($('.is_paid').prop("checked") == true){   
							return true;
			            }else{
							return false;
						}
					},
					number:{
						required:true,
					}
				},
				v_desc:{
                         required: function() 
                        {
                         CKEDITOR.instances.v_desc.updateElement();
                        },

                  }
			},
	    messages : {
				'v_name' : {
					required : 'Please enter video title.',
				},
				i_service_id : {
					required:'Please select service.',
				},
				video_type : {
					required:'Please select video type.',
				},
				upload_video : {
					required : 'Please upload video.'
				},
				v_price : {
					required : 'Please enter price.'
				},
				embeded_code:{
                 	required: 'Please select service.',

                 },
                 v_desc:{
                 	required: 'Please enter video description.',

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
			$("#address-modal-button").attr("disabled","disabled");
			form.submit();
			
	    }
});

$('#pencil-service-banner-image').on('click',function(){
	$('#videoUpload').trigger('click');
});

$('#videoUpload').on('change',function(evt){
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

							 // document.querySelector("#video-element source").setAttribute('src', URL.createObjectURL(document.querySelector("#videoUpload").files[0]));
							 $('.service-banner-image-src').hide();
							 $('#video-element').show();
							 $('#video-element').attr("src", evt.target.result);
							 $('#video-error').html('');

					 } else {
					 		$('.service-banner-image-src').show();
							$('#video-element').hide();
					 		$('#video-error').html('The maximum size for file upload is 10Mb.');
							 return false;
					 }

			 } else {
			 		$('.service-banner-image-src').show();
							$('#video-element').hide();
			 		 $('#video-error').html('Please upload video only.');
					 return false;
			 }
	 };
	 reader.readAsDataURL(file);
});

$(document).on('click', '.delete-video', function () {
		
		var videoId = $(this).attr('data-id');
		swal({
		  title: 'Delete Video?',
    	  text: 'Are you sure you want to delete this video?',
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willProceed) => {
			if (willProceed) {
				$('#loader-div').show();
				$.ajax({
					url: baseURL+'/teacher-video-gallery/delete',
					type: 'POST',
					data: {videoId:videoId},
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
});

$(document).on('change','.selectallVideos',function(){
   $('.selectedVideoId').prop('checked', this.checked);       
});

$(document).on('click', '.delete-selected-video', function () {
		
		var selectedIds = [];
        $(".selectedVideoId").each(function () {
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
			  title: 'Delete Videos?',
	    	  text: 'Are you sure you want to delete selected videos?',
			  icon: "warning",
			  buttons: true,
			  dangerMode: true,
			})
			.then((willProceed) => {
				if (willProceed) {
					$('#loader-div').show();
					$.ajax({
						url: baseURL+'/teacher-video-gallery/delete-selected',
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


$(document).on('click', '.view-purchases-student', function () {
		var videoId = $(this).data('id');
		$.ajax({
	        url: baseURL+'/teacher-video-gallery/purchased',
	        type: 'POST',
	        async: false,
	        data: {
	            videoId: videoId
	        },
	        success: function (result) {
	          console.log(result);
	          if (result) {
	          		  $('.video-purchased-student-popup').modal('show');
		              $('#purchased-child-ips').html('');
		              $('#practised-title').html(result.arrVideoDetails.video_title);
		              $('#practised-event_id').val(result.arrVideoDetails.id);
		              $('#purchased-child-ips').append(result.html);
	             /* $('#view-attendees-modal').modal({
	                  backdrop: 'static',
	                  keyboard: false
	              });*/
	          }

	        },
	        error: function (xhr, ajaxOptions, thrownError) {

	        }
    	})
});

$('#i_service_id').on('change',function(){
	if ($(this).val() == 'add_new_service') {
		var hidden_current_url = $('#hidden_current_url').val();
		sessionStorage.setItem("custom_service_redirect", hidden_current_url);

		var go_to_url = baseURL+'/teacher-services/add/custom-service';
		window.open(go_to_url, '_blank');
	}else{
		// $('#new-service-div').hide();
		$('#v_new_service').removeClass('required');
	}
});

maxLimit = 25;
 $('#v_name').keyup(function () {
    var lengthCount = this.value.length;      

    if (lengthCount > maxLimit) {
        this.value = this.value.substring(0, maxLimit);
        var charsentered = lengthCount - 1;                   
    }
    else {                   
        var charsentered = lengthCount;                   
    }

    $('#spnCharLeft').css('display', 'block');
    $('#spnCharLeft').text(charsentered+'/'+maxLimit);
});