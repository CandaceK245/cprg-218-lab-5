const option1SubmitButton = document.getElementById("submit-button");
option1SubmitButton.addEventListener("click", cityDropdownClickHandler);
renderDropdownOptions();

async function fetchWeatherDetails(city){
    const url = "http://api.weatherstack.com/current?access_key=bc9b1ae9c3774d8698ffbaf0f2cb5756&query=" + city;
    try{
        const response = await fetch(url);
        const json = await response.json();
        return json;
    //Error handling
    } catch (error) {
        console.log(error);
    }
}

async function cityDropdownClickHandler(event){
    const select = document.getElementById("dropdown");
    const city = select.options[select.selectedIndex].value;
    
    const data = await fetchWeatherDetails(city);
    if (data) {
        const card = createCardElement({
            title: data.location.name,
            subtitle: data.current.temprature + ", " + data.current.observation_time,
            image: data.current.weather_icon,
          });
          document.getElementById("weather-results").innerHTML = card;
    }
}

function renderDropdownOptions (){
    const myCities = ["Calgary", "Edmonton"];
    const select = document.getElementById("dropdown");    

    myCities.forEach(city => {
        const option = document.createElement("option");
        option.textContent = city;
        option.value = city;
        select.appendChild(option);
    });
}

function createCardElement(item) {
    return `
        <li class="card">
            <img src=${item.image} alt="">
            <div class="card-content">
                <p class="subheader">
                    ${item.subtitle}
                </p>
                <h3 class="header">
                    ${item.title}
                </h3>
            </div>
        </li>
      `;
  }