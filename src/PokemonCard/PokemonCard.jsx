import './PokemonCard.css';

function PokemonCard({pokemonName,pokemonUrl,pokemonAltText,pokemonMoves,pokemonWeight,pokemonAbilities}) {
    return (
        <div className='pokemon-card'>
            <h2>{pokemonName}</h2>
            <img src={pokemonUrl} alt={pokemonAltText} />
                <p>Moves: {pokemonMoves}</p>
                <p>Weight: {pokemonWeight}</p>

    <p>Abilities:</p>
    <ul>
        {pokemonAbilities?.map((ability)=> (
            <li key={ability?.ability.name}>
                {ability?.ability.name}
            </li>
        ))}
    </ul>
        </div>
    )
}

export default PokemonCard;