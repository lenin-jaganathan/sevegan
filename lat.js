   <script>
        var getLocation =  function() {
            var address = document.getElementById("location").value;
          var geocoder = new google.maps.Geocoder();
          geocoder.geocode( { 'address': address}, function(results, status) {
        
          if (status == google.maps.GeocoderStatus.OK) {
              var latitude = results[0].geometry.location.lat();
              var longitude = results[0].geometry.location.lng();
              console.log(latitude, longitude);
              alert(latitude);
              alert(longitude);
              } 
          }); 
        }
        </script>