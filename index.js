/*
Copyright 2024 DolmaAndKebab

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

if (document.getElementById("ROOT") instanceof HTMLElement) { var Root = document.getElementById("ROOT") }

// OpenWeatherMap APIKey!
const APIKEY = "";

const City_Input = document.getElementById("City");
const City_Request = document.getElementById("City-Button");

City_Request.addEventListener("click", () => {

    try {

        if (City_Input.value === "" || City_Input.value.length < 0) {
            console.error("[ERROR]: Unable to handle City_Request because City_Input is empty.");
            return;
        };
        if (!isNaN(City_Input.value) || typeof City_Input.value !== "string") {
            console.error("[ERROR]: Unable to handle City_Request because City_Input contains a none string value.");
            return;
        };
    
        const Requested_City = City_Input.value.toString();

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${Requested_City}&appid=${APIKEY}`;

        const Xhr = new XMLHttpRequest();
        Xhr.open("GET", apiUrl, true);
        Xhr.onload = () => {
            if (Xhr.status === 200) {
                const data = JSON.parse(Xhr.responseText);
            
                ShowData(data);

            } else {
                console.error("[ERROR]: Failed to fetch weather data from API.");
            };
        }
        Xhr.send();

        

    } catch (error) {
        console.error(`[ERROR]: Unexpected error when handling City_Request. ${error}`);
    };

})

const ShowData = (Data) => {
    if (typeof Data !== "object" || Data.length < 0) {
        console.error("[ERROR]: Unable to handle Data because it does not meet the requirements.");
        return;
    };

    // Checking if ID Status is a HTMLElement and declaring the Status Container Element.
    if (document.getElementById("Status") instanceof HTMLElement) { var WeatherStatus = document.getElementById("Status") }

    // Refreshing
    while (WeatherStatus.firstChild) {
        WeatherStatus.removeChild(WeatherStatus.firstChild);
    };
    if (document.getElementById("CityName")) {
        const City_Element = document.getElementById("CityName");
        document.body.removeChild(City_Element);
    };

    // Creating City Name
    const CityName = document.createElement("p");

    CityName.innerHTML = ("<span style='color: var(--bs-primary);'>City: </span>" + Data.name.toString());
    CityName.id = "CityName";

    document.body.insertBefore(CityName, document.body.firstChild);

    // Creating Temp
    const TempStatus = Create_Status_Element("Temp", "Temp", Data.main.temp);

    // Creating Temp Min
    const TempMinStatus = Create_Status_Element("TempMin", "Temp Min", Data.main.temp_min);

    // Creating Temp Max
    const TempMaxStatus = Create_Status_Element("TempMax", "Temp Max", Data.main.temp_max);

    // Creating Feels_like
    const Feels_LikeStatus = Create_Status_Element("Feels_Like", "Feels Like", Data.main.feels_like);

    // Creating humidity
    const HumidityStatus = Create_Status_Element("Humidity", "Humidity", Data.main.humidity);

    // Creating pressure
    const PressureStatus = Create_Status_Element("Pressure", "Pressure", Data.main.pressure);

    // Creating Wind Speed
    const WindSpeedStatus = Create_Status_Element("WindSpeed", "Wind Speed", Data.wind.speed);

    // Creating Wind Deg
    const WindDegStatus = Create_Status_Element("WindDeg", "Wind Deg", Data.wind.deg);

    // Creating Wind Gust
    const WindGustStatus = Create_Status_Element("WindGust", "Wind Gust", Data.wind.gust);

    // Creating All Clouds
    const AllCloudsStatus = Create_Status_Element("AllClouds", "Clouds", Data.clouds.all);


    // Appending Status Elements
    if (TempStatus) {WeatherStatus.appendChild(TempStatus)}
    if (TempMinStatus) {WeatherStatus.appendChild(TempMinStatus)}
    if (TempMaxStatus) {WeatherStatus.appendChild(TempMaxStatus)}
    if (Feels_LikeStatus) {WeatherStatus.appendChild(Feels_LikeStatus)}
    if (HumidityStatus) {WeatherStatus.appendChild(HumidityStatus)}
    if (PressureStatus) {WeatherStatus.appendChild(PressureStatus)}
    if (WindSpeedStatus) {WeatherStatus.appendChild(WindSpeedStatus)}
    if (WindDegStatus) {WeatherStatus.appendChild(WindDegStatus)}
    if (WindGustStatus) {WeatherStatus.appendChild(WindGustStatus)}
    if (AllCloudsStatus) {WeatherStatus.appendChild(AllCloudsStatus)}

}

const Create_Status_Element = (Id, Name, Data) => {
    if (Data === undefined|| Data === null) {
        return;
    }
    const StatusElement = document.createElement("p");

    StatusElement.innerHTML = (`<span>${Name}: </span>` + Data);
    StatusElement.id = Id.toString();

    return StatusElement;
}
