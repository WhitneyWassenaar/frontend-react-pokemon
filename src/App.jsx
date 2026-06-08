import './App.css'
import axios from "axios";
import {useEffect, useState} from "react";
import PokemonCard from "./PokemonCard/PokemonCard.jsx";

function App() {
    const [pokemon,setPokemon] = useState(null);

    useEffect(() => {
        const getPokemon = async () => {
            const response = await axios.get("https://pokeapi.co/api/v2/pokemon/jigglypuff");

            console.log(response.data) // controle in console
            setPokemon(response.data) // opgehaalde data van API wordt in setPokemon opgeslagen
        }
        getPokemon(); // async functie wordt aangeroepen

    }, []); // [] staat voor "alleen bij de éérste render"

    return (
        <>
            <PokemonCard
                pokemonName={pokemon?.name}
                pokemonUrl={pokemon?.sprites?.front_default}
                pokemonAltText={`An image of the pokemon ${pokemon?.name}`}
                pokemonMoves={pokemon?.moves?.length}
                pokemonWeight={pokemon?.weight}
                pokemonAbilities={pokemon?.abilities}
                />
        </>
    )
}

export default App
