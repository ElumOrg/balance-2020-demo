$(document).ready(function() {
	$('#loader-div').hide();
    
});

$('.btn-countdown').on('click',function(){
    if ($(this).text() == 'Join Now') {
        action = $('.btn-countdown').attr('data-zoom-url');
    }
});

$('#descriptionModal').on('hidden.bs.modal', function () {
    $("#form-tip").validate().resetForm();
    $("#form-tip")[0].reset();
    $("#form-tip").find('input.error').removeClass("error");
});

$(document).on('click', '.read-more-description', function () {
    title = $(this).attr('data-title');
    var message =  $(this).attr('data-message');

    var id =  $(this).attr('data-id');
    var message =  atob($("#"+id).val());

    console.log(message);
    $('#description-message').html('');
    $('#description-message').html(message);
    $('#description-title').html(title);
    $('#descriptionModal').modal({
        backdrop: 'static',
        keyboard: false
    });
});
