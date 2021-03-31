function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    // alert(charCode);
    if (charCode > 31 && (charCode < 48 || charCode > 57)  && charCode != 46) {
        return false;
    }
    return true;
}
$("#donation_amount").on('input',function(){
  var donation_amount = parseFloat($("#donation_amount").val());
  var actual_amount = parseFloat($('#original_actual_amount').val());
  var stripe_charge = parseFloat($('#original_stripe_charge').val());
  var total_payable_amount = parseFloat($('#original_total_payable_amount').val());
  
  if (donation_amount > 0) {
    // actual_amount_after_donation = actual_amount + donation_amount;
    // stripe_charge = (actual_amount_after_donation * (2.9/100)) + 0.3;
    // total_payable_amount = stripe_charge + actual_amount_after_donation;
    actual_amount_after_donation = parseFloat(total_payable_amount) + parseFloat(donation_amount);
    total_payable_amount = actual_amount_after_donation;

    $('#total_stripe_charge_amount_txt').html('$'+stripe_charge.toFixed(2));
    $('#total_payable_amount_txt').html('$'+total_payable_amount.toFixed(2));
    $('#stripe_charge').val(stripe_charge.toFixed(2));
    $('#total_payable_amount').val(total_payable_amount.toFixed(2));
  }else {
    original_actual_amount = $('#original_actual_amount').val();
    original_stripe_charge = $('#original_stripe_charge').val();
    original_total_payable_amount = $('#original_total_payable_amount').val();

    $('#total_stripe_charge_amount_txt').html('$'+$('#original_text_stripe_charge').val());
    $('#total_payable_amount_txt').html('$'+$('#original_text_total_payable_amount').val());
    $('#stripe_charge').val(original_stripe_charge);
    $('#total_payable_amount').val(original_total_payable_amount);
  }



});


$('.use_credit').on('click',function(){
	var donation_amount = parseFloat($("#donation_amount").val());
	var actual_amount = parseFloat($('#original_actual_amount').val());
	var stripe_charge = parseFloat($('#original_stripe_charge').val());
	var total_payable_amount = parseFloat($('#original_total_payable_amount').val());
	var credit_balance = parseFloat($('#credit_balance').val());

	var stripe_percent = parseFloat($('#stripe_percent').val());
	var stripe_additional_charge = parseFloat($('#stripe_additional_charge').val());
	if(this.checked) {

		// alert(credit_balance);
		if (credit_balance > actual_amount) {
			total_credit_used = actual_amount;
			actual_amount_after_credit = 0;
		}else{
			total_credit_used = credit_balance;
			actual_amount_after_credit = actual_amount-total_credit_used;
		}

		if (actual_amount_after_credit > 0) {
	    	stripe_charge = (actual_amount_after_credit * (stripe_percent/100)) + stripe_additional_charge;
	    	total_payable_amount = stripe_charge + actual_amount_after_credit;
		}else{
			stripe_charge = 0;
	    	total_payable_amount = 0;
		}

	    $('#credit-resumption').show();
	    $('#total_stripe_charge_amount_txt').html('$'+stripe_charge.toFixed(2));
	    $('#total_payable_amount_txt').html('$'+total_payable_amount.toFixed(2));
	    $('#total_actual_amount_after_credit_txt').html('- $'+total_credit_used.toFixed(2));

	    $('#stripe_charge').val(stripe_charge.toFixed(2));
	    $('#total_payable_amount').val(total_payable_amount.toFixed(2));
	    $('#credit_resumption').val(total_credit_used.toFixed(2));

	}else{
		original_actual_amount = $('#original_actual_amount').val();
	    original_stripe_charge = $('#original_stripe_charge').val();
	    original_total_payable_amount = $('#original_total_payable_amount').val();

	    $('#credit-resumption').hide();
	    $('#total_actual_amount_after_credit_txt').html('');
	    $('#total_stripe_charge_amount_txt').html('$'+$('#original_text_stripe_charge').val());
	    $('#total_payable_amount_txt').html('$'+$('#original_text_total_payable_amount').val());
	    $('#stripe_charge').val(original_stripe_charge);
	    $('#total_payable_amount').val(original_total_payable_amount);
	    $('#credit_resumption').val('');
	}
});


$("#live-class-pay-form").submit(function (e) {

    //stop submitting the form to see the disabled button effect
    // e.preventDefault();

    //disable the submit button
    $("#btnProceedToPay").attr("disabled", true);
    $('#loader-div').show();
    return true;

});

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
