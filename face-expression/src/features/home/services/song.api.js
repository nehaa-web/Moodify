import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:3000",
    withCredentials : true
})

export async function getSong ({ mood }){

    const respone = await api.get("/api/song?mood=" + mood)

    return respone.data
}