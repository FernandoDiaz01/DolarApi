import "./DolarBolsa.css";
import axios from "axios";
import { useEffect, useState } from "react";

export const DolarBolsa = () => {
  const [compraDolarBolsa, setCompraDolarBolsa] = useState(null);
  const [ventaDolarBolsa, setVentaDolarBolsa] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fechaActualizacion, setFechaActualizacion] = useState(null);
  const [fechaActualizacionFormateada, setFechaActualizacionFormateada] = useState(null);
  

 


  const apiDolarBolsa = async () => {
    try {
      const urlApi = "https://dolarapi.com/v1/dolares/bolsa";

      const response = await axios.get(urlApi);

      setCompraDolarBolsa(response.data.compra);
      setVentaDolarBolsa(response.data.venta);
     setFechaActualizacion(response.data.fechaActualizacion)
     const fechaFormateada = new Date(response.data.fechaActualizacion).toLocaleString()
     setFechaActualizacionFormateada(fechaFormateada)
      setIsLoading(false);
    } catch (error) {
      console.log("Error en la petición", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const apiDolarBolsaTimeout = setTimeout(() => {
      apiDolarBolsa();
    }, 1000);

    const interval = setInterval(apiDolarBolsa, 600000);

    return () => {
      clearTimeout(apiDolarBolsaTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="main-container-dolar-bolsa">
      <div className='title-container'>
         <h1 className='title-dolar-blue'>Cotización del Dólar Mep</h1>
     </div>

        {isLoading ? (
          <p className="loading-data">Cargando datos...</p>
        ) : (<>
          <div className="container-info-dolar">
            <div className="container-compra-venta">
              <h2 className="info-dolar">Compra: {compraDolarBolsa}</h2>
              <h2 className="info-dolar">Venta: {ventaDolarBolsa}</h2>
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
  );
};
