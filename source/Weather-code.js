const option1SubmitButton = document.getElementById("submit-button");
option1SubmitButton.addEventListener("click", cityDropdownClickHandler);
renderDropdownOptions();

/*calls API returns data*/
async function fetchWeatherDetails(city){
    const url = "https://api.weatherapi.com/v1/current.json?key=462772371c8448efbf815953240404&q=" + city + "&aqi=no";
    try{
        const response = await fetch(url);
        const json = await response.json();
        return json;
    //Error handling
    } catch (error) {
        console.log(error);
    }
}
/*adds function for button click*/
async function cityDropdownClickHandler(event){
    const select = document.getElementById("dropdown");
    const city = select.options[select.selectedIndex].value;
    
    const data = await fetchWeatherDetails(city);
    if (data) {
        const card = createCardElement({
            title: data.location.name,
            subtitle: data.current.temp_c + "°C, " + data.current.last_updated,
          });
          document.getElementById("weather-results").innerHTML = card;
    }
}
/*creates dropdown options*/
function renderDropdownOptions (){
    const myCities = ["Calgary", "Airdrie", "Okotoks", "Cochrane"];
    const select = document.getElementById("dropdown");    

    myCities.forEach(city => {
        const option = document.createElement("option");
        option.textContent = city;
        option.value = city;
        select.appendChild(option);
    });
}
/*HTML from API call*/
function createCardElement(item) {
    return `
        <li class="card">
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