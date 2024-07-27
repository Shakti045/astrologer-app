import axios from "axios";

const BASE_URL = 'https://astrologer-app-backend.onrender.com/api/v1';

export const createAstrologer = async (astrologer: Astrologer & {isCreate:boolean}) => {
    try {
        const response = await axios.post(`${BASE_URL}/astrologer/create`, astrologer);
        if(response.status === 200){
            return true;
        }else{
            throw new Error('Something went wrong');
        }
    } catch (error) {
        throw new Error('Something went wrong');
    }
}



export const fetchAstrologers = async (page:number,limit:number,filters:FilterProps) => {
    try {
        const response = await axios.post(`${BASE_URL}/getAstrologers?page=${page}&limit=${limit}`,{filters:filters});
        if(response.status === 200){
            return response.data;
        }else{
            throw new Error('Something went wrong');
        }
    } catch (error) {
        throw new Error('Something went wrong');
    }
}

export const getFullDetailsofAstrologer = async (id:string) => {
    try {
        const response = await axios.get(`${BASE_URL}/astrologer/${id}`);
        if(response.status === 200){
            return response.data;
        }else{
            throw new Error('Something went wrong');
        }
    } catch (error) {
        throw new Error('Something went wrong');
    }
}

export const deleteAstrologer = async (id:string) => {
    try {
        const response = await axios.delete(`${BASE_URL}/astrologer/${id}`);
        if(response.status === 200){
            return true;
        }else{
            throw new Error('Something went wrong');
        }
    } catch (error) {
        throw new Error('Something went wrong');
    }
}


export const updateAstrologer = async (astrologer: Astrologer ,id:string) => {
    try {
        const response = await axios.put(`${BASE_URL}/astrologer/${id}`, astrologer);
        if(response.status === 200){
            return true;
        }else{
            throw new Error('Something went wrong');
        }
    } catch (error) {
        throw new Error('Something went wrong');
    }
}


export const searchAstrologers = async (query:string) => {
    try {
        const response = await axios.get(`${BASE_URL}/astrologer/search/${query}`);
        if(response.status === 200){
            return response.data;
        }else{
            throw new Error('Something went wrong');
        }
    } catch (error) {
        throw new Error('Something went wrong');
    }
}