const nameInput = document.querySelector("#name");
const paid = document.querySelector("#paid");
const btnAdd = document.querySelector("#add");
const participants = document.querySelector(".participants");
const ticketPrice = document.querySelector("#ticketPrice");
const numberWinners = document.querySelector("#numberWinners");
const btnSaveSettings = document.querySelector("#save_settings");


//globale variabler
// let allNames = ["einar", "terje"];

loadEventListeners();
function loadEventListeners(){
    console.log("event listener OK");

    btnAdd.addEventListener("click", addName);

    btnSaveSettings.addEventListener("click", saveSettings);

    document.addEventListener("DOMContentLoaded", showParticipants);
    document.addEventListener("DOMContentLoaded", getSettings);
}



function addName(e)
{
    e.preventDefault();
    console.log("add name OK");
    let paidEnough;
    let priceOneTicket;
    let allNames;


    if (localStorage.getItem("ticketprice") === null)
    {
        priceOneTicket = 10;
    }
    else
    {
        priceOneTicket = localStorage.getItem("ticketPrice");
    }



    if (Math.floor(paid.value / 10) >= 1)
    {
        console.log("betalt nok");

        paidEnough = true;
    }
    else
    {
        console.log("ikke betalt nok");

        paidEnough = false;
    }



    if (paidEnough === true)
    {
        if (localStorage.getItem("savedNames") === null) //få verdier fra local storage
        {
            allNames = [];
        }
        else
        {
            allNames = JSON.parse(localStorage.getItem("savedNames"));
        }



        if (nameInput.value != "") //om navn ikke er tomt
            {
                allNames.push(nameInput.value);
                allNames.sort();
                
            }
        else
            {
                alert("navn må fylles ut!");
            }

        localStorage.setItem("savedNames", JSON.stringify(allNames)); //skriv til minne
    }

    nameInput.value = "";
    nameInput.focus();

    showParticipants();
    console.log(allNames);

}



function showParticipants()
{
    let savedNames;



    while(participants.firstChild)
    {
        participants.removeChild(participants.lastChild);
    }

    if (localStorage.getItem("savedNames") === null)
    {
        savedNames = [];
    }
    else
    {
        savedNames = JSON.parse(localStorage.getItem("savedNames"));
    }



    savedNames.forEach((name) =>
    { 
        const li = document.createElement("li");
        li.className = "participants_name";
        li.appendChild(document.createTextNode(name));
        participants.appendChild(li);
    });
}



function saveSettings() //lagre innstillinger
{
    localStorage.setItem("ticketPrice", ticketPrice.value);
    localStorage.setItem("numberWinners", numberWinners.value);

    console.log("saving settings");
    console.log("pris per lodd:" + ticketPrice.value);
    console.log("antall vinnere:" + numberWinners.value);
    
}
function getSettings() //ta ut innstillinger fra lokalt minne
{
    console.log("getting settings");
    
    const priceOneTicket = localStorage.getItem("ticketPrice");
    ticketPrice.value = priceOneTicket || 10;
    paid.value = priceOneTicket;
    
    const winnerAmount = localStorage.getItem("numberWinners");
    numberWinners.value = winnerAmount || 1;
}