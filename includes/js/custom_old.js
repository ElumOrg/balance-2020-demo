$(document).ready(function() {
   $("#nav-icon").click(function() {
        $(this).toggleClass("active");
        $("nav").toggleClass("active");
        $(".menu-overlay").toggleClass("active");
        $("body").toggleClass("stop");
        $("header nav ul li.sub-menu ul").removeClass("active");
        $("header nav ul li.sub-menu").removeClass("active");
    });
   $(".menu-overlay").click(function() {
        $("nav").removeClass("active")
        $(".menu-overlay").removeClass("active");
        $("#nav-icon").removeClass("active");
        $("body").removeClass("stop");
        $("header nav ul li.sub-menu ul").removeClass("active");
        $("header nav ul li.sub-menu").removeClass("active");
    });
    // $("nav ul li.sub-menu > a").click(function() {
    //     return $(this).siblings("ul").toggleClass("active");
    //     $("nav ul li.sub-menu").toggleClass("active");
    //     $(this).parent("li").siblings("li").find("ul").removeClass("active");
    //     $(this).parent("li").siblings("nav ul li.sub-menu").removeClass("active");        
    // });
    $("nav ul li.sub-menu > a").click(function() {
        $(this).siblings("ul").slideDown('400');   
    });
});