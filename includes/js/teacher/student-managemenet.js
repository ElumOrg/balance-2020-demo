$(document).ready(function() {
	$('#loader-div').hide();
	$('#alert-ajax-danger').hide();
});


$(document).on('click', '.delete-student', function () {
		var crmId = $(this).attr('data-crm-id');
		swal({
		  title: 'Delete Member?',
    	  text: 'Are you sure you want to delete this member?',
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willProceed) => {
			if (willProceed) {
				$('#loader-div').show();
				$.ajax({
					url: baseURL+'/teacher-student-managment/delete',
					type: 'POST',
					data: {crmId:crmId},
					success: function (result) {
						if (result.status) {
							$('#alert-ajax-danger').hide();
							swal(result.message, {
								icon: "success",
							}).then((willProceed) => {
								window.location.reload();
							});
						} else {
							$('#loader-div').hide();
							$('#alert-ajax-danger').show();
							$('#alert-ajax-danger').html(result.message);
						}
					},
					error: function (xhr, ajaxOptions, thrownError) {
						$('#loader-div').hide();
						$('#alert-ajax-danger').html('Something went wrong. Please try again');
					}
				});
			}

		});
});


$(document).on('click', '.send-invitaion', function () {
	email = $(this).data('student-email');
	id = $(this).data('student-id');
	$('#invite_student_id').val(id);
	$('#invite_v_email').val(email);
    $('#studentsInvitation').modal({
        backdrop: 'static',
        keyboard: false
    });
});

$(document).on('click', '#btn-add-student', function () {
		
    $('#studentsAdd').modal({
        backdrop: 'static',
        keyboard: false
    });
});


$('#form-add-student').validate({
		errorElement: 'span', //default input error message container
		focusInvalid: false, // do not focus the last invalid input
		invalidHandler: function(form, validator) {
	      $('html,body').animate({
	       scrollTop: $("form").offset().top},
	      50);
	    },
		rules: {
				"v_email":{
					required:true,
				},
				"v_firstname":{
					required:true,
					noSpecialChars: true

				},
				"v_lastname":{
					required:true,
					noSpecialChars: true

				},
				"v_mobile":{
					number:true,
				},
			},
	    messages : {
				"v_email":{
					required:'Please enter the student email.',
				},
				"v_firstname":{
					required:'Please enter the student firstname.',
				},
				"v_lastname":{
					required:'Please enter the student lastname.',
				},
				// "v_mobile":{
				// 	required:'Please enter the student mobile no.',
				// },
	    },
		submitHandler: function (form, event) {
			url = baseURL + '/teacher-student-managment/add';
			$('#loader-div').show();
	      $.ajax({
	        url: url,
	        type: 'POST',
	        data: $('#form-add-student').serialize(),
	        success: function (result) {
			  console.log(result.status);
			  if (result.status) {
							$('#loader-div').hide();
	            			$("#customService").modal('hide');
							$('#alert-ajax-danger').hide();
							swal(result.message, {
								icon: "success",
							}).then((willProceed) => {
								window.location.reload();
							});
	          } else {
	          				$('#loader-div').hide();
	            			swal(result.message, {
								icon: "error",
							});
	          }
	        },
	        error: function (xhr, ajaxOptions, thrownError) {
	          $("#error-action-supplier").html('Something went wrong. Please try again');
	        }
	      });
	    }
  });


$('#form-invitation-student').validate({
		errorElement: 'span', //default input error message container
		focusInvalid: false, // do not focus the last invalid input
		invalidHandler: function(form, validator) {
	      $('html,body').animate({
	       scrollTop: $("form").offset().top},
	      50);
	    },
		rules: {
				'v_invitation_subject' : {
					required:true,
				},
				'v_invitation_content' : {
					required:true,
				},
			},
	    messages : {
				'v_invitation_subject' : {
					required:'Please enter the subject.',
				},
				'v_invitation_content' : {
					required:'Please enter the content',
				},
	    },
		submitHandler: function (form, event) {
			url = baseURL + '/teacher-student-managment/send-class-invitation';
			$('#loader-div').show();
	      $.ajax({
	        url: url,
	        type: 'POST',
	        data: $('#form-invitation-student').serialize(),
	        success: function (result) {
			  console.log(result.status);
			  if (result.status) {
							$('#loader-div').show();
	            			$("#customService").modal('hide');
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


function validURL() {
      var str = $('#v_email').val();

      if(str != ''){
	      var emails = str.split(',');
	    	// console.log(str);
	      var invalidEmails = [];

	      for (i = 0; i < emails.length; i++) { 
	      		// alert(emails[i]);
	          if(!validateEmail(emails[i].trim())) {
	            invalidEmails.push(emails[i].trim());
	           }
	      }
      }else{
      	$('#invalid-email').hide();
      }
}
function validateEmail(str)
{

   var pattern =  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
   var status = pattern.test(str);
   if(status == false)
   {
    $('#invalid-email').show();
    $('#invalid-email').html("please enter valid emails");
    
    $('#btn-send-register-link').prop('disabled',true);
    return false;
   }else{
   	        $('#invalid-email').html("");
    $('#btn-send-register-link').prop('disabled',false);
   }
}

jQuery.validator.addMethod("noSpecialChars", function(value, element) { 
  return /^[a-zA-Z0-9- ]*$/.test(value)
}, "Special characters are not allowed.");


$('#select_action').on('change',function(){
	var selectedAction = $(this).val();
	if (selectedAction == 'import_csv') {
		$('#importCSVModal').modal({
	        backdrop: 'static',
	        keyboard: false
	    });
	}else if(selectedAction == 'send_invitation'){
		var selectedIds = [];
        $(".selectedStudentsId").each(function () {
            if (this.value != '' && this.checked) {
                var id = this.value;
                selectedIds.push(id);
            }
        });

		if (selectedIds.length == 0) {
			swal("please select records.", {
									icon: "error",
								});

			$('#select_action').val('');
		}else{
			

			$('#invite_student_multiple_ids').val(JSON.stringify(selectedIds));
			$('#single-email-block').hide();
		    $('#studentsInvitation').modal({
		        backdrop: 'static',
		        keyboard: false
		    });
		}
	}
});


$('#studentsInvitation').on('hidden.bs.modal', function () {
    $("#form-invitation-student").validate().resetForm();
    $("#form-invitation-student")[0].reset();
    $("#form-invitation-student").find('input.error').removeClass("error");
    $('#single-email-block').show();  
    $('#invite_student_id').val('');
	$('#invite_student_multiple_ids').val('');
	$('#invite_v_email ').val('');
	$('#select_action').val('');

});

$('#file_import_csv').change(function () {
	var file = $('#file_import_csv')[0].files[0];
	console.log(file);
	var fsize = $('#file_import_csv')[0].files[0].size;
	var allowedExtensions = /(\.csv|\.CSV|\.XLSX)$/i;
	if(!allowedExtensions.exec(this.value)){
		$('#file_upload_error').text("Allowed file types : CSV and exel.");
		$("#file_import_csv").val('');
	}else{
		$('#file_upload_error').text("");
		$("#file_upload_name").text(file.name);
	}
});


$('#form-import-student').validate({
  errorElement: 'span', //default input error message container
  errorClass: 'span-error', // default input error message class
  focusInvalid: false, // do not focus the last invalid input
  rules: {
    file_import_csv: {
      required: true
    }
  },
  submitHandler: function (form) {
    $('#loader-div').show();
    form.submit(); // form validation success, call ajax form submit
  }
});


$(document).on('change','.selectallStudents',function(){
   $('.selectedStudentsId').prop('checked', this.checked);       
});

$(document).on('click', '.delete-selected-video', function () {
		
		var selectedIds = [];
        $(".selectedStudentsId").each(function () {
            if (this.value != '' && this.checked) {
                var id = this.value;
                selectedIds.push(id);
            }
        });

		if (selectedIds.length == 0) {
			swal("please select records.", {
									icon: "error",
								});
		}else{


			swal({
			  title: 'Delete Videos?',
	    	  text: 'Are you sure you want to delete selected videos?',
			  icon: "warning",
			  buttons: true,
			  dangerMode: true,
			})
			.then((willProceed) => {
				if (willProceed) {
					$('#loader-div').show();
					$.ajax({
						url: baseURL+'/teacher-video-gallery/delete-selected',
						type: 'POST',
						data: {selectedIds:selectedIds},
						success: function (result) {
							if (result.status) {
								$('#alert-ajax-danger').hide();
								swal(result.message, {
									icon: "success",
								}).then((willProceed) => {
									window.location.reload();
								});
							} else {
								$('#loader-div').hide();
								$('#alert-ajax-danger').show();
								$('#alert-ajax-danger').html(result.message);
							}
						},
						error: function (xhr, ajaxOptions, thrownError) {
							$('#loader-div').hide();
							$('#alert-ajax-danger').html('Something went wrong. Please try again');
						}
					});
				}

			});
		}
});


$('.import_export_csv').on('click',function(){
	$('#studentsAdd').modal('hide');
	$('#importCSVModal').modal({
	        backdrop: 'static',
	        keyboard: false
	    });
});


$(document).on('click','.show-note',function(){
	var teacher_has_student_id = $(this).attr('data-crm-id');
	$('#teacher_has_student_id').val(teacher_has_student_id);
	var result = getAllNotes(teacher_has_student_id);
	$('#studentsNotes').modal({
			        backdrop: 'static',
			        keyboard: false
		});
	
});

function getAllNotes(teacher_has_student_id){
	$('#loader-div').show();
	$.ajax({
	    url: baseURL + '/teacher-student-managment/get/all-note',
	    type: 'POST',
	    data: {'teacher_has_student_id':teacher_has_student_id},
	    success: function (result) {
		  console.log(result.status);
		  if (result.status) {
						$('#loader-div').hide();
						$('#all_notes').html('');
	        			$('#all_notes').html(result.html);
	        			
	      } else {
	      				$('#loader-div').hide();
	      				$('#all_notes').html('');
	        			$('#all_notes').html(result.html);
	      }
	    },
	    error: function (xhr, ajaxOptions, thrownError) {
	    	$('#loader-div').hide();
	      $("#error-action-supplier").html('Something went wrong. Please try again');
	    }
	  });
}

$('.add_note_button').on('click',function(){
	$('#add_note_div').toggle();
})

$('#form-add-student-note').validate({
		errorElement: 'span', //default input error message container
		focusInvalid: false, // do not focus the last invalid input
		invalidHandler: function(form, validator) {
	      $('html,body').animate({
	       scrollTop: $("form").offset().top},
	      50);
	    },
		rules: {
				"note":{
					required:true,
				},
			},
	    messages : {
				"note":{
					required:'Please enter the note.',
				},
	    },
		submitHandler: function (form, event) {
			url = baseURL + '/teacher-student-managment/add/note';
			$('#loader-div').show();
		      $.ajax({
		        url: url,
		        type: 'POST',
		        data: $('#form-add-student-note').serialize(),
		        success: function (result) {
				  console.log(result.status);
				  if (result.status) {
								$('#loader-div').hide();
		            			$("#customService").modal('hide');
								$('#alert-ajax-danger').hide();
								swal(result.message, {
									icon: "success",
								}).then((willProceed) => {
									$('#add_note_div').hide();
								getAllNotes($('#teacher_has_student_id').val());
								});
		          } else {
		          				$('#loader-div').hide();
		            			swal(result.message, {
									icon: "error",
								});
								getAllNotes($('#teacher_has_student_id').val());
		          }
		        },
		        error: function (xhr, ajaxOptions, thrownError) {
		          $("#error-action-supplier").html('Something went wrong. Please try again');
		        }
		      });
	    }
});




$(document).on('click','.delete_note',function(){
	var note_id = $(this).attr('data-note-id');
	var action = 'delete';
	var note = '';
	var result = applyNotesActions(note_id,action,note);
});

function applyNotesActions(note_id,action,note){
		swal({
		  title: 'Are you sure?',
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willProceed) => {
			if (willProceed) {
				$.ajax({
				    url: baseURL + '/teacher-student-managment/all-note/custom-action',
				    type: 'POST',
				    data: {'note_id':note_id,'action':action,'note':note},
				    success: function (result) {
					  console.log(result.status);
					  if (result.status) {
									$('#loader-div').hide();
				        			swal(result.message, {
										icon: "success",
									}).then((willProceed) => {
										getAllNotes($('#teacher_has_student_id').val());
									});
				        			
				      } else {
				      				$('#loader-div').hide();
				        			swal(result.message, {
										icon: "error",
									}).then((willProceed) => {
										getAllNotes($('#teacher_has_student_id').val());
									});
				      }
				    },
				    error: function (xhr, ajaxOptions, thrownError) {
				      $("#error-action-supplier").html('Something went wrong. Please try again');
				    }
				  });
			}
		});
		
}

$(document).on('click','.edit_note',function(){
	var note_id = $(this).attr('data-note-id');
    $(".note_view_mode_"+note_id).hide();
    $(".note_edit_mode_"+note_id).show();
});


$(document).on('click','.note_update_save',function(){
	var note_id = $(this).attr('data-note-id');
	var note = $("#note_"+note_id).val();
	var action = 'edit';
	var result = applyNotesActions(note_id,action,note);
})

$(document).on('click','.note_update_cancel',function(){
	var note_id = $(this).attr('data-note-id');
	$(".note_view_mode_"+note_id).show();
	$(".note_edit_mode_"+note_id).hide();
})