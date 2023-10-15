class App{
    constructor(){
        this.getLocation();
        this.lat;
        this.lng;
    }
    getLocation(){
        navigator.geolocation.getCurrentPosition(
            this.gotLocation.bind(this),
            this.errorLocation.bind(this)
        );
    }

    gotLocation(result){
       // console.log(result);
       this.lat = result.coords.latitude;
       this.lng = result.coords.longitude;
       //console.log(this.lat);
       this.getWeather();
    }

    getWeather(){
        //84dc183942414da2b9ccf4c869724e4f
        let url = `https://api.weatherbit.io/v2.0/current?lat=${this.lat}&lon=${this.lng}&key=84dc183942414da2b9ccf4c869724e&include=minutely?units=si`;
        fetch(url).then(response => {
            //console.log(response);
            return response.json();
        })
        .then(data => {
            console.log(data);
            document.querySelector('#weather').innerHTML = data.data[0].app_temp;
        })
        .catch(err => {
            console.log(err);
        });     
    }

    errorLocation(err){
        console.log(err);
    }   
}

let app = new App();