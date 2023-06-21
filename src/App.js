import { ToastContainer, toast } from 'react-toastify';
import React, {useState} from "react";
import axios from "axios";
import "./App.css"
import 'react-toastify/dist/ReactToastify.css';

function App() {

	const [pokemons, setPokemons] = useState([]);
	const [txtPokemon, setTxtPokemon] = useState("");
  const [pokemonSelecionado, setPokSelecionado] = useState(null)


	function buscaPokemon(){
    if(!txtPokemon.trim()){
      toast("Digite o Nome de um Pokémon!")
      buscaTodosPokemons()
      return;
    }
		axios.get(`https://pokeapi.co/api/v2/pokemon/${txtPokemon}`)
		.then(resposta => { 
      setPokemons([resposta.data])
      toast("✔ Pokemon Encontrado!")
		})
		.catch(resposta=> {
      toast("❌ Pokémon Não Encontrado!");
		})
	}

	function buscaTodosPokemons(){
		// pokemon 			-> busca todos pokemons
		// pokemon?limit=X  -> busca todos com um numero limite
		// pokemon/nome 	-> busca um pokemon específico
		axios.get("https://pokeapi.co/api/v2/pokemon?limit=500")
		.then(response => { // Será executado quando a requisição terminar
			console.log("Requisição bem sucedida!");
			setPokemons(response.data.results);
      console.log(response)
		})
		.catch(response => { // É executado quando dá erro na requisição
			console.log("Deu ruim na requisição");
			console.log(response);
		}) 
	}
	React.useEffect(()=>{
		buscaTodosPokemons();
	}, [])

  function mostrarPk(url) {
    setPokSelecionado(url)
  }
 
  return (
    <div className='pai'>
      <div className='status'>
        
          <div className='pesquisa'>
            <input onChange={(e)=>setTxtPokemon(e.target.value)} placeholder="Pesquise Um Pokémon"/>
            <button onClick={()=>buscaPokemon()}><i className="fa-solid fa-magnifying-glass"></i></button>
          </div>

          {pokemonSelecionado ? (<div className='propriedades'>
            <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/"+(1)+".gif"}/>

          </div>) : null}
        
      </div>

        <ToastContainer
          position="top-right"
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

        <div className="procura">
          <h1>PokéDex</h1>
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
                <div className="pkmon" key={id} onClick={()=>mostrarPk(pokemon.url)}>
                  <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/"+(id)+".gif"}/>
                  <p>{pokemon.name}</p>
                  <p>N°</p>
                </div>
              )
            }
              
            )
          }
          </div>
    </div>
  );
}

export default App;