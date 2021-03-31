// var placeSearch, autocomplete;
      var componentForm = {
        locality:'long_name', //city
        administrative_area_level_1: 'long_name',   //state
        country: 'long_name',   //country
        postal_code:'long_name',        //zipcode
      };

//       function initAutocomplete() {
//         // Create the autocomplete object, restricting the search to geographical
//         // location types.
//         autocomplete = new google.maps.places.Autocomplete(
//             /** @type {!HTMLInputElement} */(document.getElementById('v_address')),
//             {types: ['geocode']});

//         // When the user selects an address from the dropdown, populate the address
//         // fields in the form.
//         autocomplete.addListener('place_changed', fillInAddress);
//       }

//       function fillInAddress() {
//         // Get the place details from the autocomplete object.
//         var place = autocomplete.getPlace();
//         var premise = '';
//         var streetAddress = '';

        

//         // Get each component of the address from the place details
//         // and fill the corresponding field on the form.
//         console.log(place.address_components)
//         for (var i = 0; i < place.address_components.length; i++) {
//           var addressType = place.address_components[i].types[0];
//           if (componentForm[addressType]) {
//             var val = place.address_components[i][componentForm[addressType]];
//             document.getElementById(addressType).value = val;
//           }

//           if (place.address_components[i].types[0] == 'premise') {
//             premise += place.address_components[i]['long_name']+' ';
//           }else if(place.address_components[i].types[0] == 'route'){
//             premise += place.address_components[i]['long_name']+' ';
//           }


//           if (place.address_components[i].types[0] == 'street_number') {
//             streetAddress += place.address_components[i]['long_name']+' ';
//           }

//           if (place.address_components[i].types[0] == 'neighborhood') {
//             streetAddress += place.address_components[i]['long_name']+' ';
//           }

//           if (place.address_components[i].types[0] == 'sublocality_level_1') {
//             streetAddress += place.address_components[i]['long_name']+' ';
//           }
          
//           if (place.address_components[i].types[0] == 'sublocality_level_2') {
//             streetAddress += place.address_components[i]['long_name']+' ';
//           }

//           if (place.address_components[i].types[0] == 'sublocality_level_3') {
//             streetAddress += place.address_components[i]['long_name']+' ';
//           }

//           if (place.address_components[i].types[0] == 'administrative_area_level_2') {
//             streetAddress += place.address_components[i]['long_name']+' ';
//           }

//           if (place.address_components[i].types[0] == 'administrative_area_level_2') {
//             streetAddress += place.address_components[i]['long_name']+' ';
//           }





//           if (place.address_components[i].types[0] == 'route') {
//             streetAddress += place.address_components[i]['long_name']+' ';;
//           }

//         }
//         $('.v_location').val(premise);
//         $('#v_address').val(streetAddress);
//         // alert(streetAddress);
//       }

//       // Bias the autocomplete object to the user's geographical location,
//       // as supplied by the browser's 'navigator.geolocation' object.
//       function geolocate() {
//         if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(function(position) {
//             var geolocation = {
//               lat: position.coords.latitude,
//               lng: position.coords.longitude
//             };
//             var circle = new google.maps.Circle({
//               center: geolocation,
//               radius: position.coords.accuracy
//             });
//             autocomplete.setBounds(circle.getBounds());
//           });
//         }
//       }

$(document).ready(function() {
  initializeSignUpAddress();
});

function initializeSignUpAddress() {
$('form').on('keyup keypress', function(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            e.preventDefault();
            return false;
        }
    });

const locationInputs = document.getElementsByClassName('v_address');
    // alert(locationInputs);
    const autocompletes = [];
    const geocoder = new google.maps.Geocoder;
    for (let i = 0; i < locationInputs.length; i++) {

        const input = locationInputs[i];
        const fieldKey = input.id.replace("-input", "");
      

        const autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.key = fieldKey;
        autocompletes.push({input: input, autocomplete: autocomplete});
    }

    for (let i = 0; i < autocompletes.length; i++) {
        const input = autocompletes[i].input;
        const autocomplete = autocompletes[i].autocomplete;
        const map = autocompletes[i].map;
        const marker = autocompletes[i].marker;

        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            const place = autocomplete.getPlace();
            console.log(place);
            var premise = '';
            var streetAddress = '';
            
            if (place.name != '') {
              premise += place.name+' ';
            }

            for (var i = 0; i < place.address_components.length; i++) {
              var addressType = place.address_components[i].types[0];
              if (componentForm[addressType]) {
                var val = place.address_components[i][componentForm[addressType]];
                document.getElementById(addressType).value = val;
              }

              
              if (place.address_components[i].types[0] == 'premise') {
                premise += place.address_components[i]['long_name']+' ';
              }else if(place.address_components[i].types[0] == 'route'){
                premise += place.address_components[i]['long_name']+' ';
              }


              if (place.address_components[i].types[0] == 'street_number') {
                streetAddress += place.address_components[i]['long_name']+' ';
              }

              if (place.address_components[i].types[0] == 'neighborhood') {
                streetAddress += place.address_components[i]['long_name']+' ';
              }

              if (place.address_components[i].types[0] == 'sublocality_level_1') {
                streetAddress += place.address_components[i]['long_name']+' ';
              }
              
              if (place.address_components[i].types[0] == 'sublocality_level_2') {
                streetAddress += place.address_components[i]['long_name']+' ';
              }

              if (place.address_components[i].types[0] == 'sublocality_level_3') {
                streetAddress += place.address_components[i]['long_name']+' ';
              }

              if (place.address_components[i].types[0] == 'administrative_area_level_2') {
                streetAddress += place.address_components[i]['long_name']+' ';
              }

              if (place.address_components[i].types[0] == 'administrative_area_level_3') {
                streetAddress += place.address_components[i]['long_name']+' ';
              }





              if (place.address_components[i].types[0] == 'route') {
                streetAddress += place.address_components[i]['long_name']+' ';;
              }

            }
            $('.v_location').val(premise);
            $('#v_address').val(streetAddress);

            if (!place.geometry) {
                window.alert("No details available for input: '" + place.name + "'");
                input.value = "";
                return;
            }

            

        });
    }
  }