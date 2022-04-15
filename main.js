
// DOM Selector

const search = document.querySelector("#search");
const city = document.querySelector("#city");
const date = document.querySelector("#date");
const temp = document.querySelector("#temp");
const cloud = document.querySelector("#cloud");
const hi_low = document.querySelector("#hi_low");


const url ={
    base : "https://api.openweathermap.org/data/2.5/",
    key : "appid=6e695b014a7f2876c85996114e792a34"
}

const weatherUrl = url.base+"weather?units=metric&"+url.key;

// fetch Api

function fetchApi(url,q){
    let path = url + q;

    fetch(path)
    .then(res => res.json())
    .then(data => displayResult(data));

}

// display Result

function displayResult(data){
   city.innerHTML = `${data.name},${data.sys.country}`;

   let dat = new Date();

   let dd = dat.getDate();
   let d = dat.getDay();
   let mm = dat.getMonth();
   let yy = dat.getFullYear();

   let month = ["January","Febuary","March","April","May","June","July","August","September","October","November","December"];
   let day = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

   let DD = `${day[d]} ${d} ${month[mm]} ${yy}`;

   date.innerHTML = DD; 

   temp.innerHTML = data.main.temp.toFixed(0)+"'C";

   cloud.innerHTML = data.weather[0].main;

   hi_low.innerHTML = data.main.temp_min.toFixed(0)+"'C/"+data.main.temp_max.toFixed(0)+"'C";


}

// Input Event Listener

search.addEventListener("keypress",(e) => {
    if(e.keyCode === 13){
        let val = e.target.value;

        if(val){
            let query = "&q="+val;
            fetchApi(weatherUrl,query);
        }
        else{
            val = "Taungoo";
            let q = "&q="+val;
        
            fetchApi(weatherUrl,q);
        }
    }
});


// Window Load Default data

window.addEventListener('load',() => {
    let val = "Taungoo";
    let q = "&q="+val;

    fetchApi(weatherUrl,q);
})