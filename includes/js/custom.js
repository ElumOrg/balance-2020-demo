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