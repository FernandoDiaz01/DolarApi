import axios from 'axios'
import './DolarBlue.css'
import { useEffect, useState } from 'react'

export const DolarBlue = () => {
    const [compraDolarBlue, setCompraDolarBlue] = useState(null)
    const [ventaDolarBlue, setVentaDolarBlue] = useState(null)
    const [ isLoading, setIsLoading] = useState(true)
    const [fechaActualizacion, setFechaActualizacion] = useState(null);
    const [fechaActualizacionFormateada, setFechaActualizacionFormateada] = useState(null);


    const apiDolarBlue = async ()=>{
      try {
        const urlApi = 'https://dolarapi.com/v1/dolares/blue'
        

        const response = await axios.get(urlApi)
        console.log(response.data)
  
        
  
          setCompraDolarBlue(response.data.compra)
        setVentaDolarBlue(response.data.venta) 
        setFechaActualizacion(response.data.fechaActualizacion)

        const fechaFormateada = new Date(response.data.fechaActualizacion).toLocaleString()
        setFechaActualizacionFormateada(fechaFormateada)
        setIsLoading(false); 
      } catch (error) {
        console.log('Error en la petición', error)
        setIsLoading(false);
      }
    
     
    }
  


    useEffect(() => {
  
     const apiDolarBlueTimeout = setTimeout(()=>{
      apiDolarBlue();
     },1000)

     const interval = setInterval(apiDolarBlue, 60000)
     
     return ()=> {
      clearTimeout(apiDolarBlueTimeout)
      clearInterval(interval)
     }
    }, [])
    
  
  return(
    <>
    <div className="main-container-dolar-blue">
     <div className='title-container'>
         <h1 className='title-dolar-blue'>Cotización del Dólar Blue</h1>
     </div>
        
        {isLoading ? (
          <p>Cargando datos...</p>
        ) : (
          <>
          <div className="container-info-dolar">
          <div className="container-compra-venta">
            <h2 className="info-dolar">Compra: {compraDolarBlue}</h2>
            <h2 className="info-dolar">Venta: {ventaDolarBlue}</h2>
          </div>
        </div>
          <div className="container-fecha-actualizacion">
            <h2 className="info-fecha-actualizcion">
              Última actualización: {fechaActualizacionFormateada}
            </h2>
          </div>
          </>
        )}

      </div>
    
    </>
   
  )
}
