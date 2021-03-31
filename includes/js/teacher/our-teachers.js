$(document).ready(function() {
	 $('#loader-div').hide();
	$( '#btn-show-more' ).on( 'click', function () {
		var last_id = $( "#page_no" ).val();
		var start_count =  parseInt(last_id)+1;
		
		loadMoreData(start_count);
	});

  $( '#select_teacher' ).select2();
});
$( '.our-teacher-search' ).on( 'click', function () {
  if ($('.teacher-name-search').val() == '') {
    $('#teacher-error').show();
  }else{
    $('#teacher-error').hide();
    $.ajax( {
        url: baseURL+'/our-teacher/ajaxviews',
        type: "POST",
        data: $('#form-filter').serialize(),
        // dataType: 'html',
        beforeSend: function () {
          $('#loader-div').show();
        }

      } )
      .done( function ( data ) {
        // console.log(data);
        var html= data.html;
        $('#loader-div').hide();
        $(".alert,.alert-danger").hide();
        $( "#our-teacher-container" ).html(html);
      
      } );
  }
	
  });

$('.our-teacher-reset').on('click',function(){
  window.location.href = baseURL+'/our-teachers';
});

$( '#select_teacher' ).on( 'change', function () {
  $('.btn-reset').show();
  if ($('.teacher-name-search').val() == '') {
    $('#teacher-error').show();
  }else{
    $('#teacher-error').hide();
    $.ajax( {
        url: baseURL+'/our-teacher/ajaxviews',
        type: "POST",
        data: $('#form-filter').serialize(),
        // dataType: 'html',
        beforeSend: function () {
          $('#loader-div').show();
        }

      } )
      .done( function ( data ) {
        // console.log(data);
        var html= data.html;
        $('#loader-div').hide();
        $(".alert,.alert-danger").hide();
        $( "#our-teacher-container" ).html(html);
      
      } );
  }
  
  });