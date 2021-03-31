$(document).ready(function() {
	$('#loader-div').hide();
	setTimeout(function(){
		$('.alert-danger').hide();
	},2000);

	$('#form-customer-dashboard').validate({
		ignore: [],
		errorElement: 'span', //default input error message container
		errorClass: 'span-error', // default input error message class
		focusInvalid: false, // do not focus the last invalid input
		rules: {
			from_date	:{
				required : true,
			},
			// v_post_code	:{
			// 	required : true,
			// 	digits:true,
			// },
			// service_id	:{
			// 	required : true,
			// },

			service_category_id	:{
				required : true,
			},
			// d_total_minutes	:{
			// 	required : true,
			// },
		},
	    messages : {
				from_date	:{
					required : 'Please select the date and time.',
				},
				v_post_code	:{
					required : 'Please enter the zip code.',
					digits: 'Please enter the numbers.',
				},
				service_id	:{
					required : 'Please select the sessions type.',
				},
				// d_total_minutes	:{
				// 	required : 'Please select the duration.',
				// },
				service_category_id	:{
					required : 'Please select the category.',
				},


	    },
    	submitHandler: function (form) {
	      form.submit();
	      $("#btnSubmit").attr("disabled","disabled");
	    }
  });

	// $("#service_id").removeClass('span-error');
	// $("#d_total_minutes").removeClass('span-error');

	/*window.addEventListener("resize", myFunction);
	myFunction();
	function myFunction() {
        var screenWidthCurr = $(document).width();
        if (screenWidthCurr > 670) {
        	$(".flaticon-phone-receiver").parent().attr("href","javascript:void(0)");
        } else {
            $(".flaticon-phone-receiver").parent().attr("href","tel:1"+contactPhoneTo);
        }
    } */



});

//To set Name,Price,Image,Service on the popup
function bookSession(element){

	$("#popup_supplier_name").text($(element).attr('supplier-name'));
	$("#supplier_price").text('($'+$(element).attr('supplier-price')+')');
	$("#supplier_image").attr("src",$(element).attr('supplier-image'));
	$("#service_name").text($(element).attr('supplier-service'));
	$("#encoded_string").val($(element).attr('encoded-string'));
	$('#supplier-inperson-price').val($(element).attr('supplier-price'));
	$('#supplier-virtual-price').val($(element).attr('supplier-virtual-price'));

	var supplier_virtual_price = $(element).attr('supplier-virtual-price');
	var supplier_inperson_price = $(element).attr('supplier-price');
	var initial_minutes = $('select[name=select_duration]').val();
	var supplier_id = $(element).attr('supplier-id');
	
	$('#hidden_supplier_id').val(supplier_id);

	$('#waiver_policy_link').attr('href',baseURL+'/waiver-policy?t='+btoa(supplier_id));

	var arrSuppSessioLength = JSON.parse($(element).attr('supplier-session-length'));
	var i;
	var DurationHtml = '<option value="">Session duration</option>';
	for (i = 0; i < arrSuppSessioLength.length; ++i) {
	    DurationHtml += '<option value="'+arrSuppSessioLength[i]+'">'+arrSuppSessioLength[i]+'</option>';
	}
	$('#select_duration').html(DurationHtml);
	console.log(DurationHtml);

	var supplier_is_in_person = $(element).attr('supplier-is-in-person');
	var supplier_is_virtual = $(element).attr('supplier-is-virtual');
	console.log(supplier_is_virtual,supplier_is_in_person);
	

	$('#select_inperson_type').prop('disabled','');
	$('#select_virtual_type').prop('disabled','');
	$('#div-virtual-inperson-type').show();
	
	if (supplier_is_in_person == 'No' && supplier_is_virtual == 'Yes') {
			$('#select_virtual_type').prop('checked',true);
			$('#select_inperson_type').prop('checked',false);
			$('#select_inperson_type').prop('disabled','disabled');

			calculated_supplier_virtual_price = getDurationWiseValue(initial_minutes,supplier_virtual_price);

			$("#supplier_price").text('($'+calculated_supplier_virtual_price+')');
			$('#hidden_supplier_price').val(supplier_virtual_price);

	}else if (supplier_is_virtual == 'No' && supplier_is_in_person == 'Yes') {
			$('#select_inperson_type').prop('checked',true);
			$('#select_virtual_type').prop('checked',false);
			$('#select_virtual_type').prop('disabled','disabled');

			calculated_supplier_virtual_price = getDurationWiseValue(initial_minutes,supplier_inperson_price);

			$("#supplier_price").text('($'+calculated_supplier_virtual_price+')');
			$('#hidden_supplier_price').val(supplier_inperson_price);
	}else{

		if (supplier_virtual_price < supplier_inperson_price) {
			$('#select_virtual_type').prop('checked',true);
			$('#select_inperson_type').prop('checked',false);

			calculated_supplier_virtual_price = getDurationWiseValue(initial_minutes,supplier_virtual_price);

			$("#supplier_price").text('($'+calculated_supplier_virtual_price+')');
			$('#hidden_supplier_price').val(supplier_virtual_price);


		}else{
			$('#select_inperson_type').prop('checked',true);
			$('#select_virtual_type').prop('checked',false);

			calculated_supplier_inperson_price = getDurationWiseValue(initial_minutes,supplier_inperson_price);

			$("#supplier_price").text('($'+calculated_supplier_inperson_price+')');
			$('#hidden_supplier_price').val(supplier_virtual_price);


		}
	}



	

	// $('#select_virtual_type').prop('checked',true);
	// $('#select_inperson_type').prop('checked',false);

	// calculated_supplier_virtual_price = getDurationWiseValue(initial_minutes,supplier_virtual_price);

	// $("#supplier_price").text('($'+calculated_supplier_virtual_price+')');
	// $('#hidden_supplier_price').val(supplier_virtual_price);

}

$('input[name=select_virtual_inperson_type]').on('click',function(){
	// alert();
	var value = $(this).val();
	var supplier_virtual_price = $('#supplier-virtual-price').val();
	var supplier_inperson_price = $('#supplier-inperson-price').val();
	var initial_minutes = $('select[name=select_duration]').val();

	if (value == 'Virtual') {
		calculated_supplier_virtual_price = getDurationWiseValue(initial_minutes,supplier_virtual_price);

		$("#supplier_price").text('($'+calculated_supplier_virtual_price+')');
		$('#hidden_supplier_price').val(supplier_virtual_price);
	}else{
		calculated_supplier_inperson_price = getDurationWiseValue(initial_minutes,supplier_inperson_price);
		
		$("#supplier_price").text('($'+calculated_supplier_inperson_price+')');
		$('#hidden_supplier_price').val(supplier_inperson_price);
	}
});

$('select[name=select_duration]').on('change',function(){
	// alert();
	var value = parseFloat($(this).val());
	var supplier_price = parseFloat($("#hidden_supplier_price").val());
	console.log(supplier_price);

	supplier_price = getDurationWiseValue(value,supplier_price);
	$("#supplier_price").text('($'+supplier_price+')');
});

function getDurationWiseValue(duration,price){
	var get_hours = (duration / 60);

	actualprice = price * get_hours;

	return actualprice.toFixed(2);
}

function copyCoupon() {
	var copyText = document.getElementById("coupon-code-span");
	var textArea = document.createElement("textarea");
	textArea.value = copyText.textContent;
	document.body.appendChild(textArea);
	textArea.select();
	document.execCommand("Copy");
	textArea.remove();
}


$('#class_date').on('change',function(){
	var date = $(this).val();
	if (date != '') {
			url = baseURL + '/live?class_date='+date;
		 window.location.href = url;
	}
});

// $('#i_service_id').on('change',function(){
// 	var service_id = $(this).val();
// 	if (service_id != '') {
// 			url = baseURL + '/video-gallery?service='+service_id;
// 		 window.location.href = url;
// 	}
// });

// $( '#vod_teacher_id,#vod_i_service_id,#vod_price,#uploaded_at' ).on( 'change', function () {
// 	$('#loader-div').show();
//   	$('#form-vod-filter').submit();
	
// });

$( '#vod_teacher_id,#vod_i_service_id,#vod_price,#uploaded_at' ).on( 'change', function () {
	$('#clear-filer-vod').show();
	$('#filter-button').hide();
	$('#loader-div').show();
  	$.ajax( {
        url: baseURL+'/video-gallery/ajaxviews',
        type: "POST",
        data: $('#form-vod-filter').serialize(),
        beforeSend: function () {
        }

      } )
      .done( function ( data ) {
        console.log(data);
        $('#loader-div').hide();
        $( ".parent-vod-section" ).html(data);
      	var swiper = new Swiper('#ka-swiper1', {
		      slidesPerView: 3,
		      slidesPerColumn: 2,
		      /*spaceBetween: 20,*/

		      pagination: {
		        el: '.swiper-pagination',
		        clickable: true,
		      },
		      // Responsive breakpoints
				  breakpoints: {
				  		  	320: {
							          slidesPerView: 1,
							        },
					  	  	481: {
					          slidesPerView: 1,
					        },
						  	 575: {
					          slidesPerView: 1,
					        },
						    640: {
					          slidesPerView: 2,
					        },
					        768: {
					          slidesPerView: 2,
					        },
					        991: {
					          slidesPerView: 3,
					        },
					        992: {
					          slidesPerView: 3,
					        },
					        1024: {
					          slidesPerView: 3,
							},

				    
				  }
		    })
      } );
	
});


// $( '#i_service_id,#teacher_id' ).on( 'change', function () {
//   if ($('.teacher-name-search').val() == '') {
//     $('#teacher-error').show();
//   }else{
//     $('#teacher-error').hide();
//     $.ajax( {
//         url: baseURL+'/video-gallery/ajaxviews',
//         type: "POST",
//         data: $('#filterVideosForm').serialize(),
//         // dataType: 'html',
//         beforeSend: function () {
//           $('#loader-div').show();
//         }

//       } )
//       .done( function ( data ) {
//         // console.log(data);
//         var html= data.html;
//         $('#loader-div').hide();
//         $(".alert,.alert-danger").hide();
//         $( "#video-container" ).html(html);
      
//       } );
//   }
	
//   });


$('#btn-dashboard-activate-trial').on('click',function(){
	var message = 'Do You Want To Activate 7 Days FREE Trial Subscription ?';
	swal(message, {
	    icon:'success',
	    buttons: true,
	  }).then((willProceed) => {
	  	if (willProceed) {
	   			// $('.form-activate-free-trial').submit();
 		  $('#loader-div').show();
          $.ajax({
            url: baseURL+'/newsletter/online-class-free',
            type: 'POST',
            data: $('.form-activate-free-trial').serialize(),
            success: function (result) {
                        console.log(result);
                if (result.status) {
                	$('#loader-div').hide();
                	swal('Subscription Is Added To Your Account!', {
			            icon:'success',
			            buttons: true,
			          }).then((willProceed) => {
			          	if (willProceed) {
                			window.location = baseURL + '/my-online-class-subscription';
			          	}
			          });
                }
                
            },
            error: function (xhr, ajaxOptions, thrownError) {
              $("#alert-online-class-popup-danger").html('Something went wrong. Please try again');
            }
	  	  });
     	}
	});
})