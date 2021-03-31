$(document).ready(function() {
	$('#loader-div').hide();
	$('#alert-ajax-danger').hide();
	$('#form-customer-address-modal').validate({
		errorElement: 'span', //default input error message container
		focusInvalid: false, // do not focus the last invalid input
		invalidHandler: function(form, validator) {
      $('html,body').animate({
       scrollTop: $("form").offset().top},
      50);
    },
		rules: {
			v_title:{
				required:true,
			},
			v_address:{
				required:true,
			},
			// v_unit_number:{
			// 	digits:true,
			// },
			v_city:{
				required:true,
			},
			v_state:{
				required:true,
			},
			v_zipcode:{
				required:true,
				digits:true,
				minlength:5,
				maxlength:8,
			},
		},
    messages : {
			v_title:{
				required:'Please enter the address label/title.',
			},
			v_address:{
				required:'Please enter the address.',
			},
			v_city:{
				required:'Please enter the city.',
			},
			v_state:{
				required:'Please enter the state.',
			},
			v_zipcode:{
				required:'Please enter the zipcode.',
				minlength:'Please enter the valid zipcode.',
				maxlength:'Please enter the valid zipcode.',
			},
    },
		submitHandler: function (form, event) {
			e_addressId = $('input[name="address_id"').val();
			event.preventDefault();
			var url = '';
			if (e_addressId > 0) {
				url = baseURL + '/address/edit'
			} else {
				url = baseURL + '/address/add'
			}

      $.ajax({
        url: url,
        type: 'POST',
        data: $('#form-customer-address-modal').serialize(),
        success: function (result) {
					console.log(result.status);
          if (result.status) {
						$('#loader-div').show();
            $("#AddressModal").modal('hide');
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

	if ($('#page_status').val() != ''){
		document.getElementById("ul-menus").style.pointerEvents = "none";
	}
});

$(document).on('click', '#btn-add-address', function () {
    $("#address-modal-title").html('Add New Address');
    $("#address-modal-button").html('ADD  Address');
		$('input[name="address_id"').val('0');
    $('#AddressModal').modal({
        backdrop: 'static',
        keyboard: false
    });
});

$(document).on('click', '.btn-edit-address', function () {
		var addressId = $(this).attr('data-id');
    $("#address-modal-title").html('Edit Address');
    $("#address-modal-button").html('SAVE  Address');

		$.ajax({
			url: baseURL+'/address/detail',
			type: 'POST',
			data: {addressId:addressId},
			success: function (result) {
				console.log(result.status);
				if (result.status) {
					$('#v_title').val(result.userAddressResult.v_title);
					$('#v_address').val(result.userAddressResult.v_address);
					$('#v_unit_number').val(result.userAddressResult.v_unit_number);
					$('#v_city').val(result.userAddressResult.v_city);
					$('#v_state').val(result.userAddressResult.v_state);
					$('#v_zipcode').val(result.userAddressResult.v_zipcode);
					$('input[name="address_id"').val(result.userAddressResult.id);
					$('#AddressModal').modal({
			        backdrop: 'static',
			        keyboard: false
			    });
				} else {
					$('#alert-ajax-danger').show();
					$('#alert-ajax-danger').html(result.message);
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				$('#alert-ajax-danger').html('Something went wrong. Please try again');
			}
		});

});

$('#AddressModal').on('hidden.bs.modal', function () {
    $("#form-customer-address-modal").validate().resetForm();
    $("#form-customer-address-modal")[0].reset();
    $("#form-customer-address-modal").find('input.error').removeClass("error");
    $('input[name="address_id"').val('0');
});

$(document).on('click', '.btn-delete-address', function () {
		var addressId = $(this).attr('data-id');
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
					url: baseURL+'/address/delete',
					type: 'POST',
					data: {addressId:addressId},
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
					},
					error: function (xhr, ajaxOptions, thrownError) {
						$('#alert-ajax-danger').html('Something went wrong. Please try again');
					}
				});
			}

		});

});

$(document).on('click', '.btn-set-default-address,.selectable-radio', function () {
		var addressId = $(this).attr('data-id');
		if ($('#page_status').val() != '') {
			var confirmMsg = "Do you want to proceed with selected address ?";
		}else {
			var confirmMsg = "Do you want to make it default address?";
		}
		swal({
		  text: confirmMsg,
		  icon: "warning",
		  buttons: true,
		  dangerMode: false,
		})
		.then((willProceed) => {
		  if (willProceed) {
				$('#loader-div').show();
				$.ajax({
					url: baseURL+'/address/set/default',
					type: 'POST',
					data: {addressId:addressId},
					success: function (result) {
						$('#loader-div').hide();
						if (result.status) {
							$('#alert-ajax-success').show();
							$('#alert-ajax-danger').hide();
							if ($('#page_status').val() != '') {
								window.location.href = baseURL+"/pay";
							}else {
								swal(result.message, {
						      icon: "success",
						    }).then((willProceed) => {
									window.location.reload();
								});
							}
						} else {
							$('#alert-ajax-danger').show();
							$('#alert-ajax-danger').html(result.message);

						}
					},
					error: function (xhr, ajaxOptions, thrownError) {
						$('#alert-ajax-danger').html('Something went wrong. Please try again');
					}
				});
		  } else {
				if ($('#page_status').val() != '') {
					$('.selectable-radio').prop('checked',false);
				}
		  }
		});
});
