import './App.css'
import axios from "axios";
import {useEffect, useState} from "react";
import PokemonCard from "./PokemonCard/PokemonCard.jsx";

function App() {
    const [pokemon,setPokemon] = useState([]);

    useEffect(() => {
        const getPokemon = async (pokemonName) => {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

            setPokemon(previousPokemon => [...previousPokemon,response.data]);

            // console.log(response.data) // controle in console
            // setPokemon(response.data) // opgehaalde data van API wordt in setPokemon opgeslagen
        }
        getPokemon("jigglypuff");
        getPokemon("ditto");

    }, []); // [] staat voor "alleen bij de éérste render"

    return (
        <>
            {pokemon.map((fetchedPokemon) => (
                <PokemonCard
                    key={fetchedPokemon.id}
                    pokemonName={fetchedPokemon.name}
                    pokemonUrl={fetchedPokemon.sprites.front_default}
                    pokemonAltText={`An image of the pokemon ${fetchedPokemon.name}`}
                    pokemonMoves={fetchedPokemon.moves.length}
                    pokemonWeight={fetchedPokemon.weight}
                    pokemonAbilities={fetchedPokemon.abilities}
                />
            ))}

        </>
    )
}

export default App
