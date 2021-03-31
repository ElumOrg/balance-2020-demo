function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}
function applyPromocodeParticipant(){

	var url = baseURL + '/pay/promocode';
	//var data = [];
	var promocode = $("#promo_code").val();
	var participant = $("#participant").val();
	var per_participant_amount = $('#per_participant_amount').val();
	$('#per_participant_text').html('Amount: $'+per_participant_amount+' * ' +participant);
	$('#loader-div').show();
	$.ajax({
	url: url,
	type: 'POST',
	data: {promocode : promocode,participant : participant},
	success: function (result) {
	 // console.log(result.data);
		  $('#loader-div').hide();
	  if (result.status) {
	  	var out = result.data;

		  	var discounted = 0;
			if(out.giftcard_redemption && out.giftcard_redemption>0){
				discounted = out.giftcard_redemption;
			}else if(out.promocode_redemption && out.promocode_redemption>0){
				discounted = out.promocode_redemption;
			}else if(out.package_redemption && out.package_redemption>0){
				discounted = out.package_redemption;
			}

			var total_actual_amount_txt = out.total_booking_amount;
			if(out.extra_participant_amt){
				total_actual_amount_txt = (out.total_booking_amount-out.extra_participant_amt);
			}

			$(".discounted-amount").next().text("$"+discounted);
			// $("#total_actual_amount_txt").text('$'+total_actual_amount_txt);
			$("#total_booking_amount_txt").text('$'+out.total_booking_amount.toFixed(2));
			$("#total_payable_amount_txt").text("$"+out.total_payable_amount.toFixed(2));
			$("#total_stripe_amount_txt").text("$"+out.total_stripe_amount.toFixed(2));
			$("#participant_amount").text("$"+out.extra_participant_amt.toFixed(2));
			$("#extra_participant").val(participant);
			$("#coupon_code").val(promocode);
		//$("#alert_msg").removeClass("alert-danger").addClass('alert-success').text(result.message).show();
		/*$('#alert-ajax-danger').hide();
		swal(result.message, {
			icon: "success",
		}).then((willProceed) => {
			
		});*/
	  } else {
	    $("#alert_msg").removeClass("alert-success").addClass('alert-danger').text(result.message).show();
	    setTimeout(function(){
	    	window.location.reload();
	    },2000);
	  	// $('#alert-ajax-danger').show();
		// $('#alert-ajax-danger').html(result.message);
	  }
	},
	error: function (xhr, ajaxOptions, thrownError) {
		console.log('error');
	  //$("#error-action-supplier").html('Something went wrong. Please try again');
		}
	});
}

/*$(document).ready(function(){

	$("#btn_promocode").on("click",function(){
		applyPromocodeParticipant();		 
	});

});*/

/*function calculateAmount(element){

	var participant = $(element).val();
	var participant_hourly_rate = $("#participant_hourly_rate").val();
	var duration = $("#duration").val();
	var promocode_redemption = $("#promocode_redemption").val();

	var participant_amount = parseFloat(parseInt(duration)/60)*parseFloat(participant_hourly_rate)*parseInt(participant);
	
	//need to calculate total amount using duration and hourly rate
	var total_payable_amount = $("#total_booking_amount").val();

	if(participant){

		//$("#participant_amount").text('$'+participant_amount);
		$("#extra_participant").val(participant);
		$("#participant_count").val(participant);
		var total_amount = (participant_amount)+parseFloat(total_payable_amount)-parseFloat(promocode_redemption);

		$("#total_payable_amount_txt").text('$'+total_amount);
		$("#total_payable_amount").val(total_amount);
		
	}else{
		// var total_amount = (parseInt(0)*parseFloat(participant_hourly_rate))+parseFloat(total_payable_amount);

		//$("#total_booking_amount_txt").text('$'+total_payable_amount);
		//$("#participant_amount").text('$0');
		$("#participant_count").val(0);

		$("#total_payable_amount_txt").text('$'+total_payable_amount);
	}
	// console.log(participant,participant_hourly_rate,total_payable_amount,total_amount);

}*/
/*function removeRedeemPackage(element){
	var packageId = $(element).attr('data-id');
	// console.log(element);
		
	swal({
	  text: "Are you sure ?",
	  icon: "warning",
	  buttons: true,
	  dangerMode: false,
	})
	.then((willProceed) => {
	  if (willProceed) {
			$('#loader-div').show();
			$.ajax({
				url: baseURL+'/',
				type: 'POST',
				data: {packageId:packageId},
				success: function (result) {
					$('#loader-div').hide();
					
				},
				error: function (xhr, ajaxOptions, thrownError) {
					$('#alert_msg').html('Something went wrong. Please try again');
				}
			});
	  } else {
			console.log("else");
	  }
	});
}*/

$("#pay-form").submit(function (e) {

    //stop submitting the form to see the disabled button effect
    // e.preventDefault();

    //disable the submit button
    $("#btnProceedToPay").attr("disabled", true);
    $('#loader-div').show();
    return true;

});