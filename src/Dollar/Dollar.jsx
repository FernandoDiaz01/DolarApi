import { useState, useEffect } from 'react';
import { getAllDollars } from '../middleware/dollar';
import './Dollar.css'

export const Dollar = () => {
    const [dollarData, setDollarData] = useState([]);

    const formatDate = (date) => {
        const format = new Date(date);
        return format.toLocaleString();
    };

    useEffect(() => {
        const dollarApi = async () => {
            try {
                const data = await getAllDollars();
                setDollarData(data);
                
            } catch (error) {
                console.log(error);
            }
        };

        dollarApi();
        const intervalRender = setInterval(dollarApi, 600000);

        return () => clearInterval(intervalRender);
    }, []);

    return (
        <>
            <div className="title-dollar-container">
                <h1 className='title-dollar'>COTIZACIONES DEL DOLAR</h1>
            </div>
            <div className='main-container'>
                {dollarData.map((d, index) => {
                    const { nombre, compra, venta, fechaActualizacion } = d.data || {};
                    return (
                        <>
                         <div className="dollar-container" key={index}>
                            {d.data ? (
                                <>
                                    <div className="name-container">
                                        <h2 className='name'>{nombre}</h2>
                                    </div>
                                    <div className="info-dollar">
                                        <h3>Compra: ${compra}</h3>
                                        <h3>Venta: ${venta}</h3>
                                    </div>
                                    <div className="date-dollar-container">
                                        <h4>Fecha de Actualización: {formatDate(fechaActualizacion)}</h4>
                                    </div>
                                </>
                            ) : (
                                <div className="error-container">
                                    <h3>Error al obtener los datos</h3>
                                </div>
                            )}
                        </div>
                        </>
                       
                    );
                })}
                 
            </div>
        </>
    );
};
