import './App.css'
import axios from "axios";
import {useEffect, useState} from "react";
import PokemonCard from "./PokemonCard/PokemonCard.jsx";

function App() {
    const [pokemon,setPokemon] = useState([]);

    useEffect(() => {

        const getPokemonData = async () => {
            const pokemonList = await axios.get("https://pokeapi.co/api/v2/pokemon"); // API GET request
            const results = pokemonList.data.results; // opgehaalde data, array met objects en elke object is {name:"naampokemon", url: "urlvanpokemon"}

            const pokemonDetail = results.map(async (p) => {
                const response = await axios.get(p.url);
                return response.data
            });

            const fullPokemon = await Promise.all(pokemonDetail);
            setPokemon(fullPokemon);
        };
        getPokemonData();

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
