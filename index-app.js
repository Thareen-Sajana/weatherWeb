
let searchBytton = document.getElementById("search-btn");

function getLastFourDays(currentDate) {
    const dates = [];
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month with zero-padding
    const day = String(currentDate.getDate()).padStart(2, '0'); // Day with zero-padding
  
    for (let i = 0; i < 4; i++) {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() - i); // Subtract i days from current date
  
      const formattedDate = `${year}-${month}-${newDate.getDate().toString().padStart(2, '0')}`; // Format the date
  
      dates.push(formattedDate); // Add formatted date to array
    }
    return dates;
}

function getNextFourDays(currentDate) {
    const offsetDate = new Date(currentDate); // Create a copy of current date
    offsetDate.setDate(currentDate.getDate() + 15); // Add 14 days to current date
  
    const dates = [];
    const year = offsetDate.getFullYear();
    const month = String(offsetDate.getMonth() + 1).padStart(2, '0'); // Month with zero-padding
    const day = String(offsetDate.getDate()).padStart(2, '0'); // Day with zero-padding
  
    for (let i = 0; i < 4; i++) {
      const newDate = new Date(offsetDate);
      newDate.setDate(offsetDate.getDate() + i); // Add i days to offsetDate
  
      const formattedDate = `${year}-${month}-${newDate.getDate().toString().padStart(2, '0')}`; // Format the date
  
      dates.push(formattedDate); // Add formatted date to array
    }
    return dates;
  }


function getWeekdayName(dateString) {
    // Create a Date object from the input string
    const date = new Date(dateString);
  
    // Get the day of the week (0-6, where 0 is Sunday)
    const day = date.getDay();
  
    // Array of weekday names (adjust for your desired format)
    const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  
    // Return the weekday name using the index
    return weekdays[day];
  }

searchBytton.addEventListener("click", function() {
    const cityTag = document.getElementById("city-name");
    const cityName = String(cityTag.value.charAt(0)).toUpperCase() + cityTag.value.slice(1);
    
   

    const city = cityName;
    const key = "ca5332137224490fa1d103656242503"

    const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=no`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
   
            document.querySelector(".temp-value").innerHTML = data.current.temp_c + "°C";
            document.querySelector(".tempreture").innerHTML = data.current.temp_c + "°C";     
              
            
            document.querySelector(".region-name").innerHTML = data.location.region;
            document.querySelector(".lacation").innerHTML = "Location : "+ data.location.tz_id;
            document.querySelector(".humidity-value").innerHTML = "Humidity : "+ data.current.humidity;
            document.querySelector(".humidity").innerHTML = data.current.humidity;
            document.querySelector(".wind_mph").innerHTML = "Wind Speed : "+ data.current.wind_kph +" kph";
            document.querySelector(".wind").innerHTML = data.current.wind_kph +" kph";
            document.querySelector(".condition").innerHTML = "Condition : "+ data.current.condition.text;
            
            document.querySelector(".region").innerHTML = "Region : "+ data.location.region;
            document.querySelector(".country").innerHTML = "Country : "+ data.location.country;
            document.querySelector(".lon").innerHTML = "Longitude : "+ data.location.lon;
            document.querySelector(".lat").innerHTML = "Latitude : "+ data.location.lat;

            
            if(data.current.condition.text.includes("rain")){
                document.querySelector(".main-img").src = "img/rain.png"
                document.querySelector(".front-img").src = "img/rain.png"
            }

            if(data.current.condition.text.includes("Clear")){
                document.querySelector(".main-img").src = "img/clear.png"
                document.querySelector(".front-img").src = "img/clear.png"
            }

            if(data.current.condition.text.includes("cloudy")){
                document.querySelector(".main-img").src = "img/clouds.png"
                document.querySelector(".front-img").src = "img/clouds.png"
            }


            if(data.current.condition.text.includes("drizzle")){
                document.querySelector(".main-img").src = "img/drizzle.png"
                document.querySelector(".front-img").src = "img/drizzle.png"
            }

            if(data.current.condition.text.includes("mist")){
                document.querySelector(".main-img").src = "img/mist.png"
                document.querySelector(".front-img").src = "img/mist.png"
            }

            if(data.current.condition.text.includes("snow")){
                document.querySelector(".main-img").src = "img/snow.png"
                document.querySelector(".front-img").src = "img/snow.png"
            }

            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const today = new Date();
            
           
            const weekday = days[today.getDay()];
            const month = months[today.getMonth()];
            const year = today.getFullYear();

            document.querySelector(".bottom-date").innerHTML = `${weekday}, ${today.getDate()} ${month} ${year}`;
            document.querySelector(".top-date").innerHTML = `${month} ${year}`;
            document.querySelector(".title-sty").innerHTML = `Today ${today.getDate()} ${month} ${year}`;


    })

    const todayLast4Days = new Date();
    const lastFourDays = getLastFourDays(todayLast4Days);
    console.log(lastFourDays)
    let lastImgClassName = 1;

    lastFourDays.forEach(function(lastDays){
        console.log(lastDays)
        const urlLast4Days = `https://api.weatherapi.com/v1/history.json?key=${key}&q=${city}&dt=${lastDays}`;

        fetch(urlLast4Days)
        .then(res=>res.json())
        .then(data=>{

            if(data.forecast.forecastday[0].day.condition.text.includes("rain")){
                document.querySelector(`.last4Days${lastImgClassName}`).src = "img/rain.png"
            }

            if(data.forecast.forecastday[0].day.condition.text.includes("Clear") || data.forecast.forecastday[0].day.condition.text.includes("Sunny")){
                document.querySelector(".last4Days"+lastImgClassName).src = "img/clear.png" 
            }

            if(data.forecast.forecastday[0].day.condition.text.includes("cloudy")){
                document.querySelector(".last4Days"+lastImgClassName).src = "img/clouds.png"
            }


            if(data.forecast.forecastday[0].day.condition.text.includes("drizzle")){
                document.querySelector(".last4Days"+lastImgClassName).src = "img/drizzle.png"  
            }

            if(data.forecast.forecastday[0].day.condition.text.includes("mist")){
                document.querySelector(".last4Days"+lastImgClassName).src = "img/mist.png"
            }

            if(data.forecast.forecastday[0].day.condition.text.includes("snow")){
                document.querySelector(".last4Days"+lastImgClassName).src = "img/snow.png"  
            }


            document.querySelector(`.lsat-temp-${lastImgClassName}`).innerHTML = data.forecast.forecastday[0].day.avgtemp_c +"°";

            document.querySelector(`.lastDay${lastImgClassName}`).innerHTML = getWeekdayName(lastDays);
            lastImgClassName++;

        })

        
    })
    

    let todayNext4Days = new Date();
    const next4Days = getNextFourDays(todayNext4Days);

    let nextImgClassName = 1;
    next4Days.forEach(function(nextDays){

        

        const urlNextDays = `https://api.weatherapi.com/v1/future.json?key=${key}&q=${city}&dt=${nextDays}`;
        fetch(urlNextDays)
        .then(res => res.json())
        .then(data => {
        


            if(data.forecast.forecastday[0].day.condition.text.includes("rain")){
                document.querySelector(`.next4Days${nextImgClassName}`).src = "img/rain.png"
            }

            if(data.forecast.forecastday[0].day.condition.text.includes("Clear") || data.forecast.forecastday[0].day.condition.text.includes("Sunny")){
                document.querySelector(".next4Days"+nextImgClassName).src = "img/clear.png" 
            }

            if(data.forecast.forecastday[0].day.condition.text.includes("cloudy")){
                document.querySelector(".next4Days"+nextImgClassName).src = "img/clouds.png"
            }


            if(data.forecast.forecastday[0].day.condition.text.includes("drizzle")){
                document.querySelector(".next4Days"+nextImgClassName).src = "img/drizzle.png"  
            }

            if(data.forecast.forecastday[0].day.condition.text.includes("mist")){
                document.querySelector(".next4Days"+nextImgClassName).src = "img/mist.png"
            }

            if(data.forecast.forecastday[0].day.condition.text.includes("snow")){
                document.querySelector(".next4Days"+nextImgClassName).src = "img/snow.png"  
            }

            document.querySelector(`.next-temp-${nextImgClassName}`).innerHTML = data.forecast.forecastday[0].day.avgtemp_c +"°";

            document.querySelector(`.nextDay${nextImgClassName}`).innerHTML = getWeekdayName(nextDays);

            nextImgClassName++;
        })
    })
});



let todayButton = document.getElementById("today-btn");
let day4Button = document.getElementById("day4-btn");
let day7Button = document.getElementById("day7-btn");

let weatherDisplayDay4 = document.getElementById("day-4-container");
let weatherDisplayDay7 = document.getElementById("day-7-container");
let weatherDisplayToday = document.getElementById("today-container");

day4Button.addEventListener("click", function() {
    weatherDisplayDay7.classList.add("day-display-none");
    weatherDisplayDay4.classList.remove("day-display-none");
    weatherDisplayToday.classList.add("day-display-none");

    day4Button.classList.add("btn-active");
    day7Button.classList.remove("btn-active");
    todayButton.classList.remove("btn-active");
});

day7Button.addEventListener("click", function() {
    weatherDisplayDay7.classList.remove("day-display-none");
    weatherDisplayDay4.classList.add("day-display-none");
    weatherDisplayToday.classList.add("day-display-none");

    day7Button.classList.add("btn-active");
    day4Button.classList.remove("btn-active");
    todayButton.classList.remove("btn-active");
});

todayButton.addEventListener("click", function() {
    weatherDisplayDay7.classList.add("day-display-none");
    weatherDisplayDay4.classList.add("day-display-none");
    weatherDisplayToday.classList.remove("day-display-none");

    day7Button.classList.remove("btn-active");
    day4Button.classList.remove("btn-active");
    todayButton.classList.add("btn-active");
});
