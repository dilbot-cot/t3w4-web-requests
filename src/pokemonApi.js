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
async function putDataOnPage(){

}

// Button calls this
async function getAndDisplayPokemonData(){
    let data = await getPokemonData();
    console.log(data);

    putDataOnPage();
}

document.getElementById('create-encounter').addEventListener("click", getAndDisplayPokemonData);