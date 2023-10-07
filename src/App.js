import { ToastContainer, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [txtPokemon, setTxtPokemon] = useState("");
  const [pokemonSelecionado, setPokSelecionado] = useState(null);
  const [tiposPokemon, setTiposPokemon] = useState([]);
  const [tipoBackground, setTipoBackground] = useState("");

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

        const tiposBackground = {};
        tipos.forEach((tipo) => {
          if (tipoCor[tipo]) {
            tiposBackground[tipo] = tipoCor[tipo];
          }
        });

        const body = document.body;
        body.classList.remove(
          "bg-normal",
          "bg-fire",
          "bg-water",
          "bg-grass",
          "bg-flying",
          "bg-fighting",
          "bg-poison",
          "bg-electric",
          "bg-ground",
          "bg-rock",
          "bg-psychic",
          "bg-ice",
          "bg-bug",
          "bg-ghost",
          "bg-steel",
          "bg-dragon",
          "bg-dark",
          "bg-fairy"
        );

        if (tipos.includes("normal")) {
          body.classList.add("bg-normal");
        } else if (tipos.includes("fire")) {
          body.classList.add("bg-fire");
        } else if (tipos.includes("water")) {
          body.classList.add("bg-water");
        } else if (tipos.includes("grass")) {
          body.classList.add("bg-grass");
        } else if (tipos.includes("flying")) {
          body.classList.add("bg-flying");
        } else if (tipos.includes("fighting")) {
          body.classList.add("bg-fighting");
        } else if (tipos.includes("poison")) {
          body.classList.add("bg-poison");
        } else if (tipos.includes("electric")) {
          body.classList.add("bg-electric");
        } else if (tipos.includes("ground")) {
          body.classList.add("bg-ground");
        } else if (tipos.includes("rock")) {
          body.classList.add("bg-rock");
        } else if (tipos.includes("psychic")) {
          body.classList.add("bg-psychic");
        } else if (tipos.includes("ice")) {
          body.classList.add("bg-ice");
        } else if (tipos.includes("bug")) {
          body.classList.add("bg-bug");
        } else if (tipos.includes("ghost")) {
          body.classList.add("bg-ghost");
        } else if (tipos.includes("steel")) {
          body.classList.add("bg-steel");
        } else if (tipos.includes("dragon")) {
          body.classList.add("bg-dragon");
        } else if (tipos.includes("dark")) {
          body.classList.add("bg-dark");
        } else if (tipos.includes("fairy")) {
          body.classList.add("bg-fairy");
        }
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
  
        // Agora, após atualizar o estado tiposPokemon, atualize o background do corpo
        const body = document.body;
        body.classList.remove(
          "bg-normal",
          "bg-fire",
          "bg-water",
          "bg-grass",
          "bg-flying",
          "bg-fighting",
          "bg-poison",
          "bg-electric",
          "bg-ground",
          "bg-rock",
          "bg-psychic",
          "bg-ice",
          "bg-bug",
          "bg-ghost",
          "bg-steel",
          "bg-dragon",
          "bg-dark",
          "bg-fairy"
        );
  
        if (tipos.includes("normal")) {
          body.classList.add("bg-normal");
        } else if (tipos.includes("fire")) {
          body.classList.add("bg-fire");
        } else if (tipos.includes("water")) {
          body.classList.add("bg-water");
        } else if (tipos.includes("grass")) {
          body.classList.add("bg-grass");
        } else if (tipos.includes("flying")) {
          body.classList.add("bg-flying");
        } else if (tipos.includes("fighting")) {
          body.classList.add("bg-fighting");
        } else if (tipos.includes("poison")) {
          body.classList.add("bg-poison");
        } else if (tipos.includes("electric")) {
          body.classList.add("bg-electric");
        } else if (tipos.includes("ground")) {
          body.classList.add("bg-ground");
        } else if (tipos.includes("rock")) {
          body.classList.add("bg-rock");
        } else if (tipos.includes("psychic")) {
          body.classList.add("bg-psychic");
        } else if (tipos.includes("ice")) {
          body.classList.add("bg-ice");
        } else if (tipos.includes("bug")) {
          body.classList.add("bg-bug");
        } else if (tipos.includes("ghost")) {
          body.classList.add("bg-ghost");
        } else if (tipos.includes("steel")) {
          body.classList.add("bg-steel");
        } else if (tipos.includes("dragon")) {
          body.classList.add("bg-dragon");
        } else if (tipos.includes("dark")) {
          body.classList.add("bg-dark");
        } else if (tipos.includes("fairy")) {
          body.classList.add("bg-fairy");
        }
      })
      .catch((error) => {
        console.log("Deu ruim na requisição", error);
        setTiposPokemon([]);
      });
  }

  function buscaTodosPokemons() {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=25")
      .then((response) => {
        //console.log("Requisição bem sucedida!");
        setPokemons(response.data.results);
        //console.log(response);
      })
      .catch((response) => {
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


  React.useEffect(() => {
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
  }, [pokemonSelecionado]);

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
            return (
              <div
                className="pkmon"
                key={id}
                onClick={() => mostrarPk(pokemon.url)}
              >
                <img
                  src={
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                    id +
                    ".png"
                  }
                />
                <p>{pokemon.name}</p>
                <p>N°{id}</p>
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
