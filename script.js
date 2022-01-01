const api = {
    key: "53f4c3f9395886222fc60e5a530b3a57",
    url: "https://api.openweathermap.org/data/2.5/weather"
}

/* Formulario para identificar el submit */
const form = document.getElementById('search-form');
/* Input para identificar lo escrito */
const searchbox = document.getElementById('searchbox');

/* Elementos de weather-card */
const city = document.getElementById('city');
const date = document.getElementById('date');
const tempImg = document.getElementById('tempImg');
const temp = document.getElementById('temp');
const weather = document.getElementById('weather');
const range = document.getElementById('range');


/* Listener del Form */
form.addEventListener('submit', onSubmit, true)

/* Funcion ejecutada luego de presionar enter */
function onSubmit(event) {
    event.preventDefault();
    search(searchbox.value);
}

/* Para cambiar la imagen dependiendo de la temperatura */
function updateImages(data) {
    const temp = toCelsius(data.main.temp);
    let src = 'images/temp-mid.png';

    if (temp > 30) {
        src = './images/temp-hight.png';
    }
    if (temp < 30) {
        src = './images/temp-mid.png'
    }
    if (temp < 20) {
        src = './images/temp-low.png';
    }
    tempImg.src = src;
}


/* Actualizar la informacion de weather-card dependiendo de la busqueda*/
async function search(query) {
    try {
        const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`);
        const data = await response.json();

        city.innerHTML = `${data.name}, ${data.sys.country}`;
        const today = new Date;
        date.innerHTML = today.toLocaleDateString();
        temp.innerHTML = toCelsius(data.main.temp);
        weather.innerHTML = data.weather[0].description;
        range.innerHTML = `${toCelsius(data.main.temp_min)} / ${toCelsius(data.main.temp_max)}`
        updateImages(data);
    } catch(err) {
        console.log(err);
        alert('Hubo un error')
    }
}

/* Tomar los grados Kelvin a Celsius */
function toCelsius(Kelvin) {
    const calculo = Kelvin - 273.15;
    return calculo.toFixed(2);
}