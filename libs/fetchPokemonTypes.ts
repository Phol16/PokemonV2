export const fetchPokemonTypes = async()=>{
  const res = await fetch(`https://pokeapi.co/api/v2/type`).then((res)=>res.json())
  return res.results
}