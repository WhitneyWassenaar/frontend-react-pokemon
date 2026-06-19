import './App.css'
import axios from "axios";
import {useEffect, useState} from "react";
import PokemonCard from "./components/PokemonCard/PokemonCard.jsx";
import Button from "./components/Button/Button.jsx";

function App() {
    const [pokemon,setPokemon] = useState([]);
    const [previousUrl,setPreviousUrl] = useState(null);
    const [nextUrl,setNextUrl] = useState(null);

    const [loading,setLoading] = useState(false);
    const [error,setError] =useState(null);

    const getPokemonData = async (url) => {
        setLoading(true);
        setError(null);
        try{
            const pokemonList = await axios.get(url);
            const results = pokemonList.data.results;

            const pokemonDetail = results.map(async (p) => {
                const response = await axios.get(p.url);
                return response.data
            });

            const fullPokemon = await Promise.all(pokemonDetail);
            setPokemon(fullPokemon);

            setPreviousUrl(pokemonList.data.previous);
            setNextUrl(pokemonList.data.next);
        }
        catch (error) {
            setError("Er ging iets  mis bij het ophalen van Pokémon :(")
            console.log(error)
        }
        finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        getPokemonData("https://pokeapi.co/api/v2/pokemon");
        }, []);

        const handleNext = () => {
            getPokemonData(nextUrl);
        };

        const handlePrevious = () => {
            getPokemonData(previousUrl);
        };

    return (
        <>
            <Button
            type={"button"}
            onClick={handlePrevious}
            disabled={!previousUrl}
            text={"vorige"}
            />

            <Button
                type={"button"}
                onClick={handleNext}
                disabled={!nextUrl}
                text={"volgende"}
            />
            {loading && <p>Pokémon worden geladen...</p>}
            {error && <p>{error}</p>}
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
