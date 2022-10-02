import React from 'react'
import { Row } from 'react-bootstrap'
import useBebidas from '../hooks/useBebidas'
import Bebida from './Bebida'


const ListadoBebidas = () => {

    const { bebidas } = useBebidas()
  return (
    <Row className='mt-4'>
      {bebidas.map( (bebida)=>(
          <Bebida 
            key={bebida.idDrink}
            bebida={bebida}
          ></Bebida>
      ))}
    </Row>
  )
}

export default ListadoBebidas
