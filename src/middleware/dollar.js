import { getDollarBlue,getDollarBolsa,getDollarOficial } from "../services/dollar";

export const getAllDollars = async () => { 
     const response = await Promise.allSettled([getDollarBlue(), getDollarBolsa(), getDollarOficial()])
     
    const data = response.map((result) => {
        
        if (result.status === 'fulfilled') {
            
            return { data: result.value}
            
        } else {
            return { error: console.error('error')}
        }
    });

    return data;
}
  