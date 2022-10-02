import React, {useContext} from 'react'
import CategoriasContext from '../context/CategoriasProvider'

const useCategorias = () => {
  return (
    useContext(CategoriasContext)
  )
}

export default useCategorias
