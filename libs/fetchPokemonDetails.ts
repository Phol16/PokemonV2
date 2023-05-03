import React from 'react'

export const fetchPokemonDetails = async(url:string) => {
  try {
    const res = await fetch(`${url}`).then((res)=>res.json());
    return res
  } catch (error) {
    console.log(error)
  }
}