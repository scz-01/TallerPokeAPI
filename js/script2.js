async function personajePorTipo(){

    const characterType = document.getElementById("tipoPokemon").value;

    if(characterType === ""){
        alert("Por favor ingresa un ID de personaje (buscar X tipo)");
        return;
    }

    try {

        const url = `https://pokeapi.co/api/v2/type/${characterType}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al obtener los Pokémon");
                }
                return response.json();
            })
            .then(data => {
                mostrarResultado(data.pokemon);
            })
            .catch(error => {
                document.getElementById("resultado").innerText = error.message;
            });

        function mostrarResultado(pokemonList) {
            const resultadoDiv = document.getElementById("resultado");
            resultadoDiv.innerHTML = ''; // Limpiar resultados anteriores
        
            pokemonList.forEach(pokemon => {
                const nombre = pokemon.pokemon.name;
                const url = pokemon.pokemon.url;
        
                // Obtener información adicional del Pokémon
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        resultadoDiv.innerHTML += `
                            <div>
                                <h2>${nombre.toUpperCase()}</h2>
                                <img src="${data.sprites.front_default}" alt="${nombre}">
                                <p>Id: ${data.id}</p>
                                <p>Altura: ${data.height}</p>
                                <p>Peso: ${data.weight}</p>
                            </div>
                        `;
                    });
            });
        }
        
    } catch (error) {
        console.error("Error",error);
    }

}

document.getElementById("cargarBtn").addEventListener("click", personajePorTipo);
