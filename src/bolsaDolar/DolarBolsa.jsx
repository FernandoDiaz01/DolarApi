import React from "react";
import "./DolarBolsa.css";
import axios from "axios";
import { useEffect, useState } from "react";

export const DolarBolsa = () => {
  const [compraDolarBolsa, setCompraDolarBolsa] = useState(null);
  const [ventaDolarBolsa, setVentaDolarBolsa] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const apiDolarBolsa = async () => {
    try {
      const urlApi = "https://dolarapi.com/v1/dolares/bolsa";

      const response = await axios.get(urlApi);

      setCompraDolarBolsa(response.data.compra);
      setVentaDolarBolsa(response.data.venta);
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
        <h1 className="title-dolar-mep">Cotización del Dólar MEP</h1>
        {isLoading ? (
          <p>Cargando datos...</p>
        ) : (
          <div className="container-infoDolar">
            <h2 className="infoDolar">Compra: {compraDolarBolsa}</h2>
            <h2 className="infoDolar">Venta: {ventaDolarBolsa}</h2>
          </div>
        )}
  
    </div>
     
    </>
  );
};
