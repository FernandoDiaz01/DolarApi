import React from 'react'
import axios from 'axios'
import './DolarBlue.css'
import { useEffect, useState } from 'react'

export const DolarBlue = () => {
    const [compraDolarBlue, setCompraDolarBlue] = useState(null)
    const [ventaDolarBlue, setVentaDolarBlue] = useState(null)
    const [ isLoading, setIsLoading] = useState(true)


    const apiDolarBlue = async ()=>{
      try {
        const urlApi = 'https://dolarapi.com/v1/dolares/blue'
        

        const response = await axios.get(urlApi)
        console.log(response.data)
  
        
  
          setCompraDolarBlue(response.data.compra)
        setVentaDolarBlue(response.data.venta) 
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
          
          <div className='container-infoDolar'>
            <h2 className='infoDolar'>Compra: {compraDolarBlue}</h2>
            <h2 className='infoDolar'>Venta: {ventaDolarBlue}</h2>
          </div>
        )}

      </div>
    
    </>
   
  )
}
