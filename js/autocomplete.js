//selecting required elements
let weatherBox = document.querySelector('.weatherDiv');
let inputBox = weatherBox.querySelector('input');
let sugg_Box = weatherBox.querySelector('.suggestions');

//important elements
let x = document.querySelector(".placesTemp");
let Imag = document.querySelector(".cloudTemp");


inputBox.onkeyup = (e)=>{

    x.classList.remove('active');
    Imag.classList.remove('active');
    let userData = e.target.value;
    let emptyArray = [];

    if(userData){
        emptyArray = suggestions.filter( (data)=>{
            return data.toLowerCase().startsWith(userData.toLowerCase());
        });

        emptyArray = emptyArray.map( (data)=>{
            data = `<li>${data}</li>`;
            return data;
        });
        console.log(emptyArray); 
        weatherBox.classList.add('active');

    }
    else{
        weatherBox.classList.remove('active');
    }
    showList(emptyArray);

    //for adding onclick attribute to all listed items
    let suggestedList = sugg_Box.querySelectorAll('li');
    for( let i = 0; i< suggestedList.length; i++){
        suggestedList[i].setAttribute("onclick","select(this)");
    }

}

// function to pick the selected items for input tag
function select(element){
    let selectedText = element.textContent;
    inputBox.value = selectedText;
    weatherBox.classList.remove('active');
}


//Showing the list/suggestions from listed place after the entry of first letter
function showList( list ){
    let listData;
    //if given text don't match the suggestions list
    if(!list.length){
        userValue = inputBox.value;
        listData = "<li>" + userValue + "</li>";
    }
    // if given text is available in list
    else{
        listData = list.join('');
    }
    sugg_Box.innerHTML = listData;
}



/* ------------------------------------------------------Weather Forecasting functions--------------------------------------------------- */

function showTemp(){
    
    weatherBox.classList.remove('active');

    let emptyArray = suggestions.filter( (data)=>{
        return data.toLowerCase() == inputBox.value.toLowerCase();
    });

    if(emptyArray.length!=0){

        x.classList.add('active');
        Imag.classList.add('active');

        let lat;
        let long;
        
        //latLong is the variable storing all value of lat/long of respective cities
        for(data of latLong){ 
            if( (data.country == emptyArray) || (data.State == emptyArray) || (data.City == emptyArray) ){
                lat = data.Lat;
                long = data.Long;
                break;
            }
        }
        console.log("lat: "+ lat +", long: "+ long);
        const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`
        
        //api calling
        fetch(url,{method: 'GET'})
        // return promise
        .then((res) => res.json())
        // resolve promise
        .then((data) => {
            console.log(data);
            let cityName = emptyArray;
            let temp = data.list[0].temp.day;

            //temperatureText
            let tempText = document.getElementsByClassName('temperatureText')[0]
            tempText.innerText = `Temperature of ${cityName} is \n ${temp} \u00B0C`
            
            //weatherIcon
            let icon = document.getElementsByClassName('weatherIcon')[0];
            let w_Icon = data.list[0].weather[0].icon;
            let iconURL = `https://openweathermap.org/img/wn/${w_Icon}.png`;

            icon.src = iconURL;

            //weatherText
            let text1 = document.getElementsByClassName('weatherText')[0];
            let w_Description = data.list[0].weather[0].description;
            text1.innerText = w_Description;

            //humidityText
            let text2 = document.getElementsByClassName('humidityText')[0];
            let humidity = data.list[0].humidity;
            text2.innerText = `Humidity: ${humidity}%`;

            //windText
            let text3 = document.getElementsByClassName('windText')[0];
            let windSpeed = data.list[0].speed;
            text3.innerText = `Wind Speed: ${windSpeed} kmph`;
        })
        .catch((err) => {
            console.log(err)
        })

    }
    else{
        alert("Details for given city is not available. Try another.");
    }
   /*  let x = document.querySelector('placesTemp');
    
    console.log(data)
    let lat = data.coords.latitude;
    let long = data.coords.longitude;
    x.innerText = `Latitude is ${lat} and longitude is ${long}`
    const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`
    //api calling
    fetch(url,{method: 'GET'})
    // return promise
    .then((res) => res.json())
    // resolve promise
    .then((data) => {
        console.log(data)
        let cityName = data.city.name;
        let temp = data.list[0].temp.day;
        y.innerText = `Your city is ${cityName} & temp is ${temp} °C` 
    })
    .catch((err) => {
        console.log(err)
    }) */

}