<!doctype html>
<html lang="en">
   <head>
      <link rel="icon" href="includes/images/favicon.ico">
      <link href="includes/images/favicon.ico"/>
      <!-- Bootstrap CSS -->
      <link rel="stylesheet" href="includes/css/bootstrap.min.css">
      <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"> -->
      <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css">
      <link rel="stylesheet" href="includes/css/fonts.css">
       <link rel="stylesheet" href="assets/owlcarousel/owl.carousel.min.css">
      <link rel="stylesheet" href="includes/css/style.css">
      <link rel="stylesheet" href="includes/css/mediaquery.css">

   </head>
      
      <?php  
         $directoryURI = $_SERVER['REQUEST_URI'];
         $path = parse_url($directoryURI, PHP_URL_PATH);
         $components = explode('/', $path);
         $first_part = '';
         if (isset($components)) {
            $first_part = $components[2];
         }
      ?>
    <body>
       <!-- Navigation Start -->
      <header>
         <div class="container">
            <div class="logo">
               <a href="index.php">
                  <img src="includes/images/generic-yoga-logo.webp" alt="Logo" />
               </a>
            </div>
            <div class="d-lg-none d-flex align-items-end flex-column w-100">
               
               <div class="toggle" onclick="myFunction(this)">
                  <!-- <span>Menu</span> -->
                  <div class="bar1"></div>
                  <div class="bar2"></div>
                  <div class="bar3"></div>
               </div>
            </div>
            <nav>
              <div class="right_menu">
               <ul class="menu">
                  <li class="<?php if ($first_part=="" || $first_part=="index.php") {echo "active"; }?>"><a href="index.php">Home</a></li>
                  <li class="<?php if ($first_part=="classes.php") {echo "active"; }?>"><a href="classes.php">Classes</a></li>
                  <li class="<?php if ($first_part=="video-on-demand.php") {echo "active"; }?>"><a href="video-on-demand.php">Video on Demand</a></li>
                  <li class="<?php if ($first_part=="private-session.php") {echo "active"; }?>"><a href="private-session.php">Private Sessions</a></li>
                  <li class="<?php if ($first_part=="pricing.php") {echo "active"; }?>"><a href="pricing.php">Pricing</a></li>
                  <li class="<?php if ($first_part=="promotions.php") {echo "active"; }?>"><a href="promotions.php">Promotions</a></li>
                 <!--  <li class="sub_menu"><a href="#">More</a>
                  <ul>
                                <li><a href="#" class="">About Me</a></li>
                                <li><a href="#" class="">Contact</a></li>
                            </ul>
                          </li> -->
               </ul>
             </div>
            </nav>
         </div>
      </header>
      <!-- Navigation End -->