$(document).ready(function() {
	
	$( '#btn-show-more' ).on( 'click', function () {
		var last_id = $( "#page_no" ).val();
		var start_count =  parseInt(last_id)+1;
		
		loadMoreData(start_count);
	} );

});
function loadMoreData(start_count) {
	
	$( "#page_no" ).val(start_count);
  $('#loader-div').show();
	$.ajax( {
        url: baseURL+'/teacher-transactions/online-classes/ajaxTransactions',
        type: "POST",
        data: $('#form-transaction').serialize(),
        // dataType: 'html',
        beforeSend: function () {
          // $('#loader-div').show();
        }

      } )
      .done( function ( data ) {
        // console.log(data);
        var html= data.html;
        var count= data.count;
        // console.log(count);
        $('#loader-div').hide();
        //$("#no_quotes").hide();
        $(".alert,.alert-danger").hide();
		
		    $('#btn-show-more' ).show();
        if(count<10){
        	 $('#btn-show-more' ).hide();
        }
        if ( count == 0 ) {
         // console.log('blank');
          // $('#btn-show-more' ).hide();
          if(start_count==1){
          	$( ".teacher-approval" ).html(html);
          }else{
          	$(".refer-friends" ).append('<span class="alert alert-danger"> No More Transactions Available. </span>');
		  }
        } else {
          // $('#btn-show-more' ).show();
          if(start_count==1){
          	$( ".teacher-approval" ).html(html);
          }else{
          	$( ".teacher-approval" ).append(html);
          }
          /*var total_booking = $('#total_booking').val();
          var const_page_record = $('#const-page-record').val();
          if (total_booking<const_page_record) {
            $( '#btn-show-more' ).hide();
          }*/
        }
      } );
  }