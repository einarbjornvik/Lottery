//alle ressurser
const nameInput = document.querySelector("#name");
const paid = document.querySelector("#paid");
const btnAdd = document.querySelector("#add");
const participants = document.querySelector(".participants");
const ticketPrice = document.querySelector("#ticketPrice");
const numberWinners = document.querySelector("#numberWinners");
const btnSaveSettings = document.querySelector("#save_settings");
const showTickets = document.querySelector(".tickets");


//globale variabler
// let allNames = ["einar", "terje"];

loadEventListeners();
function loadEventListeners(){
    console.log("event listener running");

    btnAdd.addEventListener("click", addName);
    btnSaveSettings.addEventListener("click", saveSettings);

    document.addEventListener("DOMContentLoaded", showParticipants);
    document.addEventListener("DOMContentLoaded", getSettings);
}



function addName(e)
{
    e.preventDefault();
    console.log("addName running");
    let paidEnough;
    let priceOneTicket;
    let allNames;
    let allTickets;

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
        if (localStorage.getItem("savedNames") === null) 
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

        //skriv til minne
        localStorage.setItem("savedNames", JSON.stringify(allNames));
        

        if (localStorage.getItem("savedTickets") === null)
        {
            allTickets = [];
        }
        else
        {
            allTickets = JSON.parse(localStorage.getItem("savedTickets"));
        }


        //hvor mange lodd til hver enkelt spiller
        for (let i = 0; Math.floor(paid.value/priceOneTicket) > i; i++)
        {
            allTickets.push(nameInput.value)
        }

        //skriv til minne antall lodd for hvert navn
        localStorage.setItem("savedTickets", JSON.stringify(allTickets));
    }

    nameInput.value = "";
    nameInput.focus();

    showParticipants();
    makeTickets(allTickets);
    
    // console.log(allNames);
}



//tegn opp alle lodd
function makeTickets(everyTicket)
{
    console.log("makeTickets running");

    //sjekk om det er lodd i minnet
    if (localStorage.getItem("savedTickets") !== null)
    {
        console.log(everyTicket);
        everyTicket.forEach(name => {
            const newTicket = document.createElement("div");
            newTicket.className = "ticket fresh";
            newTicket.innerHTML = `<h2>${name}</h2>`;
            showTickets.appendChild(newTicket);
        })
    }
}



function showParticipants()
{
    console.log("showParticipants running");
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


    //list opp navn med li
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
    console.log("saving settings");

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