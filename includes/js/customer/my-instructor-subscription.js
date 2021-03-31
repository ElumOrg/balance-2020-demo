$(document).ready(function() {
	$('#loader-div').hide();
	$('#alert-ajax-danger').hide();
});

$(document).on('click','.cancel-subscription',function(){
	var subscriptionPurchasedId = $(this).data('purchased-id');
		swal({
		  title: 'Are you sure?\n Do you want to cancel subsciption?\n This will not be refundable!',
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willProceed) => {
			if (willProceed) {
				$('#loader-div').show();
				$.ajax({
					url: baseURL+'/teacher-instructor-subscription/purchased/cancel',
					type: 'POST',
					data: {subscriptionPurchasedId:subscriptionPurchasedId,status:'Cancel'},
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
})


$(document).on('click','.inactive-subscription',function(){
	var subscriptionPurchasedId = $(this).data('purchased-id');
	var renewalStatus = "cancel";
		swal({
		  title: 'Are you sure?\n Do you want to inactivate subscription?',
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willProceed) => {
			if (willProceed) {
				$('#loader-div').show();
				$.ajax({
					url: baseURL+'/teacher-instructor-subscription/purchased/cancel',
					type: 'POST',
					data: {subscriptionPurchasedId:subscriptionPurchasedId,status:'Inactive'},
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
})


