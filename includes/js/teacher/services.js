$(document).ready(function() {
	$('#loader-div').hide();
	$('#alert-ajax-danger').hide();
});


$(document).on('click', '.btn-delete-service', function () {
		var serviceId = $(this).attr('data-id');
		swal({
		  title: 'Delete Service?',
    	  text: 'Are you sure you want to delete this service?',
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willProceed) => {
			if (willProceed) {
				$('#loader-div').show();
				$.ajax({
					url: baseURL+'/teacher-services/delete',
					type: 'POST',
					data: {serviceId:serviceId},
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

$(document).on('click', '.btn-add-service', function () {
		var serviceId = $(this).attr('data-id');
		swal({
		  title: 'Add Service?',
    	  text: 'Do you want to add this service?',
		  icon: "success",
		  buttons: true,
		  dangerMode: false,
		})
		.then((willProceed) => {
			if (willProceed) {
				$('#loader-div').show();
				$.ajax({
					url: baseURL+'/teacher-services/add',
					type: 'POST',
					data: {serviceId:serviceId},
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
							swal(result.message, {
								icon: "error",
							}).then((willProceed) => {
								window.location.reload();
							});
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

$(document).on('click', '#btn-add-custom-service', function () {
		
    $('#customService').modal({
        backdrop: 'static',
        keyboard: false
    });
});


$('#form-custom-service').validate({
		errorElement: 'span', //default input error message container
		focusInvalid: false, // do not focus the last invalid input
		invalidHandler: function(form, validator) {
	      $('html,body').animate({
	       scrollTop: $("form").offset().top},
	      50);
	    },
		rules: {
				"v_name[]":{
					required:true,
				},
			},
	    messages : {
				"v_name[]":{
					required:'Please enter the service name.',
				},
	    },
		submitHandler: function (form, event) {
			url = baseURL + '/teacher-services/add/custom-service'
	      $.ajax({
	        url: url,
	        type: 'POST',
	        data: $('#form-custom-service').serialize(),
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


$(document).on('click', '#btn-add-more', function() {
    var status = true;
    $('.service-error-span').remove();
    $('#serviceDiv').find('input,textarea').each(function(i, el) {
        if( $(el).hasClass('required') && $.trim($(el).val()) == '') {
            $(el).focus();
            $(el).after('<span class="error service-error-span">Please enter service name</span>');
            status = false;
            return false;
        }
    });
    if(status) {
        var counter = $('#total_features').val();
        ++counter;
        var classes = $('.dummy-data').clone();
        console.log(classes);
        classes.removeClass('dummy-data').removeClass('display-none').removeAttr('id').attr({'id':'services'+counter});
        classes.find('#v_name').attr({'name':'v_name['+counter+']','id':'v_name'+counter}).addClass('required');
        classes.find('.custom_service_delete').attr({'data-delete-count' : counter });
        $('#total_features').val(counter);
        $('#serviceDiv').append(classes);
        if(counter > 0) {
            $('#services0').find('.custom_service_delete0').removeClass('display-none');
        }
    }
});


$(document).on('click', '.custom_service_delete', function() {
    var classesRemove = $(this).attr('data-delete-count');
    var length = $("#serviceDiv > div").length;
    if(length == 1) {
        $('#services'+classesRemove).remove();
        $('#total_features').val(0);
        var classes = $('.dummy-data').clone();
        classes.removeClass('dummy-data').removeClass('display-none').removeAttr('id').attr({'id':'services0'});
        classes.find('.custom_service_delete0').addClass('display-none');
        $('#serviceDiv').append(classes);
    } else {
        $('#services'+classesRemove).remove();
        var counter = $('#total_features').val();
        $('#total_features').val(counter - 1);
        resuffleData();
    }
});
function resuffleData() {
    var count = 0;
    var length = $("#serviceDiv > div").length;
    $("#serviceDiv > div").each( function() {
        $(this).removeAttr('id').attr({'id':'services'+count});
        $(this).find('.v_name').attr({'name':'v_name['+count+']','id':'v_name'+count});
        $(this).find('.feature_delete').attr({'data-delete-count' : count });
        count++;
    });
    $('#total_features').val(length);
}


//new page form added on 28072020 for page refresh
$('#form-custom-service-add').validate({
		errorElement: 'span', //default input error message container
		focusInvalid: false, // do not focus the last invalid input
		ignore: [],
		invalidHandler: function(form, validator) {
	      $('html,body').animate({
	       scrollTop: $("form").offset().top},
	      50);
	    },
		rules: {
				'v_name' : {
					required : true,
				},
				i_category_id : {
					required:true
				},
				service_banner_original : {
					required:true
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
					required : 'Please enter service name.',
				},
				i_category_id : {
					required : 'Please select category id.'
				},
				service_banner_original : {
					required : 'Please upload service banner.'
				},
				v_desc:{
                 	required: 'Please enter service description.',

                 }
	    },
	    errorPlacement: function(error, element) 
        {
            error.insertAfter(element.parent());
        },
		submitHandler: function (form, event) {
			$("#address-modal-button").attr("disabled","disabled");
			form.submit();
			
	    }
  });

$('#pencil-service-icon-image').on('click',function(){
	$('#serviceIconUpload').trigger('click');
});

$('#serviceIconUpload').on('change',function(evt){
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
									 if (w >= 80 && w <= 125 && h >= 115 && h <= 135)
									 {
										 $('#service-icon-image-src').attr("src", evt.target.result);
									 } else {
											 $('#serviceIconUpload').val('');
											 alert("Icon must have this dimension: 80px to 125px X 115px to 135px.");
											 return false;
									 }
							 }
					 } else {
							 $('#serviceIconUpload').val('');
							 alert("The maximum size for file upload is 4Mb.");
							 return false;
					 }

			 } else {
					 $('#serviceIconUpload').val('');
					 alert("Please upload image only.");
					 return false;
			 }
	 };
	 reader.readAsDataURL(file);
});


$('#pencil-service-banner-image').on('click',function(){
	$('#serviceBannerUpload').trigger('click');
});

$('#serviceBannerUpload').on('change',function(evt){
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
									 if(w > 150 && h > 150)
									 {
										 $('#service-banner-image-src').attr("src", evt.target.result);
									 } else {
											 $('#serviceBannerUpload').val('');
											 alert("Image must be greater than 150 X 150px.");
											 return false;
									 }
							 }
					 } else {
							 $('#serviceBannerUpload').val('');
							 alert("The maximum size for file upload is 4Mb.");
							 return false;
					 }

			 } else {
					 $('#serviceBannerUpload').val('');
					 alert("Please upload image only.");
					 return false;
			 }
	 };
	 reader.readAsDataURL(file);
});


$('.changeCategory').on('change',function(){
	var categoryId = $(this).val();
	if (categoryId != '') {
		$('#loader-div').show();
		$.ajax({
			url: baseURL+'/get-category-services',
			type: 'POST',
			data: {i_category_id:categoryId,flag:'service-page'},
			success: function (result) {
				if (result.status) {
					$('#loader-div').hide();
					$('#category-wise-serices').html(result.html);
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