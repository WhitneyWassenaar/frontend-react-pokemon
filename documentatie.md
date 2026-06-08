# frontend-react-pokemon
Dit is een documentatie over welke obstakels ik ben tegengekomenen en welke oplossingen ik daarvoor gevonden heb. Ook zullen hier vragen komen te staan met antwoord als geheugensteuntje met doorverwijzende bronnen.

Wat is een RESTful API? 

Is er een verschil tussen RESTful API en REST API?

Vanuit de doc
- This is a consumption-only API — only the HTTP GET method is available on resources.
- No authentication is required to access this API

Ik heb axios geïnstalleerd om het ophalen van data makkelijker te maken


Als de data een object is, dan sla je eerst null op in initiele waarde van state

Als de data een array is, dan sla je eerst [] op in initiele waarde van state


`?.` component rendert altijd ook al is er bepaalde data 'undefined'
`&&` component rendert pas als de data bestaat

Ik kreeg heel veel errors over properties die nog undefined waren wanneer de map method in het component `PokemonCard.jsx` werd uitgevoerd. Ik had dan wel de optional chaining in `App.jsx` toegepast maar niet in de dit component. Dus heb ik optional chaining ook in het component toegepast.
```javascript
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

```


