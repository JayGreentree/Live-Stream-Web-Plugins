function getWeather() {
        $("#weather").html("");
        loc = arr.places[i].woeid;
        unit = arr.places[i].u;
        tZone =arr.places[i].tz;

    $.simpleWeather({
        location: '',
        woeid: loc,
        unit: unit,
        success: function(weather) {
          var icon = '<i class="icon-'+weather.code+'"></i>';
          var temp = weather.temp+'&deg;'+weather.units.temp;
          var city = weather.city+', '+weather.region;
          var dispTime    = moment.tz(moment(), tZone);
      
          $("#weatherIcon").html(icon);
          $("#temp").html(temp);
          $("#city").html(city);
          $("#time").html(dispTime.format('h:ma z'));
          //console.log(weather.city + " - " + dispTime.format('h:ma z'));
        },
        error: function(error) {
          $("#weather").html('<p>'+error+'</p>');
        }
      });
      
      i=i+1;
      if(i>2){
          i = 0;
      }
  }

  var i = 0;
var cities = '{"places" : [{"woeid":"12778311", "u":"c", "tz":"united-states/indiana/vincennesVincennes"}
  var arr = JSON.parse(cities);

$(document).ready(function() { 
    getWeather(); //Get the initial weather.
    setInterval(getWeather, 15000); //Update the weather every 10 minutes.  
  });