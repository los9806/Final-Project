const pokemonCount = 151;
var pokedex = {}; // {1 : {"name" : "bulbsaur", "img", : url, "type" : ["grass", "poison"], "desc" : "..."} }

window.onload = async function() {
    //getPokemon(1);
    for(let i = 1; i <= pokemonCount; i++) {
        await getPokemon(i);
        //<div id="1" class="pokemon-name">BULBSAUR</div>
        let pokemon = document.createElement("div");
        pokemon.id = i;
        pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();
        pokemon.classList.add("pokemon-name");
        pokemon.addEventListener("click", updatePokemon);
        document.getElementById("pokeList").append(pokemon);
    }

    document.getElementById("pokeDescription").innerText = pokedex[1]["desc"];

    console.log(pokedex);
}

async function getPokemon(num) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

    let response = await fetch(url);
    let pokemon = await response.json();
    //console.log(pokemon)

    let pokemonName = pokemon["name"];
    let pokemonType = pokemon["types"];
    let pokemonImg = pokemon["sprites"]["front_default"];

    response = await fetch(pokemon["species"]["url"]);
    let pokemonDesc = await response.json();

    //console.log(pokemonDesc);
    pokemonDesc = pokemonDesc["flavor_text_entries"][8]["flavor_text"]

    pokedex[num] = {"name" : pokemonName, "img" : pokemonImg, "types" : pokemonType, "desc" : pokemonDesc}

}

function updatePokemon() {
    document.getElementById("pokeImg").src = pokedex[this.id]["img"];

    //clear the previous type
    let typesDiv = document.getElementById("pokeType");
    while (typesDiv.firstChild) {
        typesDiv.firstChild.remove();
    }

    //update types 
    let types = pokedex[this.id]["types"];
    for (let i = 0; i < types.length; i++) {
        let type = document.createElement("span");
        type.innerText = types[i]["type"]["name"].toUpperCase();
        type.classList.add("typeBox");
        type.classList.add(types[i]["type"]["name"]); //adds background color and font color 
        typesDiv.append(type);
    }

    //update description 
    document.getElementById("pokeDescription").innerText = pokedex[this.id]["desc"];
}

