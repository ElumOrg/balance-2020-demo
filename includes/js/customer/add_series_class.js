$(document).ready(function() {

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
			'from_date[]':{
	          required:true,
	        },
	        no_of_classes:{
	      	 required:true
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
			series_meeting_type:{
				required:true,
			},
			v_location : {
					required:function(){
						if($("#series_meeting_type").val() == 'In_Person'){
							return true;
						}
					}
				},
			
			v_address : {
				required:function(){
					if($("#series_meeting_type").val() == 'In_Person'){
						return true;
					}
				}
			},
			v_city : {
				required:function(){
					if($("#series_meeting_type").val() == 'In_Person'){
						return true;
					}
				}
			},
			v_state : {
				required:function(){
					if($("#series_meeting_type").val() == 'In_Person'){
						return true;
					}
				}
			},
			v_zipcode : {
				required:function(){
					if($("#series_meeting_type").val() == 'In_Person'){
						return true;
					}
				}
			},

			zoom_url : {
				required:function(){
					if ($("#series_meeting_type").val() == 'Online_meeting_url') {
						return true;
					}else{
						return false;
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
			'from_date[]':{
	          required:'Please enter the date & time for class',
	      },
				total_event_hours:{
	          required:'Please enter each class duration.',
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
		zoom_url : {
			required:'Please enter the link.',
		},
		v_location : {
			required:'Please enter the location.',
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
		no_of_classes:{
	      	required:'Please enter the no. of classes'
	      },
	      series_meeting_type:{
				required:'Please select class series type.',
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
		return [
			'yoga',
			'wellness',
			'Fitness',
			'dslr_camera_lesson'
		];
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
				series_meeting_type:{
					required:true,
				},
				v_location : {
					required:function(){
						if($("#series_meeting_type").val() == 'In_Person'){
							return true;
						}
					}
				},
				
				v_address : {
					required:function(){
						if($("#series_meeting_type").val() == 'In_Person'){
							return true;
						}
					}
				},
				v_city : {
					required:function(){
						if($("#series_meeting_type").val() == 'In_Person'){
							return true;
						}
					}
				},
				v_state : {
					required:function(){
						if($("#series_meeting_type").val() == 'In_Person'){
							return true;
						}
					}
				},
				v_zipcode : {
					required:function(){
						if($("#series_meeting_type").val() == 'In_Person'){
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
					series_meeting_type:{
						required:'Please select class series type.',
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


$(document).on('input', '#no_of_classes', function () {
	$(".multiple-datetime-picker").html('');
	$('#no_of_classes_error').html('');

    var numberOfIps = parseInt($("#no_of_classes").val().trim());

    if (numberOfIps) {
        for (var loop = 1; loop <= numberOfIps; loop++) {
		    var inputTemplate = '<div class="col-md-6"><label for="from_date">Date & Time of Class '+loop+'</label> <div class="form-group calender-icons icons"> <input class="form-control form_datetime" placeholder="MM/DD/YYYY HH:MM*" size="16" readonly="readonly" name="from_date[]" type="text" value=""></div></div>';

            $(".multiple-datetime-picker").append(inputTemplate);
        }
    } else {
        $('#no_of_classes_error').html('Please enter valid number');
    }
});


$('#series_meeting_type').on('change',function(){
	console.log($(this));
	var value = $(this).val();
	if (value == 'Online_meeting_url') {
		$('#online-meeting-url-div').show();
		$('#address-block-div').hide();
	}else if(value == 'In_Person'){		
		$('#online-meeting-url-div').hide();
		$('#address-block-div').show();
	}else{
		$('#online-meeting-url-div').hide();
		$('#address-block-div').hide();
	}
});

$('#btn_add_to_zoom').on('click',function(){
	var title = $('input[name=title]').val();
	var description = CKEDITOR.instances.CkEditor.getData();
	var form_datetime = $('.form_datetime').val();
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