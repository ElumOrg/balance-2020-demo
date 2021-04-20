$(document).ready(function (){
     // Testimonial Slider
    $('#testimonial_slider').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        autoHeight:true,
        responsiveClass: true,
        autoplay: true,
        autoplayTimeout: 5000,
        responsive: {
            0: {
                items: 1
            }
        }
    });
});
// Toggle Change
function myFunction(x) {
  x.classList.toggle("change");
  return false;
}
// Toggle Responsive Menu Click Event Js
  $('.toggle').click(function () {
    $('nav').toggleClass('active');
    $('.menu_overlay').toggleClass('active');
    $('body').toggleClass('active');
    return false;
  });
  $('.menu_overlay').click(function () {
    $('nav').removeClass('active');
    $('.menu_overlay').removeClass('active');
    $('.toggle').removeClass('change');
    $('body').removeClass('active');
    $('li.sub_menu').removeClass('active');
  });