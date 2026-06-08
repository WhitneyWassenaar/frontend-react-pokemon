# frontend-react-pokemon
Dit is een documentatie over welke obstakels ik ben tegengekomenen en welke oplossingen ik daarvoor gevonden heb. Ook zullen hier vragen komen te staan met antwoord als geheugensteuntje met doorverwijzende bronnen.

Wat is een RESTful API? 

Is er een verschil tussen RESTful API en REST API?

Vanuit de Pokemon API doc
- This is a consumption-only API — only the HTTP GET method is available on resources.
- No authentication is required to access this API

Ik heb axios geïnstalleerd om het ophalen van data makkelijker te maken

Tips:
* Als de data een object is, dan sla je eerst null op in initiele waarde van state
* Als de data een array is, dan sla je eerst [] op in initiele waarde van state
* `?.` component rendert altijd ook al is er bepaalde data 'undefined'
* `&&` component rendert pas als de data bestaat
* state zet je altijd zo hoog mogelijk in de functie

## Het weergeven van 1 pokemon(kaart)
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
Nu wil ik 2 pokemon op het scherm weergeven. Dus ik dacht, ik zal dan 2 keer de functie moeten aanroepen met de juiste parameters. Dus "ditto" en "jigglypuff". Maar zo makkelijk gaat dat niet.

Wat er nu gebeurt is dat  bij het ophalen van de data er maar 1 pokemon wordt opgehaald, dus de volgende pokemon schrijft de vorige over. 

Omdat ik nu te maken heb met meer dan 1 pokemon, zal ik de 2 pokemons moeten opslaan in een array. Dus verander ik de initiële waarde van `pokemon` state van `null` naar `[]`

Toen ik dat had gedaan verdween mijn pokemon van het scherm, nu werd er eigenlijk een array opgehaald en geprobeerd weer te geven,  maar je kan een array niet in zijn geheel weergeven, dan krijg je dus `object` of `undefined`.

_Ik moest er voor zorgen dat de pokemon state niet werd overschreven door de volgende opgehaalde data van de volgende pokemon. Ik wilde dat er pokemons werden toegevoegd in de array._

Ik vond dit stukje code om pokemons toe te voegen toch wel lastig te begrijpen dus schrijf ik het uit zodat ik later weer terug kan lezen als dat nodig is:
```javascript
setPokemon(previousPokemon => [...previousPokemon,response.data]);
```
1. `setPokemon(...)` : Dit is de state-update functie, updaten van de `pokemon` state
2. `previousPokemon =>` : Dit is een callback functie , dit staat gelijk aan de huidige state. Dus `previousPokemon = huidige state`
We nemen als voorbeeld:
```javascript
[{ name: "jigglypuff" }]
```
3. `...previousPokeon` : Dit is een spread-operator. Deze operator maakt een kopie van de oude array.
4. `[...previousPokemon, response.data]` : nieuwe data toevoegen. Aan het einde voeg je 1 item toe. 
Dus alle items uit oude array + nieuw item in een nieuwe array
```javascript
[{ name: "jigglypuff" }, { name: "ditto" }]
```
5. Daarna wordt de nieuwe state opgeslagen

**Flow**
1. vorige state ophalen
2. kopiëren met ...
3. nieuwe Pokémon toevoegen
4. nieuwe array teruggeven
5. React update UI

## Het weergeven van 2 pokemon(kaarten)

De PokemonCard component stond al in de return-statement van `App.jsx`, maar het stond alleen klaar voor 1 pokemon. Omdat de 2 pokemon in een array staan, is het logisch om door de array te mappen. makkelijker gezegd, React zal dus door de `pokemon` state moeten mappen, omdat de data daarvan een array is.

```javascript
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
```

1. `pokemon` is een array van 2 objecten
2. `.map` loop door elk object van de array
3. `(fetchedPokemon) =>`: Dit is 1 item per loop
4. Voor elke item per loop geef je 1 `PokemonCard` component terug. Dus in dit geval maakt React 2 PokemonCards
5. Het object is `fetchedPokemon` dus die gebruik je bij het aanspreken van specifieke objecten
6. Bij de `map` method, wordt er gebruikgemaakt van een key. De key moet uniek zijn om efficiënt te kunnen updaten en items te kunnen herkennen. Gelukkig heeft elke pokemon zijn of haar eigen id, dus kunnen we `id` aanspreken als key.