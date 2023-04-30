import React from 'react'

export const fetchPokemonDetails = async(url:string) => {
  const res = await fetch(`${url}`).then((res)=>res.json());
  return res
}