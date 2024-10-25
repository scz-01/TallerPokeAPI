// consultamos personaje por ID
async function buscarPersonaje(){
    const characterId = document.getElementById("personajeId").value;
    if(characterId === ""){
        alert("Por favor ingresa un ID de personaje");
        return;
    }

    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${characterId}`)
        // const responseImage = await fetch(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${characterId}`)

        if(!response.ok){
            throw new Error("Personaje no encontrado");
        }

        const data = await response.json();
        // const dataImage = await responseImage.json();

        const characterCard = document.getElementById("personaje");
        
        characterCard.style.display = "block";
        characterCard.innerHTML = `
            <h2>${data.name}</h2>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${characterId}.png" alt="${data.name}" />
            <p><strong>Id:</strong>${data.id}</p>
            <p><strong>Experiencia base: </strong>${data.base_experience}</p>
            <p><strong>Altura: </strong>${data.height}</p>
            <p><strong>Peso: </strong>${data.weight}</p>
        `
        

    }catch(error){
        console.error("Error",error)
        const characterCard = document.getElementById("personaje");
        characterCard.style.display = "block"
        characterCard.innerHTML = "<p>No se encontro el personaje</p>"
    }

}

document.getElementById("buscarBtnPokemon").addEventListener("click",buscarPersonaje);