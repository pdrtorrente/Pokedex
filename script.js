const fetchPokemon = () => {
    const getPokemonURL = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`
    
    const pokemonPromises = []

    for(let i=1; i<=150; i++){
        pokemonPromises.push(fetch(getPokemonURL(i)).then(response => response.json()))
    }

    Promise.all(pokemonPromises)
        .then(pokemons => {
            //console.log(pokemons)

            const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
                const types = pokemon.types.map(typeInfo => typeInfo.type.name)

                accumulator += `
                <div class = "card-elements">
                    <li class="card">
                        <h2 class= "card-number">N° ${pokemon.id}</h2>
                        <img class="card-image ${types[0]}" alt="${pokemon.name}" src="${pokemon.sprites.front_default}" />
                        <h2 class="card-title">${pokemon.name}</h2>
                    </li>
                    <div class= "type">
                        <span class = "style-type">
                            ${types[0]}
                        </span>
                        <span class = "style-type">
                            ${types[0]}
                        </span>
                    </div>
                </div>
                `
                return accumulator
            }, '')

            const ul = document.querySelector('[data-js="pokedex"]')

            ul.innerHTML = lisPokemons       
            
            console.log(lisPokemons)
        })
}

fetchPokemon()