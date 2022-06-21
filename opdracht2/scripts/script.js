////////////////
// DE POKEDEX //
////////////////
//Bron: James Q Quick op Youtube https://youtu.be/T-VQUKeSU1w

//Hier roep je de pokedex aan. Heeft een id 'pokedex'
const pokedex = document.getElementById ("pokedex");

console.log (pokedex);

const fetchPokemon = () => {

    //Hier wordt de loader gestart. 
    var loader = document.querySelector (".loader"); 
    loader.classList.add('loading');

    //Door de setTimeout wordt de loader een beetje vertraagd, zodat je hem wel ziet. Anders is ie binnen
    //minder dan 1s weer weg.
    setTimeout(() => {

        const promises = [];

        //Hierdoor krijg je alle 151 pokemons (eerste generatie). Als i (staat voor de pokemon in de api) 
        //minder of gelijk aan 151 is, pakt ie alle data daarvan. Normaal staat er in de url
        //van de api de id van de pokemon, maar nu is dat i. 
        //Stel je doet 493, krijg je alle pokemons t/m generatie 4. Enige is dat hij dan langzamer laadt, want 
        //hij moet meer pokemons ophalen.
        for(let i = 1; i <= 151; i++) {
            const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            promises.push(fetch(url).then((res) => res.json()));
        }
        
        Promise.all (promises).then((results) => {
            //Hierdoor komen de items van de api (naam, id, image en type) in de variabel pokemon
            const pokemon = results.map((data) => ({
                name: data.name,
                id: data.id,
                image: data.sprites['front_default'],
                type: data.types.map((type) => type.type.name).join (',')
            }));
            displayPokemon(pokemon);
        });


        //Hierdoor wordt de loader weer verwijderd als alle data is ingeladen. 
        loader.classList.remove('loading');

       //zolang duur de setTimeout. 
    }, 2000);


};

const displayPokemon = (pokemon) => {
    console.log (pokemon);

    //Dit is de html, maar dan in javascript. Hier heb ik alle data in de html elementen gezet.
    const pokemonHTMLString = pokemon.map(pokeman => `
    <li>
        <img src="${pokeman.image}">
        <h2>${pokeman.id}. ${pokeman.name}</h2>
        <p>Type: ${pokeman.type}</p>
    </li>
    `
    ).join('');

    //Hierdoor komt de geschreven html in index.html terecht. In de id 'pokedex'.
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon ();





///////////////////
// DRAG AND DROP //
///////////////////
var mijnPokedex = document.querySelector("ul");
var Pokemons = document.querySelector("ol");

new Sortable(Pokemons, {
	group: {
		name: 'fotoLijstjes', 
		pull: 'clone'   //Hierdoor wordt de li gekopierd en blijft ie gewoon in de ol staan. 
	},
	sort: false, 
	animation: 300   //Zolang duurt de animatie van het slepen.
});

new Sortable(mijnPokedex, {
	group: {
		name: 'fotoLijstjes', 
		pull: 'false' //Hierdoor kan je de pokémons niet terug slepen.
	},
	animation: 300 
});





////////////////////
// REFRESH BUTTON //
////////////////////

//Zodra je op de button klikt, wordt de gehele pagina herladen. 
const refreshButton = document.querySelector('.refresh-button');

const refreshPage = () => {
  location.reload();
}

refreshButton.addEventListener('click', refreshPage)





//////////////
// DARKMODE //
//////////////

//Als je op de button van darkmode klikt, wordt er op de body de class .darkmode gezet. 
var button = document.querySelector(".darkmode")

function myFunction() {
   var element = document.body;
   element.classList.toggle("darkmode");
}

button.addEventListener("click", myFunction)





///////////
// POPUP //
///////////
//Bron: Easy Tutorials op Youtube https://youtu.be/AF6vGYIyV8M
let popup = document.getElementById("popup");

//Als de popup wordt geopend, wordt daar de class .open-popup op gezet.
function openPopup() {
    popup.classList.add("open-popup");
}
//Als de popup weer sluit, komt de klas .close-popup erop.
function closePopup() {
    popup.classList.add("close-popup");
}