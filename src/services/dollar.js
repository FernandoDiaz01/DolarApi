import axios from "axios"
import { URL } from "../utils/constants"
const {URL_BLUE, URL_BOLSA, URL_OFICIAL} = URL


export const getDollarBlue = async () => {

    const response = await axios.get(URL_BLUE)
    
    return response.data
    
    
} 


export const getDollarBolsa = async () => {

    const response = await axios.get(URL_BOLSA)
    return response.data
    
} 


export const getDollarOficial = async () => {

    const response = await axios.get(URL_OFICIAL)
    return response.data
    
} 