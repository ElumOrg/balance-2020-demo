$(document).ready(function() {
   $('#loader-div').hide();
   var recurring = [];
   $('.recurring-radio-btn').hide();

   recurring_popup_after_login = $('#recurring_popup_after_login').val();
   if (recurring_popup_after_login != '') {
       $('#RecurringClassesModal').modal({
          backdrop: 'static',
          keyboard: false
      });
   }

	$('.live-classes-book').validate({
		rules: {
      firstname :{
          required:true,
          // noSpace: true
      },
      lastname  :{
          required:true,
          // noSpace: true
      },
      email :{
          required:true,
					email:true
      },
      mobile  :{
          // required:true,
          phoneNumber :true,
      },
			e_terms:{
				required : true,
			}
		},
    messages : {
      firstname :{
          required:'Please enter the first name.',
      },
      lastname  :{
          required:'Please enter the last name.',
      },
      email :{
          required:'Please enter the email address.',
					email:'Please enter the valid email address.'
      },
      mobile  :{
          // required:'Please enter the mobile number.',
      },
			e_terms:{
				required : 'Please read the waiver policy.',
			}
    },
  	submitHandler: function (form) {
      form.submit();
      $("#book-submit").attr("disabled","disabled");
    }
  });

});


jQuery.validator.addMethod("phoneNumber", function (value, element) {
    return /^[\d+ ]*$/.test(value)
}, "Please enter the valid phone number.");

jQuery.validator.addMethod("noSpace", function(value, element) {
  return value.indexOf(" ") < 0 && value != "";
}, "Please remove space.");

function addToAccount(element){

  var url = $(element).attr('data-href');
  var asset_id = $(element).attr('data-asset-id');
  var price         = parseFloat($(element).attr('data-class-price'));
  var package_min_cost = parseFloat($(element).attr('data-min-cost'));
  
  // console.log(url);
  // console.log(price);
  // console.log(package_min_cost);
  var checked = $('input.e_terms_package_or_subscription').is(':checked');
  if (!checked) {
    $('.e_terms_package_or_subscription_error').show();
    $('.e_terms_package_or_subscription_error').html('Please read the waiver policy');
    return false;
  }else{
    $('.e_terms_package_or_subscription_error').hide();
    $('.e_terms_package_or_subscription_error').html('');
  
  

  if(price > package_min_cost){
    $("#package_discount").val(package_min_cost);
    $('#online_class_subscription').val('');
    $("#book-submit").submit();

  }else{

     $.ajax( {
        //url: '/loadMoreData.php?last_id=' + last_id,
        url: url,
        type: "post",
        // dataType: 'json',
        data: {
          'asset_id': asset_id,
          'price' : price,
        },
        beforeSend: function () {
          $('#loader-div').show();
        }

      } )
      .done( function ( data ) {
        console.log(data);
         $('#loader-div').hide();
         if (data.status == 'payment') {
            window.location.href = data.redirect_url;
         }else
         {
          swal(data.message, {
              icon: "success",
            }).then((willProceed) => {
            //  window.location.reload();
            });
         }
       /* if ( data == '' ) {
          $('#loader-div').hide();
          swal(data.message, {
              icon: "success",
            }).then((willProceed) => {
            //  window.location.reload();
            });

        } else {
          $('#loader-div').hide();
           swal('Error', {
              icon: "success",
            }).then((willProceed) => {
            //  window.location.reload();
            });
        }*/
      } );

  }

 }

}


function addToAccountSeriesClasses(element){
  var url = $(element).attr('data-href');
  var asset_id = $(element).attr('data-asset-id');
  var price         = parseFloat($(element).attr('data-class-price'));
  var seriesPerClassPrice         = parseFloat($(element).attr('data-series-per-class-price'));
  var package_min_cost = parseFloat($(element).attr('data-min-cost'));
  var checked = $('input.e_terms_package_or_subscription').is(':checked');

  if (!checked) {
    $('.e_terms_package_or_subscription_error').show();
    $('.e_terms_package_or_subscription_error').html('Please read the waiver policy');
    return false;
  }else{
    $('.e_terms_package_or_subscription_error').hide();
    $('.e_terms_package_or_subscription_error').html('');
  
     $("#recurring-classes-modal-title").html('Series Classes');
      $("#recurring-classes-modal-button").html('Proceed');

      $('#SeriesClassesModal').modal({
          backdrop: 'static',
          keyboard: false
      });
    // if(seriesPerClassPrice > package_min_cost){
    //   $("#package_discount").val(package_min_cost);
    //   $('#online_class_subscription').val('');
    //   $("#book-submit").submit();

    // }else{

    //  $.ajax( {
    //     //url: '/loadMoreData.php?last_id=' + last_id,
    //     url: url,
    //     type: "post",
    //     data: {
    //       'asset_id': asset_id,
    //       'price' : price,
    //     },
    //     beforeSend: function () {
    //       $('#loader-div').show();
    //     }

    //   } )
    //   .done( function ( data ) {
    //     console.log(data);
    //      $('#loader-div').hide();
    //      if (data.status == 'payment') {
    //         window.location.href = data.redirect_url;
    //      }else
    //      {
    //       swal(data.message, {
    //           icon: "success",
    //         }).then((willProceed) => {
    //         });
    //      }
    //   } );

    // }

  }
}

function addToAccountForSubscription(element){

  var url = $(element).attr('data-href');
  var asset_id = $(element).attr('data-asset-id');
  var price         = parseFloat($(element).attr('data-class-price'));
  var package_min_cost = parseFloat($(element).attr('data-min-cost'));
  var online_class_subscription_premium_discount = parseFloat($(element).attr('data-premium-discount'));

  var online_class_subscription_is_vip_subscription = $(element).attr('data-vip-subscription');
  
  // alert(online_class_subscription_premium_discount);
  // console.log(url);
  // console.log(price);
  // console.log(package_min_cost);

  var checked = $('input.e_terms_package_or_subscription').is(':checked');
  if (!checked) {
    $('.e_terms_package_or_subscription_error').show();
    $('.e_terms_package_or_subscription_error').html('Please read the waiver policy');
    return false;
  }else{
    $('.e_terms_package_or_subscription_error').hide();
    $('.e_terms_package_or_subscription_error').html('');

    if (online_class_subscription_is_vip_subscription != '' && online_class_subscription_is_vip_subscription == 'Yes') {
      $('#online_class_subscription').val(online_class_subscription_premium_discount);
      $('#is_vip_subscription').val(online_class_subscription_is_vip_subscription);
      $("#package_discount").val('');
      $("#book-submit").submit();

    }else{
        if(price){

         $.ajax( {
            //url: '/loadMoreData.php?last_id=' + last_id,
            url: url,
            type: "post",
            // dataType: 'json',
            data: {
              'asset_id': asset_id,
              'price' : price,
            },
            beforeSend: function () {
              $('#loader-div').show();
            }

          } )
          .done( function ( data ) {
            console.log(data);
             $('#loader-div').hide();
             if (data.status == 'payment') {
                window.location.href = data.redirect_url;
             }else
             {
              swal(data.message, {
                  icon: "success",
                }).then((willProceed) => {
                //  window.location.reload();
                });
             }
           /* if ( data == '' ) {
              $('#loader-div').hide();
              swal(data.message, {
                  icon: "success",
                }).then((willProceed) => {
                //  window.location.reload();
                });

            } else {
              $('#loader-div').hide();
               swal('Error', {
                  icon: "success",
                }).then((willProceed) => {
                //  window.location.reload();
                });
            }*/
          } );

        }
    }
  }
 

}


$('.btn-buy-now-live-class').on('click',function(){
  var checked = $('input.e_terms_package_or_subscription').is(':checked');
  if (!checked) {
    $('.e_terms_package_or_subscription_error').show();
    $('.e_terms_package_or_subscription_error').html('Please read the waiver policy');
    return false;
  }else{
    $('.e_terms_package_or_subscription_error').hide();
    $('.e_terms_package_or_subscription_error').html('');
    $("#book-submit").submit();
  }
});

var recurring = [];
var allClassessWithrecurring = [];

var master_price = parseFloat($('input[name=input_master_class_price]').val());
var master_class_id = parseFloat($('input[name=input_master_class_id]').val());
var master_date = $('input[name=input_master_class_date]').val();
var master_is_valid_subscription_class = $('input[name=input_master_is_valid_subscription_class]').val();

allClassessWithrecurring.push({date:master_date, price:master_price, class_id:master_class_id,is_valid_subscription_class:master_is_valid_subscription_class})

//main checkbox checked functionality
$('#checkbox-show-recurring-class').on('click',function(){
    if(this.checked) {
      $("#recurring-classes-modal-title").html('Recurring Classes');
      $("#recurring-classes-modal-button").html('Proceed');

      $('#RecurringClassesModal').modal({
          backdrop: 'static',
          keyboard: false
      });

    }else{
      $('#recurring_booked').val('');
      $('.booked-recurring').remove();
      $('.check-add-recurring').prop("checked", false);
      $('.popup-tr-recurring').remove();
      var input_master_class_price = parseFloat($("input[name=input_master_class_price]").val());
      var input_final_price = parseFloat($("input[name=input_final_price]").val());
      $("input[name=input_final_price]").val(input_master_class_price.toFixed(2));
      $('#final_price').html('$'+input_master_class_price.toFixed(2));

      recurring = [];
      console.log(recurring);
    }
})

//Checkboxes on popup
$('.check-add-recurring').on('click',function(){
    var input_master_class_price = parseFloat($("input[name=input_master_class_price]").val());
    var input_final_price = parseFloat($("input[name=input_final_price]").val());

    var is_valid_subscription_class = $(this).attr('data-valid-subscription-class');

    if(this.checked) {
      

      var date = $(this).data('date');
      var price = $(this).data('price');
      var class_id = $(this).data('class-id');

      var html = '';
      html += '<tr class="popup-tr-recurring" id="'+class_id+'"><td>'+date+'</td><td class="rec-td-price" data-price="'+price+'">$'+price+'</td></tr>';

      input_final_price = parseFloat(input_final_price) + parseFloat(price);

      $("input[name=input_final_price]").val(input_final_price.toFixed(2));
      $('#final_price').html('$'+input_final_price.toFixed(2));
      $('#recurring_body').append(html);

      $("input[name=input_original_final_price]").val(input_final_price.toFixed(2));

      classes_count = $('#classes_count').val();
      $('#classes_count').val(parseFloat(classes_count)+1);

      recurring.push({date:date, price:price, class_id:class_id, is_valid_subscription_class:is_valid_subscription_class });
      allClassessWithrecurring.push({date:date, price:price, class_id:class_id, is_valid_subscription_class:is_valid_subscription_class });

      if(recurring.length > 0){
        $('.recurring-radio-btn').show();
      }else{
        $('.recurring-radio-btn').hide();
      }

      if ($('#radio_package').is(':checked')) {
        console.log('in Checked===== '+allClassessWithrecurring.length);
        input_final_price = parseFloat(allClassessWithrecurring.length * price);
        // $("input[name=input_final_price]").val(input_final_price.toFixed(2));
        $('#radio_package').prop("checked", true).trigger("click");
      }

      if($('#radio_subscrition').is(':checked')){
        if (is_valid_subscription_class == 'Yes') {
          console.log('in Checked===== '+allClassessWithrecurring.length);
          input_final_price = parseFloat(allClassessWithrecurring.length * price);
          // $("input[name=input_final_price]").val(input_final_price.toFixed(2));
          $('#radio_subscrition').prop("checked", true).trigger("click");
        }else{
          swal({
            text: 'This class is out of subscription period. You will need to pay!',
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willProceed) => {
            if (!willProceed) {
                $(this).prop('checked',false);
                var date = $(this).data('date');
                var price = $(this).data('price');
                var class_id = $(this).data('class-id');
                var data_todele = $('#recurring_body').find('#'+class_id);

                var class_price = jQuery('#'+class_id).find("td:eq(1)").text();
                var newPrice = class_price.replace(/[^0-9\.]/g, '');
                console.log(newPrice);
                // 

                input_final_price = parseFloat(input_final_price) - parseFloat(newPrice);

                $("input[name=input_final_price]").val(input_final_price.toFixed(2));
                $('#final_price').html('$'+input_final_price.toFixed(2));

                $("input[name=input_original_final_price]").val(input_final_price.toFixed(2));

                $('#'+class_id+'').remove();
                recurring = jQuery.grep(recurring, function(value) {
                  return value.class_id != class_id;
                });

                allClassessWithrecurring = jQuery.grep(allClassessWithrecurring, function(value) {
                  return value.class_id != class_id;
                });

                if(recurring.length > 0){
                  $('.recurring-radio-btn').show();
                }else{
                  $('.recurring-radio-btn').hide();
                }
                
                classes_count = $('#classes_count').val();
                $('#classes_count').val(parseFloat(classes_count)-1);
                console.log(classes_count);

                $('#post_recurring_classes_json_data').val(JSON.stringify(recurring));
                $('#post_recurring_with_all_classes_json_data').val(JSON.stringify(allClassessWithrecurring));
            }

          }); 
        }
      }

      console.log(classes_count);
      $('#post_recurring_classes_json_data').val(JSON.stringify(recurring));
      $('#post_recurring_with_all_classes_json_data').val(JSON.stringify(allClassessWithrecurring));

    }else{
      
      var date = $(this).data('date');
      var price = $(this).data('price');
      var class_id = $(this).data('class-id');
      var data_todele = $('#recurring_body').find('#'+class_id);

      var class_price = jQuery('#'+class_id).find("td:eq(1)").text();
      var newPrice = class_price.replace(/[^0-9\.]/g, '');
      console.log(newPrice);
      // 

      input_final_price = parseFloat(input_final_price) - parseFloat(newPrice);

      $("input[name=input_final_price]").val(input_final_price.toFixed(2));
      $('#final_price').html('$'+input_final_price.toFixed(2));

      $("input[name=input_original_final_price]").val(input_final_price.toFixed(2));

      $('#'+class_id+'').remove();
      recurring = jQuery.grep(recurring, function(value) {
        return value.class_id != class_id;
      });

      allClassessWithrecurring = jQuery.grep(allClassessWithrecurring, function(value) {
        return value.class_id != class_id;
      });

      if(recurring.length > 0){
        $('.recurring-radio-btn').show();
      }else{
        $('.recurring-radio-btn').hide();
      }
      
      classes_count = $('#classes_count').val();
      $('#classes_count').val(parseFloat(classes_count)-1);
      console.log(classes_count);

      $('#post_recurring_classes_json_data').val(JSON.stringify(recurring));
      $('#post_recurring_with_all_classes_json_data').val(JSON.stringify(allClassessWithrecurring));
    }
})

$('#proceed_recurring').on('click',function(e){
  // console.log(recurring.length);
  // if(recurring.length != 0){
  //   recurring = JSON.stringify(recurring);
  //   $('#recurring_booked').val(recurring);
  //   var data = JSON.parse(recurring);
  //   var html = '<li class="booked-recurring"><span>Upcomming Booked Recurring</span></li>';
  //   data.forEach(function(item){
  //     html += '<li class="booked-recurring">';
  //     html += '<span><strong>Date Time:</strong>'+ item.date +'</span>';
  //     html += '<span><strong>Price($):</strong>'+ item.price +'</span>';
  //     html +=   '</li>';

  //   });
  //   $('#li_recurring').append(html);
  // }else{
  //   $('#recurring_booked').val();
  //   $('#checkbox-show-recurring-class').prop("checked", false);
  // }

  // $('#RecurringClassesModal').modal('toggle');
  // return false;
    e.preventDefault();

  var checked = $('input.e_terms_recurring').is(':checked');
  if (!checked) {
    $('.e_terms_recurring_error').show();
    $('.e_terms_recurring_error').html('Please read the waiver policy');
    return false;
  }else{
    $('.e_terms_recurring_error').hide();
    $('.e_terms_recurring_error').html('');

    var master_price = parseFloat($('input[name=input_master_class_price]').val());
    var packageOrsubscription = value = $("input[name=use_pkg_subscription]").val();
    var package_min_cost = parseFloat($('#package_min_cost').val());

    swal({
        title: 'Are you sure?',
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willProceed) => {
        if (willProceed) {
          $('#loader-div').show();
          $('#form-recurring-post').submit();
        }

      });  

  }
    
});


$("input[name=use_pkg_subscription]").on('click',function(){
  $('#is_recurring_vip_subscription').val();
  value = $(this).val();
  classes_count = $('#classes_count').val();
  master_class_id = $("input[name=input_master_class_id]").val();
  var input_master_class_price = parseFloat($("input[name=input_master_class_price]").val());
  var input_final_price = parseFloat($("input[name=input_final_price]").val());
  var package_min_cost = parseFloat($('#package_min_cost').val());
  var subscription_package_min_cost = parseFloat($('#subscription_package_min_cost').val());

  $('#loader-div').show();
  $.ajax( {
        //url: '/loadMoreData.php?last_id=' + last_id,
        url: baseURL + '/check-package-or-subscription-for-recurring-classes',
        type: "post",
        data: {
          'type': value,
          'classes_count' : classes_count,
          'master_class_id' : master_class_id,
        },
        beforeSend: function () {
          // $('#loader-div').show();
        }

      } )
      .done( function ( data ) {
         $('#loader-div').hide();
         if (data.status) {
          $('#subscription_or_package_used_data').val(JSON.stringify(data));
          // alert(value);
          if (value == 'subscription') {

            package_min_cost = subscription_package_min_cost;
            
            $("#radio_package").css("cursor", 'pointer');
            $("#radio_package").css("pointer-events", '');

            $("#radio_subscrition").css("cursor", 'not-allowed');
            $("#radio_subscrition").css("pointer-events", 'none');
            
            original_price = parseFloat($("input[name=input_original_final_price]").val());
            $("input[name=input_final_price]").val(original_price.toFixed(2));
            $('#final_price').html('$'+original_price.toFixed(2));
            console.log('original in sub===> '+original_price);

            var subsciption_used = data.subsciption_used;
            var no_of_classes_used_subscription = subsciption_used.no_of_classes_used_subscription;
            if($('#post_recurring_classes_json_data').val() != '' || $('#post_recurring_with_all_classes_json_data').val() != ''){
              var countClass = 0;
              for (var i = 0; i < no_of_classes_used_subscription; i++) {
                console.log(allClassessWithrecurring[i]);
                class_id = allClassessWithrecurring[i].class_id;
                if (value == 'subscription' && allClassessWithrecurring[i].is_valid_subscription_class == 'Yes') {
                  price = allClassessWithrecurring[i].price;
                  countClass++;

                  if (data.online_class_subscription_details.is_vip_subscription != '' &&  data.online_class_subscription_details.is_vip_subscription == 'Yes') {
                        $('#is_recurring_vip_subscription').val(data.online_class_subscription_details.is_vip_subscription);
                        price = parseFloat(allClassessWithrecurring[i].price);
                        input_final_price = $("input[name=input_final_price]").val();

                        priceAfterMinCost = parseFloat(price);
                        discountAmount = parseFloat(priceAfterMinCost) - parseFloat(priceAfterMinCost * (data.online_class_subscription_details.premium_class_discount/100));
                        jQuery('#'+class_id).find("td:eq(1)").text('$'+discountAmount);
                        jQuery('#'+class_id).find("td:eq(1)").attr('data-price',discountAmount);

                        // input_final_price = parseFloat(input_final_price) - parseFloat(price);
                        // input_final_price = parseFloat(input_final_price) + parseFloat(discountAmount);

                        allClassessWithrecurring[i].isPremiumSubsciptionUsed = "Yes";

                        input_final_price = calc_total();
                        $("input[name=input_final_price]").val(input_final_price.toFixed(2));
                        $('#final_price').html('$'+input_final_price.toFixed(2));
                        console.log(allClassessWithrecurring);
                        $('#post_recurring_with_all_classes_json_data').val(JSON.stringify(allClassessWithrecurring));
                  }else{

                      if (price >= package_min_cost) {
                        price = parseFloat(allClassessWithrecurring[i].price);
                        input_final_price = $("input[name=input_final_price]").val();

                        priceAfterMinCost = parseFloat(price) - parseFloat(package_min_cost);
                        discountAmount = parseFloat(priceAfterMinCost) - parseFloat(priceAfterMinCost * (data.online_class_subscription_details.premium_class_discount/100));
                        jQuery('#'+class_id).find("td:eq(1)").text('$'+discountAmount);
                        jQuery('#'+class_id).find("td:eq(1)").attr('data-price',discountAmount);

                        // input_final_price = parseFloat(input_final_price) - parseFloat(price);
                        // input_final_price = parseFloat(input_final_price) + parseFloat(discountAmount);

                        allClassessWithrecurring[i].isPremiumSubsciptionUsed = "Yes";

                        input_final_price = calc_total();
                        $("input[name=input_final_price]").val(input_final_price.toFixed(2));
                        $('#final_price').html('$'+input_final_price.toFixed(2));
                        console.log(allClassessWithrecurring);
                        $('#post_recurring_with_all_classes_json_data').val(JSON.stringify(allClassessWithrecurring));
                      }else{
                        price = allClassessWithrecurring[i].price;

                        input_final_price = $("input[name=input_final_price]").val();
                        input_final_price = parseFloat(input_final_price) - parseFloat(price);

                        discountAmount = 0;

                        jQuery('#'+class_id).find("td:eq(1)").text(discountAmount);
                        jQuery('#'+class_id).find("td:eq(1)").attr('data-price',discountAmount);
                        input_final_price = calc_total();

                        $("input[name=input_final_price]").val(input_final_price.toFixed(2));
                        $('#final_price').html('$'+input_final_price.toFixed(2));
                      }
                  }
                  class_id = allClassessWithrecurring[i].class_id;
                  $('#'+class_id).css('background-color','#ccf3c3');
                  
                  $('#error_message_for_pck_sub').html(countClass+' classes will be paid using subscription.');
                }

              }
            }
          }else{
            // alert('');
            original_price = parseFloat($("input[name=input_original_final_price]").val());
            $("input[name=input_final_price]").val(original_price.toFixed(2));
            $('#final_price').html('$'+original_price.toFixed(2));
            console.log('original in package ===> '+original_price);

            $("#radio_package").css("cursor", 'not-allowed');
            $("#radio_package").css("pointer-events", 'none');

            $("#radio_subscrition").css("cursor", 'pointer');
            $("#radio_subscrition").css("pointer-events", '');

            var subsciption_used = data.package_used;
            var no_of_classes_used_subscription = subsciption_used.no_of_classes_used_package;
            if($('#post_recurring_classes_json_data').val() != ''){
              for (var i = 0; i < no_of_classes_used_subscription; i++) {
                class_id = allClassessWithrecurring[i].class_id;
                if (value == 'package') {
                  price = allClassessWithrecurring[i].price;

                  if (price >= package_min_cost) {
                    price = parseFloat(allClassessWithrecurring[i].price);
                    input_final_price = $("input[name=input_final_price]").val();
                    
                    discountAmount = parseFloat(price) - parseFloat(package_min_cost);
                    jQuery('#'+class_id).find("td:eq(1)").text(discountAmount);
                    jQuery('#'+class_id).find("td:eq(1)").attr('data-price',discountAmount);

                    input_final_price = parseFloat(input_final_price) - parseFloat(price);
                    input_final_price = parseFloat(input_final_price) + parseFloat(discountAmount);

                    allClassessWithrecurring[i].isPremiumPackageUsed = "Yes";
                    input_final_price = calc_total();
                    
                    $("input[name=input_final_price]").val(input_final_price.toFixed(2));
                    $('#final_price').html('$'+input_final_price.toFixed(2));
                    console.log(allClassessWithrecurring);
                    $('#post_recurring_with_all_classes_json_data').val(JSON.stringify(allClassessWithrecurring));
                  }else{
                    price = allClassessWithrecurring[i].price;
                    input_final_price = $("input[name=input_final_price]").val();

                    input_final_price = parseFloat(input_final_price) - parseFloat(price);

                    discountAmount = 0;

                    jQuery('#'+class_id).find("td:eq(1)").text(discountAmount);
                    jQuery('#'+class_id).find("td:eq(1)").attr('data-price',discountAmount);
                    input_final_price = calc_total();
                    
                    $("input[name=input_final_price]").val(input_final_price.toFixed(2));
                    $('#final_price').html('$'+input_final_price.toFixed(2));
                  }

                }

                class_id = allClassessWithrecurring[i].class_id;
                $('#'+class_id).css('background-color','#ccf3c3');
              }
              $('#error_message_for_pck_sub').html(subsciption_used.message);
            }

          }

          

            
            
         }else{

         }
      });
});

function calc_total(){
  var sum = 0;
  $(".rec-td-price").each(function(){
    sum += parseFloat($(this).attr('data-price'));
  });
  return sum;
}

$('#RecurringClassesModal').on('hidden.bs.modal', function () {
   $('#checkbox-show-recurring-class').prop('checked',false); 
});


$('#series_classes_proceed').on('click',function(){
  $(".series-classes-book").submit();

})