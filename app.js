class App {
  constructor() {
    this.getLocation();
    this.lat;
    this.lng;
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      this.gotLocation.bind(this),
      this.errorLocation.bind(this)
    );
  }

  gotLocation(result) {
    this.lat = result.coords.latitude;
    this.lng = result.coords.longitude;
    this.getWeather();
  }

  getWeather() {
    let url = `https://api.weatherbit.io/v2.0/current?lat=${this.lat}&lon=${this.lng}&key=84dc183942414da2b9ccf4c869724e4f&include=minutely?units=si`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let temp = data.data[0].app_temp;
        this.getMeal(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  errorLocation(err) {
    console.log(err);
  }

  getMeal(temperature) {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then((data) => {
        let meal = data.meals[0].strMealThumb 
        this.updateAd(temperature, meal);
      })
      .catch((error) => console.log(error));
  }

  showError(error) {
    console.log(error);
  }

  updateAd(temperature, meal) {
    let text = document.querySelector("h1");
    let imgMeal = document.querySelector("img");
    let temp = temperature;
    let mealImg = meal;
    text.innerHTML = "Deze maaltijd is perfect, want het is" + temp + "°C";
    imgMeal.src = mealImg;
    imgMeal.style.width = "500px";
    imgMeal.style.height = "500px";
  }
}

let app = new App();