import $ from 'jquery';

$('.feedback-form__submit').click(function (){
    $('.feedback-finish').addClass('feedback-finish--active');
    $('.layout__wrapper').addClass('layout__wrapper--filter-active')
});

$('.feedback-finish__back').click(function (){
    $('.feedback-finish').removeClass('feedback-finish--active');
    $('.layout__wrapper').removeClass('layout__wrapper--filter-active')
});

let feedback = $('.feedback-finish');

$(document).mouseup(function (e) {
    if (!feedback.is(e.target) && feedback.has(e.target).length === 0) {
        $('.feedback-finish').removeClass('feedback-finish--active');
        $('.layout__wrapper').removeClass('layout__wrapper--filter-active')
    }
});