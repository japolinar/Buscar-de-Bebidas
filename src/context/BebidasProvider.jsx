import React, {useState, useEffect, createContext} from 'react'
import axios from 'axios'

const BebidasContext = createContext()

const BebidasProvider = ({children}) => {

    const [bebidas, setBebidas] = useState([]);
    const [modal, setModal] = useState(false);
    const [bebidaId, setBebidaId] = useState(null);
    const [receta, setReceta] = useState({});
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        const obtenerReceta = async ()=>{
            setCargando(true)
            if(!bebidaId){
                return
            }
            try {
                //https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007
                const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`
                const {data} = await axios.get(url)
                //console.log(data.drinks[0])
                setReceta(data.drinks[0])

            } catch (error) {
                console.error(error)
            }finally{
                setCargando(false)
            }
        }
        obtenerReceta()
    }, [bebidaId]);

    const consultarBebidas = async (datos) => { 
        try {
            //https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka
            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`
            const {data} = await axios.get(url)
            //console.log(data.drinks)

            setBebidas(data.drinks)
            
        } catch (error) {
            console.error(error)
        }
    }

    const handleModalClick = ()=>{
        setModal(!modal)
    }

    const hansleBebidaClick = (id)=>{
        setBebidaId(id)
    }

  return (
    <BebidasContext.Provider
        value={{
            consultarBebidas,
            bebidas,
            handleModalClick,
            modal,
            hansleBebidaClick,
            receta,
            cargando                       
        }}
    >
        {children}
    </BebidasContext.Provider>
  )
}

export {
    BebidasProvider
}

export default BebidasContext
