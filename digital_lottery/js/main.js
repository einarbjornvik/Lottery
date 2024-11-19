const nameInput = document.querySelector("#name");
const paid = document.querySelector("#paid");
const btnAdd = document.querySelector("#add");
const participants = document.querySelector(".participants");
const ticketPrice = document.querySelector("#ticketPrice")
const numberWinners = document.querySelector("#numberWinners")
const btnSaveSettings = document.querySelector("#save_settings")


//globale variabler
let allNames = ["placeholder"];

loadEventListeners();
function loadEventListeners(){
    console.log("event listener OK");

    btnAdd.addEventListener("click", addName);

    btnSaveSettings.addEventListener("click", saveSettings);

    document.addEventListener("DOMContentLoaded", showParticipants);
}



function addName(e)
{
    e.preventDefault();

    if (nameInput.value != "")
        {
            allNames.push(nameInput.value);
            allNames.sort();
        }
    else
        {
            alert("navn må fylles ut!");
        }
    
    
    localStorage.setItem("savedNames", JSON.stringify(allNames));

    nameInput.value = "";
    nameInput.focus();

    showParticipants();
    console.log(allNames);
    console.log("add name OK");
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



function saveSettings()
{
    localStorage.setItem("ticketPrice", ticketPrice.value)

    console.log("saving settings");
    console.log("pris per lodd:" + ticketPrice.value, numberWinners.value);
    
}