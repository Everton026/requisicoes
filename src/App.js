import { ToastContainer, toast } from "react-toastify";
import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [txtPokemon, setTxtPokemon] = useState("");
  const [pokemonSelecionado, setPokSelecionado] = useState(null);
  const [tiposPokemon, setTiposPokemon] = useState([]);
  const [tipoBackground, setTipoBackground] = useState("");
  const [isHovered, setIsHovered] = useState(null)

  const tipoCor = {
    normal: "normal",
    fire: "fogo",
    water: "agua",
    grass: "grama",
    flying: "voador",
    fighting: "lutador",
    poison: "veneno",
    eletric: "eletrico",
    ground: "terra",
    rock: "pedra",
    psychic: "psiquico",
    ice: "gelo",
    bug: "inseto",
    ghost: "fantasma",
    steel: "ferro",
    dragon: "dragao",
    dark: "sombrio",
    fairy: "fada",
  };

  function buscaPokemon() {
    if (!txtPokemon.trim()) {
      toast("Digite o Nome de um Pokémon!");
      buscaTodosPokemons();
      setPokSelecionado(null);
      return;
    }
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${txtPokemon}`)
      .then((resposta) => {
        const tipos = resposta.data.types.map((tipo) => tipo.type.name);
        setPokSelecionado(resposta.data);
        setTiposPokemon(tipos);
        setPokemons([resposta.data]);
        toast("✔ Pokemon Encontrado!");
      })
      .catch((resposta) => {
        toast("❌ Pokémon Não Encontrado!");
        setTiposPokemon([]);
      });
  }

  function buscaPropriedades(url) {
    axios
      .get(url)
      .then((response) => {
        console.log("Requisição bem sucedida!", response.data);
        const tipos = response.data.types.map((tipo) => tipo.type.name);

        const tiposBackground = {};
        tipos.forEach((tipo) => {
          if (tipoCor[tipo]) {
            tiposBackground[tipo] = tipoCor[tipo];
          }
        });

        setTiposPokemon(tipos);
        setTipoBackground(tiposBackground);
      })
      .catch((error) => {
        console.log("Deu ruim na requisição", error);
        setTiposPokemon([]);
      });
  }

  function buscaTodosPokemons() {
    // pokemon 			-> busca todos pokemons
    // pokemon?limit=X  -> busca todos com um numero limite
    // pokemon/nome 	-> busca um pokemon específico
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=25")
      .then((response) => {
        // Será executado quando a requisição terminar
        console.log("Requisição bem sucedida!");
        setPokemons(response.data.results);
        console.log(response);
      })
      .catch((response) => {
        // É executado quando dá erro na requisição
        console.log("Deu ruim na requisição");
        console.log(response);
      });
  }

  React.useEffect(() => {
    buscaTodosPokemons();
  }, []);

  function mostrarPk(url) {
    setPokSelecionado(url);
    buscaPropriedades(url);
  }

  function buscaPokemonsSelecionado() {
    if (!pokemonSelecionado) return;
    axios
      .get(pokemonSelecionado)
      .then((response) => {
        console.log("Requisição bem sucedida!", response.data);
        setPokSelecionado(response.data);
      })
      .catch((response) => {
        console.log("Deu ruim na requisição");
        console.log(response);
      });
  }

  React.useEffect(() => {
    buscaPokemonsSelecionado();
  }, [buscaPokemonsSelecionado]);

  return (
    <div className="pai">
      <div className="status">
        {pokemonSelecionado ? (
          <div className="propriedades">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonSelecionado.id}.gif`}
              alt={pokemonSelecionado.name}
            />
            <h1>{pokemonSelecionado.name}</h1>
            <h2>N° {pokemonSelecionado.id}</h2>
            <ul className="tipos">
              {tiposPokemon.map((tipo, index) => (
                <p key={index} className={`tipo ${tipo} texto-redondo`}>
                  {tipo}
                </p>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      <div className="procura">
        <div className="pesquisa">
          <input
            onChange={(e) => setTxtPokemon(e.target.value)}
            placeholder="Pesquise Por Um Pokémon"
          />
          <button onClick={() => buscaPokemon()}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div className="resultado">
          {pokemons.map((pokemon, index) => {
            let id;
            if (pokemon.url) {
              const PokemonURL = "https://pokeapi.co/api/v2/pokemon/";
              id = pokemon.url.replace(PokemonURL, "").replace("/", "");
            } else {
              id = pokemon.id;
            }

            axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((response) => {
              const tipos = response.data.types.map((tipo) => tipo.type.name);
            })
            .catch((error) => {
              console.error("Erro ao buscar informações do Pokémon:", error);
            });
            return (
              <div className="pkmon" key={id} onClick={() => mostrarPk(pokemon.url)}>
                <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + id + ".png"}/>
                <p>{pokemon.name}</p>
                <p>N°{id}</p>
                <p></p>
              </div>
            );
          })}
        </div>
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

    </div>
  );
}

export default App;
