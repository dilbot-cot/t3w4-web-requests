// Get data from the API

async function getPokemonData(){
    let pokemonApiUrlBase = "https://pokeapi.co/api/v2/pokemon/";

    let randomPokemonNumber = Math.floor(Math.random() * 1025) +1;

    let fullApiUrl = pokemonApiUrlBase + randomPokemonNumber;

    let response = await fetch(fullApiUrl);

    let responseData = await response.json();
    let result = responseData;

    return result;
}

// Set data to classes
async function putDataOnPage(dataToDisplay){

    // Display Pokemon Name
    document.getElementsByClassName("pokemonName")[0].textContent = dataToDisplay.name;

    // Display Pokemon 1st Type
    document.getElementsByClassName("pokemonType1")[0].textContent = dataToDisplay.types[0].type.name;

    // Check is Pokemon 2nd Type exists, and display
    if (dataToDisplay.types[1]) {
        document.getElementsByClassName("pokemonType2")[0].textContent = dataToDisplay.types[1].type.name;
    } else {
        document.getElementsByClassName("pokemonType2")[0].textContent = "";
    }
    let imageContainer = document.querySelector(".pokemonImage img")
    // Check if pokemon is shiny 1 in 8192 chance
    if (Math.floor(Math.random() * 4) + 1 === 1) {
        imageContainer.src = dataToDisplay.sprites.front_shiny;
        
    } else {
    imageContainer.src = dataToDisplay.sprites.front_default;
}


let cryURL = dataToDisplay.cries.latest;
let pokemonAudioElement = document.querySelector(".pokemonCry");
pokemonAudioElement.src = cryURL;

}

// Button calls this
async function getAndDisplayPokemonData(){
    let data = await getPokemonData();
    console.log(data);

    putDataOnPage(data);
}

document.getElementById('create-encounter').addEventListener("click", getAndDisplayPokemonData);

async function generateTeamData(){
    

    // let teamArray = [];
    // for (let index = 0; index < 6; index++) {
    //     let data = await getPokemonData();
    //     teamArray.push(data);       
    // }
    // return teamArray
 
    let promiseAllResult = await Promise.all([
        getPokemonData(),
        getPokemonData(),
        getPokemonData(),
        getPokemonData(),
        getPokemonData(),
        getPokemonData(),
    ]);

    return promiseAllResult;
}
async function showTeamData(teamToDisplay){
    let teamDisplaySection = document.getElementById("team-display");
    teamDisplaySection.innerHTML = "";

    teamToDisplay.forEach((pokemon) => {
        let newPokemonCard = document.createElement("div");

        // Pokemon Name
        let pokemonNameTitle = document.createElement("h3");
        pokemonNameTitle.textContent = pokemon.name;
        newPokemonCard.appendChild(pokemonNameTitle);

        // Pokemon Types
        let type1Display = document.createElement("div");
        let type2Display = document.createElement("div");

        type1Display.textContent = "Type 1: " + pokemon.types[0].type.name
        if (pokemon.types[1]) {
            type2Display.textContent = "Type 2: " + pokemon.types[1].type.name;
        } else {
            type2Display.textContent = ""
        }

        newPokemonCard.appendChild(type1Display);
        newPokemonCard.appendChild(type2Display);

        // Apply all content to page
        teamDisplaySection.appendChild(newPokemonCard);
    });
}

async function getAndShowTeamData(){
    let teamData = await generateTeamData();
    console.log(teamData);
    showTeamData(teamData); 
}

document.getElementById("create-team").addEventListener("click", getAndShowTeamData);