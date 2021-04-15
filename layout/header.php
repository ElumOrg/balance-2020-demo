<!doctype html>
<html lang="en">
   <head>
      <link rel="icon" href="includes/images/favicon.ico">
      <link href="includes/images/favicon.ico"/>
      <!-- Bootstrap CSS -->
      <link rel="stylesheet" href="includes/css/bootstrap.min.css">
      <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"> -->
      <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css">
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
            <nav>
               <ul>
                  <li class="<?php if ($first_part=="" || $first_part=="index.php") {echo "active"; }?>"><a href="index.php">Home</a></li>
                  <li class="<?php if ($first_part=="classes.php") {echo "active"; }?>"><a href="classes.php">Classes</a></li>
                  <li class="<?php if ($first_part=="video-on-demand.php") {echo "active"; }?>"><a href="video-on-demand.php">Video on Demand</a></li>
                  <li class="<?php if ($first_part=="private-session.php") {echo "active"; }?>"><a href="private-session.php">Private Sessions</a></li>
                  <li class="<?php if ($first_part=="pricing.php") {echo "active"; }?>"><a href="pricing.php">Pricing</a></li>
                  <li><a href="#">Promotions</a></li>
                  <li><a href="#">More</a></li>
               </ul>
            </nav>
         </div>
      </header>
      <!-- Navigation End -->