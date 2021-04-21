<?php

function pr($data){
    echo '<pre>';
    print_r($data);
}

/* function getAddress($latitude,$longitude){
    if(!empty($latitude) && !empty($longitude)){
        //Send request and receive json data by address
        $geocodeFromLatLong = file_get_contents('https://maps.googleapis.com/maps/api/geocode/json?latlng='.trim($latitude).','.trim($longitude).'&sensor=false');
        $output = json_decode($geocodeFromLatLong);
        $status = $output->status;
        //Get address from json data
        $address = ($status=="OK")?$output->results[1]->formatted_address:'';
        //Return address of the given latitude and longitude
        if(!empty($address)){
            return $address;
        }else{
            return false;
        }
    }else{
        return false;
    }
} */

function round_to_half($num) {
    if($num >= ($half = ($ceil = ceil($num))- 0.5) + 0.10) {
        /* echo 'first if';
        echo $ceil;
        exit; */
        return $ceil;
    } else if($num < $half - 0.50) {
        /* echo 'second if';
        echo floor($num);
        exit; */
        return floor($num);
    } else {
        /* echo $half;
        exit; */
        return $half;
    }
}

$SITE_URL = env('SITE_URL');
$SERVER_SITE_URL = env('SERVER_SITE_URL');
//$SITE_URL = url('').'/';

define('CONTACT_EMAIL_ID', 'eluminous.se47@gmail.com');
define('LABEL_SITE_NAME', 'Balance App');
define('SITE_NAME', 'Balance');
define('SITE_URL', $SITE_URL);
define('SERVER_SITE_URL', $SERVER_SITE_URL);
define('ASSET_URL', SITE_URL.'assets/');
define('WWW_ROOT', $_SERVER['DOCUMENT_ROOT'].'/app/');
define('ADMIN_PREFIX','admin');
define('API_PREFIX','api');
define('ADMIN_URL', SITE_URL.'admin/');

define('REC_PER_PAGE', '10');
define('ERR_PWS', 'Invalid Email or Password.');
define('ERR_USERNAME_PWS', 'Invalid Username or Password.');
define('INVALID_EMAIL', 'Invalid email address.');
define('PWD_SENT', 'Password has been successfully sent.');
define('PASSWORD_SUCCESS', 'Password has been set successfully');
define('PROFILE_SUCCESS', 'Your personal information is successfully updated!');
define('INVALID_USERNAME_OR_PASSWORD', 'Email Id and Password do not match. Please try again!');
define('DEFAULT_IMG_SERVER', SITE_URL . 'get');

define('FILES_PATH', 'files/');
define('USER_FILES_PATH', FILES_PATH.'users/');
define('ADMIN_FILES_PATH', FILES_PATH.'admin/');
define('USER_PROFILE_IMAGE_PATH', FILES_PATH.'profile/');
define('USER_PROFILE_THUMB_IMAGE_PATH', FILES_PATH.'profile/thumb/');
define('USER_PROFILE_COVER', FILES_PATH.'profile/cover/');
define('USER_PROFILE_COVER_THUMB', FILES_PATH.'profile/cover/thumb/');

define('SERVICE_TYPES_IMG_PATH', FILES_PATH.'services/service-types/');
define('SERVICE_ICONS_IMG_PATH', FILES_PATH.'services/service-icons/');
define('SERVICE_ICONS_COLORCHANGE_IMG_PATH',FILES_PATH.'services/service-icons/color-change-icons/');

define('PRODUCTS_IMG_PATH', FILES_PATH.'products/');
define('PRODUCTS_IMG_ORIGINAL_PATH', FILES_PATH.'products/original/');

define('GIFT_CARDS_IMG_PATH', FILES_PATH.'giftcards/');
define('GIFT_CARDS_ORIGINAL_IMG_PATH', FILES_PATH.'giftcards/original/');

define('PACKAGE_IMG_PATH', FILES_PATH.'packages/');
define('BOOKING_BG_IMG_PATH', FILES_PATH.'booking_backgrounds/');

define('GALLERY_IMG_PATH',FILES_PATH.'gallery/');
define('GALLERY_THUMB_IMG_PATH',GALLERY_IMG_PATH.'thumb/');
define('GALLERY_IMG_PER_PAGE', 30);

define('TEMP_IMG_PATH', FILES_PATH.'temp/');

define('ACTIVE_STATUS', 'Active');
define('INACTIVE_STATUS', 'Inactive');

define('VERIFICATION_PENDING_STATUS', 'Document Pending');
define('VERIFIED_STATUS', 'Verified');
define('NOT_VERIFIED_STATUS', 'Document Uploaded');
define('REJECTED_VERIFIED_STATUS', 'Rejected');

define('EXCEL_FORMAT','xlsx');

define('JS_VERSION', '?ver=v.0.0.1');
define('CSS_VERSION', '?ver=v.0.0.1');
define('HTML_VERSION', '?ver=v.0.0.1');
define('ADMIN_JS_VERSION', '?ver=v.0.0.1');
define('ADMIN_CSS_VERSION', '?ver=v.0.0.3');

//--- For notification and message type constatns ---//
define('MESSAGE_TEMPLATE_TYPE', 'Message');
define('NOTIFICATION_TEMPLATE_TYPE', 'Notification');

/*API Constant*/
//**Api All HTTP Response Code
define('HTTP_UNAUTHORIZED', 401);
define('HTTP_SUCCESS', 200);
define('HTTP_INTERNAL_SERVER_ERROR', 500);
define('HTTP_NO_DATA_FOUND', 404);
define('SUCCESS', 100);
define('UNSUCCESS', 101);
define('USER_NOT_VERIFIED_CODE', 102);
define('USER_VERIFICATION_PENDING_BY_ADMIN', 103);

define('UNAUTHORIZED_MSG', 'Unauthorized');
define('MSG_INVALID_EMAILID', 'Please enter valid Username / Email.'); //invalid
define('MSG_INVALID_PASSWORD', 'Please enter valid password.');
define('MSG_INVALID_MOBILE','Please enter valid mobile number.');
define('MSG_INVALID_VARIFICATION_CODE', 'Please enter valid code.');
define('MSG_USER_INACTIVE', 'Your account has been inactiveted by admin.');
define('MSG_INVALID_OTP','Invalid Verification Code.');
define('MSG_SENDEMAIL_ERROR','Error for sending email.');
define('MSG_REFERCODE_INVALID','Refer code does not exist.');

//inactive
define('SUCCESS_MSG', 'Success');
define('UNSUCCESS_MSG', 'Unsuccess');
define('MSG_REQUIRED_FIEDS','All fields are mandatory.');

define('RECORD_NOT_FOUND','Records not found.');
define('CAPTCHA_IMG_PATH',FILES_PATH.'captcha/');
define('CAPTCHA_IMG_WIDTH',120);
define('CAPTCHA_IMG_HEIGTH',40);
define('CAPTCHA_IMG_CHARACTERS',6);
define('MSG_CAPTCHA_INVALID','Captcha not match.');
define('MSG_REGISTER_SUCCESS','You have successfully registered with Balance.');
define('MSG_CONTACT_SUCCESS','Message sent successfully.');
define('VERIFICATION_DOC_PATH',FILES_PATH.'verification_doc/');
define('CERTIFICATE_DOC_PATH',FILES_PATH.'certificate_doc/');
define('INSURANCE_DOC_PATH',FILES_PATH.'insurance_doc/');
define('VIDEO_UPLOAD__PATH',FILES_PATH.'into_video_upload/');

define('LIST_AJAX_PER_PAGE', 10);
define('CREDITED', 'Credited');
define('DEBITED', 'Debited');
define('PENDING_STATUS', 'Pending');
define('APPROVED_STATUS', 'Approved');
define('COMPLETED_STATUS', 'Completed');
define('CANCELLED_STATUS', 'Cancelled');
define('REJECTED_STATUS', 'Rejected');
define('EXPIRED_STATUS', 'Expired');

define('TRIAL_PLAN', 'Trial');
define('MONTHLY_PLAN', 'Monthly');
define('YEARLY_PLAN', 'Yearly');
define('FOREVER_PLAN', 'Forever');

define('DELAY_SECONDS_SEND_EMAIL', 20);

define('API_VERSION_ONE', '');
define('API_VERSION_TWO', 'v2');
define('API_VERSION_THREE', 'v3');
define('API_VERSION_FOUR', 'v4');

define('COUNTRY_CODE', '+1');

define('HUBSPOT_API_KEY', env('HUBSPOT_API_KEY'));
define('SERVER_TIMEZONE', 'America/Phoenix');
define('FREE_TRIAL_SUBSCRIPTION_ID', '4');
define('FREE_7_DAYS_TRIAL_SUBSCRIPTION_ID', '8');

define('ACTIVATE_FREE_TRIAL_APPLICABLE_DATE', '2020-07-20 00:00:00');
define('STRIPE_CLIENT_ID', 'ca_Hjeu0t3ekwYvAAwEFETC9I4FMuq3d657');

define('TEACHER_PUBLIC_URL_SHORT_PREFIX', 't');
define('TEACHER_SCHEDULE_URL_SHORT_PREFIX', 's');
define('TEACHER_REVIEW_URL_SHORT_PREFIX', 'g');

define('TEACHER_VIDEO_GALLERY_UPLOAD__PATH',FILES_PATH.'teacher_video_gallery/');

define('CHAMBER_GROUP_ID',211);


define('MAX_LASTNAME_CHAR_LENGHT',20);
define('MAX_FIRSTNAME_CHAR_LENGHT',20);
define('MAX_MOBILE_CHAR_LENGHT',10);
define('MAX_DESCRIPTION_CHAR_LENGHT',500);
define('MAX_TITLE_CHAR_LENGHT',75);

// Instructor subscriptions flags
define('INSUB_FLAG_ONLINE_CLASS','Online_Class');
define('INSUB_FLAG_INPERSON_CLASS','In_Person');
define('INSUB_FLAG_PRERECORD_CLASS','Pre_Recorded');
define('INSUB_FLAG_SERIES_CLASS','Series');
define('INSUB_FLAG_WORKSHOP','Workshop');
define('INSUB_FLAG_PRIVATE_SESSION','Private_Session');
define('INSUB_FLAG_VIDEO_CONF','Video_Conferencing');
define('INSUB_FLAG_VOD','VOD');
define('INSUB_FLAG_CRM','CRM');
define('INSUB_FLAG_PACKAGE','Own_Packages');
define('INSUB_FLAG_FACILATED_WORK','Facilitated_Work');
define('INSUB_FLAG_PROMOTIONS','My_Promotion');


define('FREE_TRIAL_INSUB_ID',1);
define('VOD_INDIVIDUAL_INSUB_ID',2);

define('FAQ_GENERAL',1);
define('FAQ_INSTRUCTOR',2);
define('FAQ_MEMBER',3);
define('FAQ_INSTRUCTOR_PRICING',4);
define('FAQ_MEMBER_HELPCENTER',5);
define('FAQ_INSTRUCTOR_HELPCENTER',6);
define('FAQ_INSTRUCTOR_LANDING',6);

// define('ZOOM_OAUTH_CLIENT_ID','c6QDEpJbTXWs3n1T6HHYw');
// define('ZOOM_OAUTH_CLIENT_SECRET','KCKnmH3JAgixhpBozgJRg1U4zK7H5sMZ');
// define('ZOOM_REDIRECT_URL','http://dev.eluminousdev.com/balance-2020/zoom-test/redirect');

define('ZOOM_OAUTH_CLIENT_ID','Dp4EhOsT06OIrLXjdASHQ');
define('ZOOM_OAUTH_CLIENT_SECRET','QMdYgyi1UpDwKk0GkrQ6MZwXRn7583xE');
define('ZOOM_REDIRECT_URL','http://dev.eluminousdev.com/balance-2020/zoom-test/redirect');

define('WAIVERPOLICY_DOC_PATH',FILES_PATH.'waiver_policy/');