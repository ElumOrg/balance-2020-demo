$(document).ready(function() {

	$('#is_studio_or_individual').on('change',function(){
		var valueStud = $(this).val();
		if (valueStud == 'Studio') {
			$('.studio_needs').show();
		}else{
			$('.studio_needs').hide();
		}
	})

	$('#classTagsInput').tagsInput({
			'autocomplete': {
				source:function(request, response) {
						 $.ajax({
								url: baseURL+'/get/all-tag-for-classes-vod',
								type: 'GET',
								data: { name: request.term },
								success: function (result) {
									response(result);
								},
							});
				}
			},
			'limit' : 10,
			'onAddTag': function(input, value) {
					var lengthcnt = $('#classTagsInput').length;
					var totalPrevCount = parseInt($('#classTagsCount').text());
					var totalCount = (totalPrevCount+lengthcnt);
					console.log(totalCount);

					if (totalCount<11) {
						$('#classTagsCount').text(totalCount);
					}else{
						$('#classTagsCountSpan').css('color','red');
					}
			}, 
			'onRemoveTag': function(input, value) {
					var lengthcnt = $('#classTagsInput').length;
					var totalPrevCount = parseInt($('#classTagsCount').text());
					var totalCount = (totalPrevCount-lengthcnt);
					console.log(totalCount);
					$('#classTagsCount').text(totalCount);

			}, 
		});

	$('.timezoneDropdown').select2();
	$('#v_state').select2();
	$('#loader-div').hide();

	$('#form-add-live-class').validate({
		errorElement: 'span', //default input error message container
		focusInvalid: false, // do not focus the last invalid input
		invalidHandler: function(form, validator) {
      $('html,body').animate({
       scrollTop: $("form").offset().top},
      50);
    },
		rules: {
			title:{
          required:true,
      },
			price:{
          required:true,
          isValideValue:true,

      },
		from_date:{
          required:true,
      },
			total_event_hours:{
          required:true,
          number:true,
      },
			max_no:{
          required:true,
          number :true
      },
      	i_teacher_id:{
			required:true,		
		},
		class_timezone:{
			required:true
		},
		embedded_zoom : {
			required:true
		},
		
		v_address : {
			required:function(){
				if($('input[type=radio][name=class_type]') == 'Workshop'){
					return true;
				}
			}
		},
		v_city : {
			required:function(){
				if($('input[type=radio][name=class_type]') == 'Workshop'){
					return true;
				}
			}
		},
		v_state : {
			required:function(){
				if($('input[type=radio][name=class_type]') == 'Workshop'){
					return true;
				}
			}
		},
		v_zipcode : {
			required:function(){
				if($('input[type=radio][name=class_type]') == 'Workshop'){
					return true;
				}
			}
		},

		zoom_link : {
			required:function(){
				if ($("#embedded_zoom").val() == '2') {
					return true;
				}else{
					return true;
				}
			}
		},

		zooom_meeting_url_2 : {
			required:function(){
				if ($("#embedded_zoom").val() == '1') {
					return true;
				}else{
					return true;
				}
			}
		},
		is_studio_or_individual : {
			required:function(){
				if($('input[type=radio][name=add_class_type]') == 'In_Person'){
					return true;
				}
			}
		},
		studio_name : {
			required:function(){
				if($('input[type=radio][name=add_class_type]') == 'In_Person' && $('#is_studio_or_individual').val() == 'Studio'){
					return true;
				}
			}
		},
		studio_registration_link : {
			required:function(){
				if($('input[type=radio][name=add_class_type]') == 'In_Person' && $('#is_studio_or_individual').val() == 'Studio'){
					return true;
				}
			}
		},
      },
    messages : {
			title:{
          required:'Please enter the online class name.',
      },
			price:{
          required:'Please enter the price.',
      },
		from_date:{
          required:'Please enter the date & time for class',
      },
			total_event_hours:{
          required:'Please enter total class duration.',
      },
			max_no:{
          required:'Please enter the maximum number of participant.',
					
      },
      i_teacher_id:{
          required:'Please select teacher name.',
					
      },
  		class_timezone:{
			required:'Please select timezone.'
		},
		embedded_zoom : {
			required:'Please select type.'
		},
		zoom_link : {
			required:'Please enter the link.',
		},
		zooom_meeting_url_2 : {
			required:'Please enter the embedded code.',
		},
		v_unit_number : {
			required:"Please enter the unit number.",
		},
		v_address : {
			required:"Please enter the address.",
		},
		v_city : {
			required:"Please enter the city.",
		},
		v_state : {
			required:"Please enter the state.",
		},
		v_zipcode : {
			required:"Please enter the zipcode.",
		},
		is_studio_or_individual : {
			required:'Please select the type.',
		},
		studio_name : {
			required:'Please enter the studio name.',
		},
		studio_registration_link : {
			required:'Please enter the class enrollment link..',
		},
		
    },
  	submitHandler: function (form) {
  		//alert(CKEDITOR.instances['CkEditor'].getData());
  		if ( CKEDITOR.instances.CkEditor.getData() != '') {	
  			$('#ck-description-error').hide();
	      	$("#btnUpdateProfile").attr("disabled","disabled");
	      	form.submit();
  		}else{
  			$('#ck-description-error').show();
  			$('#ck-description-error').html('Please enter the description');
  			return false;
  		}
    }
  });

});

function getAllTags(){
		$.ajax({
					url: baseURL+'/get/all-tag-for-classes-vod',
					type: 'GET',
					success: function (result) {
						console.log(result);
						var data = [];
						for(var i = 0; i < result.length; i++){ 
						    data.push(result[i]); 
						} 

						return data;
					},
				});
		// return [
		// 	'yoga',
		// 	'wellness',
		// 	'Fitness',
		// 	'dslr_camera_lesson'
		// ];
}

function isValideValue(value) {
    var pattern = /^-?\d*(\.\d+)?$/;
    return pattern.test(value);
}

jQuery.validator.addMethod("isValideValue", function(value, element) {
    return isValideValue(value)
}, "Please enter valid value");
//on click of the cancel button
$('#btnCancel').on('click',function(){
	window.location.reload();
});

$('#pencil-edit-profile-image').on('click',function(){
	$('#profileImgupload').trigger('click');
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

$(document).on('click','.delete-gallary-image',function(){
	var gallary_image_id = $(this).data('id');
	// alert(gallary_image_id);
	swal({
		  title: 'Are you sure?',
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willProceed) => {
			if (willProceed) {
				$('#loader-div').show();
				$.ajax({
					url: baseURL+'/photo-gallery/image/delete',
					type: 'POST',
					data: {gallary_image_id:gallary_image_id},
					success: function (result) {
						if (result.status) {
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
						// console.log(result);
					},
					error: function (xhr, ajaxOptions, thrownError) {
						$('#alert-ajax-danger').html('Something went wrong. Please try again');
					}
				});
			}

		});

});


$("#embedded_zoom").change(function() {
  
  var val = $(this).val();
  console.log(val);
  if(val=='1'){

    $('#prerecorded-link-div').show();
    $('#embedded-zoom-link-div').hide();
    $('.pre-recorded-code-textarea').val('');
    $('#select-zoom-link-type-div').hide();
    $('.embedded-zoom-link-textbox').removeClass('required');
    $('.pre-recorded-code-textarea').addClass('required');

  }else if(val=='2'){

    $('#prerecorded-link-div').hide();
    $('#embedded-zoom-link-div').show();
    $('.embedded-zoom-link-textbox').val('');
    // $('#select-zoom-link-type-div').show();
    $('.embedded-zoom-link-textbox').addClass('required');
    $('.pre-recorded-code-textarea').removeClass('required');

  }else{

    $('.pre-recorded-code-textarea').removeClass('required');
    $('.embedded-zoom-link-textbox').removeClass('required');
    $('#prerecorded-link-div').hide();
    $('#embedded-zoom-link-div').hide();

  }
});

$('#zoom_link_type').change(function(){
	var val = $(this).val();
	if (val == 'add_to_zoom') {
		var title = $('input[name=title]').val();
		var description = CKEDITOR.instances.CkEditor.getData();
		var form_datetime = $('input[name=from_date]').val();
		var total_event_hours = $('input[name=total_event_hours]').val();
		var class_timezone = $('select[name=class_timezone]').val();
		if (title == '' || 
			description == '' ||
			form_datetime == '' ||
			total_event_hours == '' ||
			class_timezone == '') 
		{
			alert('Please filled out all fields');
		}else{
			var dataZoom = {title:title, 
							description:description,
							form_datetime:form_datetime,
							total_event_hours:total_event_hours,
							class_timezone:class_timezone};
			var response = addZoomLinkToAccount(dataZoom);
		}
		$('#embedded-zoom-link-div').show();
    	$('.add-to-zoom-link-textbox').val('');
    	$('.add-to-zoom-link-textbox').prop('readonly','readonly');
	}else if(val == 'custom_zoom'){
		$('#embedded-zoom-link-div').show();
    	$('.add-to-zoom-link-textbox').val('');
		$('.add-to-zoom-link-textbox').addClass('required');
		$('.add-to-zoom-link-textbox').prop('readonly','');
	}else{
		$('.add-to-zoom-link-textbox').removeClass('required');
		$('#embedded-zoom-link-div').hide();
		$('.add-to-zoom-link-textbox').removeClass('required');
		$('.add-to-zoom-link-textbox').prop('readonly','');
	}
});


$('input[type=radio][name=class_type]').change(function() {
    if (this.value == 'Online_Class') {
        $('#address_block').hide();
        $('#zoom-link-div').show();
        $('#is_prerecorded_checkbox_div').show();
        $('#v_unit_number').removeClass('required');
        $('#v_address').removeClass('required');
        $('#v_city').removeClass('required');
        $('#v_state').removeClass('required');
        $('#v_zipcode').removeClass('required');

    }
    else if (this.value == 'Workshop') {
        $('#address_block').show();
        $('#zoom-link-div').hide();
        $('#is_prerecorded_checkbox_div').hide();
        $('#v_unit_number').addClass('required');
        $('#v_address').addClass('required');
        $('#v_city').addClass('required');
        $('#v_state').addClass('required');
        $('#v_zipcode').addClass('required');
    }
});



$('#form-edit-live-class').validate({
		errorElement: 'span', //default input error message container
		focusInvalid: false, // do not focus the last invalid input
		invalidHandler: function(form, validator) {
		      $('html,body').animate({
		       scrollTop: $("form").offset().top},
		      50);
		    },
		rules: {
			title:{
		          required:true,
		      },
					price:{
		          required:true,
		          isValideValue:true,

		      },
				from_date:{
		          required:true,
		      },
					total_event_hours:{
		          required:true,
		          number:true,
		      },
					max_no:{
		          required:true,
		          number :true
		      },
		      	i_teacher_id:{
					required:true,		
				},
				class_timezone:{
					required:true
				},
				embedded_zoom : {
					required:true
				},
				
				v_address : {
					required:function(){
						if($('input[type=radio][name=class_type]') == 'Workshop'){
							return true;
						}
					}
				},
				v_city : {
					required:function(){
						if($('input[type=radio][name=class_type]') == 'Workshop'){
							return true;
						}
					}
				},
				v_state : {
					required:function(){
						if($('input[type=radio][name=class_type]') == 'Workshop'){
							return true;
						}
					}
				},
				v_zipcode : {
					required:function(){
						if($('input[type=radio][name=class_type]') == 'Workshop'){
							return true;
						}
					}
				},

				zoom_link : {
					required:function(){
						if ($("#embedded_zoom").val() == '2') {
							return true;
						}else{
							return true;
						}
					}
				},

				zooom_meeting_url_2 : {
					required:function(){
						if ($("#embedded_zoom").val() == '1') {
							return true;
						}else{
							return true;
						}
					}
				}
      	},
	   	messages : {
				title:{
			          required:'Please enter the online class name.',
			      },
						price:{
			          required:'Please enter the price.',
			      },
					from_date:{
			          required:'Please enter the date & time for class',
			      },
						total_event_hours:{
			          required:'Please enter total class hours.',
			      },
						max_no:{
			          required:'Please enter the maximum number of participant.',
								
			      },
			      i_teacher_id:{
			          required:'Please select teacher name.',
								
			      },
			  		class_timezone:{
						required:'Please select timezone.'
					},
					embedded_zoom : {
						required:'Please select type.'
					},
					zoom_link : {
						required:'Please enter the link.',
					},
					zooom_meeting_url_2 : {
						required:'Please enter the embedded code.',
					},
					v_unit_number : {
						required:"Please enter the unit number.",
					},
					v_address : {
						required:"Please enter the address.",
					},
					v_city : {
						required:"Please enter the city.",
					},
					v_state : {
						required:"Please enter the state.",
					},
					v_zipcode : {
						required:"Please enter the zipcode.",
					},		
	    },
  		submitHandler: function (form) {
	  		//alert(CKEDITOR.instances['CkEditor'].getData());
	  		if ( CKEDITOR.instances.CkEditor.getData() != '') {	
	  			var a = new Date($('#old_date_time').val()); var b = new Date($('#from_date').val()); 
	  			var attendeesCount = $('#attendeesCount').val();
	  			// alert(attendeesCount);
	  			if (a.getTime() == b.getTime()) {
	  				$('#ck-description-error').hide();
			      	$("#btnUpdateProfile").attr("disabled","disabled");
			      	form.submit();
	  			}else{
	  				if (attendeesCount == 0) {
	  					$('#ck-description-error').hide();
				      	$("#btnUpdateProfile").attr("disabled","disabled");
				      	form.submit();
				      }else{
		  				swal('Changes in datetime will be notified to enrolled members via email!', {
				            icon:'warning',
				            buttons: true,
				          }).then((willProceed) => {
				          	if (willProceed) {
				           		$('#ck-description-error').hide();
						      	$("#btnUpdateProfile").attr("disabled","disabled");
						      	form.submit();
				          	}
				          });
				      }
	  			}
	  		}else{
	  			$('#ck-description-error').show();
	  			$('#ck-description-error').html('Please enter the description');
	  			return false;
	  		}
    	}
  });


$('#btn_add_to_zoom').on('click',function(){
	var title = $('input[name=title]').val();
	var description = CKEDITOR.instances.CkEditor.getData();
	var form_datetime = $('input[name=from_date]').val();
	var total_event_hours = $('input[name=total_event_hours]').val();
	var class_timezone = $('select[name=class_timezone]').val();
	if (title == '' || 
		description == '' ||
		form_datetime == '' ||
		total_event_hours == '' ||
		class_timezone == '') 
	{
		alert('Please filled out all fields');
	}else{
		var dataZoom = {title:title, 
						description:description,
						form_datetime:form_datetime,
						total_event_hours:total_event_hours,
						class_timezone:class_timezone};
		var response = addZoomLinkToAccount(dataZoom);
	}
});