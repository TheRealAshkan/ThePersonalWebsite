import { api } from "../api";

export const getPortfolios = async (page: number = 1, limit:number = 20) => {
    try {
        const res = await api.get(`/portfolio?page=${page}&limit=${limit}`)
        return res;
    } catch (err) {
        // console.log(err)
    }
};


export const getPortfolio = async (id:number) => {
    try {
        const res = await api.get(`/portfolio/${id}`)
        return res;
    } catch (err) {
        // console.log(err)
    }
};