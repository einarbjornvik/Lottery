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



function checkTicket(event)
{
    // console.log(event);

    //lage variabler
    let clickName;
    let clickID;
    const allTickets = document.querySelectorAll(".ticket");

    //hvilket lodd ble klikket
    console.log(event.target.parentElement.getAttribute("name"));

    if(event.target.parentElement.classList.contains("ticket"))
    {
        clickName = event.target.parentElement.getAttribute("name");
        clickID = evnet.target.parentElement.getAttribute("id");
    }
}



loadEventListeners();
function loadEventListeners()
{
    console.log("event listener running");

    //add navn med add-knappen
    btnAdd.addEventListener("click", addName);

    //lagre innstillinger
    btnSaveSettings.addEventListener("click", saveSettings);

    //tegn opp alle deltakere
    document.addEventListener("DOMContentLoaded", showParticipants);

    //hent innstillinger
    document.addEventListener("DOMContentLoaded", getSettings);

    //bruker klikker på lodd
    showTickets.addEventListener("click", checkTicket);
}



function addName(e)
{
    e.preventDefault();
    console.log("addName running");

    //lage variabler
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

    //skriver navn under participants
    showParticipants();

    //mikser loddene
    mixTickets();


    // console.log(allNames);
}



//tegn opp alle lodd
function makeTickets(everyTicket)
{
    console.log("makeTickets running");

    //opprydding i loddene, stopping av akkumuleringen
    while(showTickets.firstChild)
    {
        showTickets.removeChild(showTickets.lastChild);
    }

    //lager en teller
    let i = 1;

    //sjekk om det er lodd i minnet
    if (localStorage.getItem("savedTickets") !== null)
    {
        console.log(everyTicket);
        everyTicket.forEach(name => {
            const newTicket = document.createElement("div");

            newTicket.className = "ticket fresh";
            newTicket.setAttribute("id", i);
            newTicket.setAttribute("name", name);

            newTicket.innerHTML = `<h2>${i}</h2><br><p>${name}</p>`;

            showTickets.appendChild(newTicket);

            i++;
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



//lagre innstillinger
function saveSettings() 
{
    console.log("saving settings");

    localStorage.setItem("ticketPrice", ticketPrice.value);
    localStorage.setItem("numberWinners", numberWinners.value);

    console.log("saving settings");
    console.log("pris per lodd:" + ticketPrice.value);
    console.log("antall vinnere:" + numberWinners.value);
}
//ta ut innstillinger fra lokalt minne
function getSettings() 
{
    console.log("getting settings");
    
    const priceOneTicket = localStorage.getItem("ticketPrice");
    ticketPrice.value = priceOneTicket || 10;
    paid.value = priceOneTicket;
    
    const winnerAmount = localStorage.getItem("numberWinners");
    numberWinners.value = winnerAmount || 1;
}



//stokke om bilettene
function shuffle(array)
{
    console.log("shuffling tickets");

    //lage variabler
    let currentIndex = array.length,
    temporaryValue,
    randomIndex

    //mens det er noe kan flyttes
    while (0 !== currentIndex)
    {
        //velg et element som ikke tidligere er valgt
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        //bytt med denne indexen
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//stokke om bilettene???
function mixTickets()
{
    console.log("mixing tickets");

    let allTickets;
    if (localStorage.getItem("savedTickets") === null)
    {
        allTickets = [];
    }
    else
    {
        allTickets = JSON.parse(localStorage.getItem("savedTickets"));
    }

    //lag tilfeldig rekkefølge
    shuffle(allTickets);

    //flytter denne
    makeTickets(allTickets);
}