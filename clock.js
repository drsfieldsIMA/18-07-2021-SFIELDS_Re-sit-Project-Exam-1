

const hourContainer=document.querySelector(".hours");
const minutesContainer=document.querySelector(".minutes");
const secondsContainer=document.querySelector(".seconds");
const time =new Date()
let hours=time.getHours();
let minutes=time.getMinutes();
let seconds=time.getSeconds();

hourContainer.innerHTML=hours + 'hour';
minutesContainer.innerHTML=minutes+ 'minutes';
secondsContainer.innerHTML=seconds +'seconds';

async function getcarItems() {
try {
    const response = await fetch("https://api.bigoven.com/recipe/1?api_key=glFUKikehWjLW900etpS564VgIzOWSW5&data-type=json");
    console.log(response)
    const json = await response.json();
    console.log(response)
    console.log(response.json)
}
catch (error){
console.log("error");
}
}

getcarItems()

XMLDocument