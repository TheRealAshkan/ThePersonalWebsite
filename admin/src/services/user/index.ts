
import { getCookie } from 'cookies-next';
import {api} from '../api';

export const getUserInfo = () => api.get('/auth/logged');
// export const getUsers = async () => await api.get('/user?page=1&limit=20');



export const getUsers = async (page: number = 1, limit:number = 20) => {
    try {
        const res = await api.get(`/user?page=${page}&limit=${limit}`)
        return res;
    } catch (err) {
        // console.log(err)
    }
};


export const getUser = async (id:number) => {
    try {
        const res = await api.get(`/user/${id}`)
        return res;
    } catch (err) {
        // console.log(err)
    }
};