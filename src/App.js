import { ToastContainer, toast } from 'react-toastify';
import React, {useState} from "react";
import axios from "axios";
import "./App.css"
import 'react-toastify/dist/ReactToastify.css';

function App() {

	const [pokemons, setPokemons] = useState([]);
	const [txtPokemon, setTxtPokemon] = useState("");


	function buscaPokemon(){
    if(!txtPokemon.trim()){
      buscaTodosPokemons()
      return;
    }
		axios.get(`https://pokeapi.co/api/v2/pokemon/${txtPokemon}`)
		.then(resposta => { 
      setPokemons([resposta.data])
		})
		.catch(resposta=> {
      toast("Pokémon Não Encontrado!✖");
		})
	}

	function buscaTodosPokemons(){
		// pokemon 			-> busca todos pokemons
		// pokemon?limit=X  -> busca todos com um numero limite
		// pokemon/nome 	-> busca um pokemon específico
		axios.get("https://pokeapi.co/api/v2/pokemon?limit=75")
		.then(response => { // Será executado quando a requisição terminar
			console.log("Requisição bem sucedida!");
			setPokemons(response.data.results);
		})
		.catch(response => { // É executado quando dá erro na requisição
			console.log("Deu ruim na requisição");
			console.log(response);
		}) 
	}
	React.useEffect(()=>{
		buscaTodosPokemons();
	}, [])
 
  return (
    <div>
      <h1>Everton PokéDex</h1>
		  <p>Conheça os Pokémons mais famosos</p>
      <input onChange={(e)=>setTxtPokemon(e.target.value)} placeholder="Digite o nome de um Pokémon"/>
      <button onClick={()=>buscaPokemon()}>Buscar</button>

      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

		{
      pokemons.map((pokemon) => 
      {
        let id;
        if(pokemon.url){
          const PokemonURL = "https://pokeapi.co/api/v2/pokemon/"
          id = pokemon.url.replace(PokemonURL, "").replace("/", "")
        }
        else {
          id = pokemon.id
        }
        return(
          <div className="pkmon" key={id}>
					<p>{pokemon.name}</p>
					<img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/"+(id)+".gif"}/>
				</div>
        )
      }
				
			)
		}
    </div>
  );
}

export default App;