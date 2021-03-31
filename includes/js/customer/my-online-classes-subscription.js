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
					url: baseURL+'/my-online-class-subscription/cancel',
					type: 'POST',
					data: {subscriptionPurchasedId:subscriptionPurchasedId},
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


$(document).on('click','.cancel-autorenewal-subscription',function(){
	var subscriptionPurchasedId = $(this).data('purchased-id');
	var renewalStatus = "cancel";
		swal({
		  title: 'Are you sure?\n Do you want to cancel autorenewal?',
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willProceed) => {
			if (willProceed) {
				$('#loader-div').show();
				$.ajax({
					url: baseURL+'/my-online-class-subscription/cancel-or-start/autorenewal',
					type: 'POST',
					data: {subscriptionPurchasedId:subscriptionPurchasedId,renewalStatus:renewalStatus},
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


$(document).on('click','.start-autorenewal-subscription',function(){
	var subscriptionPurchasedId = $(this).data('purchased-id');
	var renewalStatus = "start";

		swal({
		  title: 'Are you sure?\n Do you want to start autorenewal?',
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willProceed) => {
			if (willProceed) {
				$('#loader-div').show();
				$.ajax({
					url: baseURL+'/my-online-class-subscription/cancel-or-start/autorenewal',
					type: 'POST',
					data: {subscriptionPurchasedId:subscriptionPurchasedId,renewalStatus:renewalStatus},
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


$(document).on('click','.renew-subscription',function(){
	var subscriptionPurchasedId = $(this).data('purchased-id');

		swal({
		  title: 'Are you sure?\n Do you want to renew subscription?',
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willProceed) => {
			if (willProceed) {
				$('#loader-div').show();
				// $.ajax({
				// 	url: baseURL+'/my-online-class-subscription/renew',
				// 	type: 'POST',
				// 	data: {subscriptionPurchasedId:subscriptionPurchasedId},
				// 	success: function (result) {
				// 		if (result.status) {
				// 			$('#alert-ajax-danger').hide();
				// 			swal(result.message, {
				// 				icon: "success",
				// 			}).then((willProceed) => {
				// 				window.location.reload();
				// 			});
				// 		} else {
				// 			$('#alert-ajax-danger').show();
				// 			$('#alert-ajax-danger').html(result.message);
				// 		}
				// 	},
				// 	error: function (xhr, ajaxOptions, thrownError) {
				// 		$('#alert-ajax-danger').html('Something went wrong. Please try again');
				// 	}
				// });
				window.location = baseURL + '/my-online-class-subscription/renew/' +btoa(subscriptionPurchasedId);
			}

		});
})

$(document).on('click','.request-activate-subscription',function(){
	var subscriptionPurchasedId = $(this).data('purchased-id');

		swal({
		  title: 'Are you sure?\n Do you want to request admin to activate subscription?',
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willProceed) => {
			if (willProceed) {
				$('#loader-div').show();
				$.ajax({
					url: baseURL+'/my-online-class-subscription/request-admin-to-activate',
					type: 'POST',
					data: {subscriptionPurchasedId:subscriptionPurchasedId},
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
