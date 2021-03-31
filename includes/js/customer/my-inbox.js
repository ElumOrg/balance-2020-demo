
$("#chat").animate({ scrollTop: $('#chat').prop("scrollHeight")}, 1000);
$(document).on('click','.send-message',function(event){
    event.preventDefault();
    $.ajax({
        url: baseURL+'/instructor-contact-form-thread-submit',
        type: 'POST',
        data: $('#form-instructor-contact-thread').serialize(),
        success: function (result) {
            $('#submit-newsletter').attr("disabled",false);
                    sender_id = $('#fk_recipient_id').val();
                    contact_me_thread_id = $('#fk_instructor_contact_me_id').val();
                    console.log(sender_id,contact_me_thread_id);
          if (result.status) {
                        getAjaxview(sender_id,contact_me_thread_id);
          } else {
                        getAjaxview(sender_id,contact_me_thread_id);
          }
        },
        error: function (xhr, ajaxOptions, thrownError) {
          $("#error-action-supplier").html('Something went wrong. Please try again');
        }
      });
});


$(document).ready(function(){
    //Check for active chat id
    var active_chat_id = $('#active_chat').val();
    if (active_chat_id != '') {
        $('.'+active_chat_id).trigger('click');
    }
});

$('.user-sender').on('click',function(){
    var sender_id = $(this).attr('data-sender-id');
    var contact_me_thread_id = $(this).attr('data-contact-me-thread-id');
    $('.user-sender').removeClass('active-chat');
    $(this).addClass('active-chat');
    getAjaxview(sender_id,contact_me_thread_id);
});

function getAjaxview(sender_id,contact_me_thread_id){
        $('#loader-div').show();
    $.ajax({
            url: baseURL+'/instructor-contact-form/get-ajax-view',
            type: 'GET',
            data: {
                    sender_id:sender_id,
                    contact_me_thread_id:contact_me_thread_id
                  },
            success: function (result) {
                    $('#loader-div').hide();
                $('#submit-newsletter').attr("disabled",false);
                        console.log(result);
                        $('#replace-portion').html(result);
                        $("#chat").animate({ scrollTop: $('#chat').prop("scrollHeight")}, 1000);
            },
            error: function (xhr, ajaxOptions, thrownError) {
              $("#error-action-supplier").html('Something went wrong. Please try again');
            }
          });
}