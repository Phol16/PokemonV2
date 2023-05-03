export const fetchPokemon = async (offset:number) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`).then((res)=>res.json());
    return res
  } catch (error) {
    console.log(error)
  }
}