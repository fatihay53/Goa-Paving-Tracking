import React from "react";

export function JotFormConfig(){


    JotForm.newDefaultTheme = true;
    JotForm.extendsNewTheme = false;
    JotForm.newPaymentUIForNewCreatedForms = true;
    JotForm.newPaymentUI = true;
    JotForm.clearFieldOnHide="disable";
    JotForm.submitError="jumpToFirstError";
    JotForm.ownerView=true;


    JotForm.init(function(){
        /*INIT-START*/
        if (window.JotForm && JotForm.accessible) $('input_16').setAttribute('tabindex',0);

        JotForm.calendarMonths = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        JotForm.calendarDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
        JotForm.calendarOther = {"today":"Today"};
        var languageOptions = document.querySelectorAll('#langList li');
        for(var langIndex = 0; langIndex < languageOptions.length; langIndex++) {
            languageOptions[langIndex].on('click', function(e) { setTimeout(function(){
            JotForm.setCalendar("18", false, {"days":{"monday":true,"tuesday":true,"wednesday":true,"thursday":true,"friday":true,"saturday":true,"sunday":true},"future":true,"past":true,"custom":false,"ranges":false,"start":"","end":""}); }, 0); });
        }
        JotForm.onTranslationsFetch(function() {
        JotForm.setCalendar("18", false, {"days":{"monday":true,"tuesday":true,"wednesday":true,"thursday":true,"friday":true,"saturday":true,"sunday":true},"future":true,"past":true,"custom":false,"ranges":false,"start":"","end":""}); });
        JotForm.setPhoneMaskingValidator( 'input_5_full', '(###) ###-####' );
        JotForm.formatDate({date:(new Date()), dateField:$("id_"+5)});
        JotForm.displayTimeRangeDuration(4);
        JotForm.displayLocalTime("input_4_hourSelect", "input_4_minuteSelect","input_4_ampm", "input_4_timeInput", true);
        JotForm.alterTexts(undefined);
        /*setTimeout(function() {
          $('input_6').hint('ex: email@yahoo.com');
        }, 20);*/

        JotForm.alterTexts({"ageVerificationError":"You must be older than {minAge} years old to submit this form.","alphabetic":"This field can only contain letters","alphanumeric":"This field can only contain letters and numbers.","appointmentSelected":"You’ve selected {time} on {date}","ccDonationMinLimitError":"Minimum amount is {minAmount} {currency}","ccInvalidCVC":"CVC number is invalid.","ccInvalidExpireDate":"Expire date is invalid.","ccInvalidNumber":"Credit Card Number is invalid.","ccMissingDetails":"Please fill up the credit card details.","ccMissingDonation":"Please enter numeric values for donation amount.","ccMissingProduct":"Please select at least one product.","characterLimitError":"Too many Characters.  The limit is","characterMinLimitError":"Too few characters. The minimum is","confirmClearForm":"Are you sure you want to clear the form","confirmEmail":"E-mail does not match","currency":"This field can only contain currency values.","cyrillic":"This field can only contain cyrillic characters","dateInvalid":"This date is not valid. The date format is {format}","dateInvalidSeparate":"This date is not valid. Enter a valid {element}.","dateLimited":"This date is unavailable.","disallowDecimals":"Please enter a whole number.","dragAndDropFilesHere_infoMessage":"Drag and drop files here","email":"Enter a valid e-mail address","fillMask":"Field value must fill mask.","freeEmailError":"Free email accounts are not allowed","generalError":"There are errors on the form. Please fix them before continuing.","generalPageError":"There are errors on this page. Please fix them before continuing.","gradingScoreError":"Score total should only be less than or equal to","incompleteFields":"There are incomplete required fields. Please complete them.","inputCarretErrorA":"Input should not be less than the minimum value:","inputCarretErrorB":"Input should not be greater than the maximum value:","justSoldOut":"Just Sold Out","lessThan":"Your score should be less than or equal to","maxDigitsError":"The maximum digits allowed is","maxFileSize_infoMessage":"Max. file size","maxSelectionsError":"The maximum number of selections allowed is ","minSelectionsError":"The minimum required number of selections is ","multipleFileUploads_emptyError":"{file} is empty, please select files again without it.","multipleFileUploads_fileLimitError":"Only {fileLimit} file uploads allowed.","multipleFileUploads_minSizeError":"{file} is too small, minimum file size is {minSizeLimit}.","multipleFileUploads_onLeave":"The files are being uploaded, if you leave now the upload will be cancelled.","multipleFileUploads_sizeError":"{file} is too large, maximum file size is {sizeLimit}.","multipleFileUploads_typeError":"{file} has invalid extension. Only {extensions} are allowed.","multipleFileUploads_uploadFailed":"File upload failed, please remove it and upload the file again.","noSlotsAvailable":"No slots available","notEnoughStock":"Not enough stock for the current selection","notEnoughStock_remainedItems":"Not enough stock for the current selection ({count} items left)","noUploadExtensions":"File has no extension file type (e.g. .txt, .png, .jpeg)","numeric":"This field can only contain numeric values","pastDatesDisallowed":"Date must not be in the past.","pleaseWait":"Please wait...","required":"This field is required.","requireEveryCell":"Every cell is required.","requireEveryRow":"Every row is required.","requireOne":"At least one field required.","restrictedDomain":"This domain is not allowed","selectionSoldOut":"Selection Sold Out","slotUnavailable":"{time} on {date} has been taken. Please select another slot.","soldOut":"Sold Out","subProductItemsLeft":"({count} items left)","uploadExtensions":"You can only upload following files:","uploadFilesize":"File size cannot be bigger than:","uploadFilesizemin":"File size cannot be smaller than:","url":"This field can only contain a valid URL","validateEmail":"You need to validate this e-mail","wordLimitError":"Too many words. The limit is","wordMinLimitError":"Too few words.  The minimum is"});
        /*INIT-END*/
    });

    JotForm.prepareCalculationsOnTheFly([null,{"name":"heading","qid":"1","text":"Form","type":"control_head"},{"name":"submit2","qid":"2","text":"Submit","type":"control_button"},null,{"description":"","name":"address","qid":"4","text":"Address","type":"control_address"},{"description":"","name":"signature","qid":"5","subLabel":"","text":"Signature","type":"control_signature"}]);
    setTimeout(function() {
        JotForm.paymentExtrasOnTheFly([null,{"name":"heading","qid":"1","text":"Form","type":"control_head"},{"name":"submit2","qid":"2","text":"Submit","type":"control_button"},null,{"description":"","name":"address","qid":"4","text":"Address","type":"control_address"},{"description":"","name":"signature","qid":"5","subLabel":"","text":"Signature","type":"control_signature"}]);}, 20);

}

