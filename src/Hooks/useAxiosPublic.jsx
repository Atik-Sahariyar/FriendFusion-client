import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "http://localhost:5000"
    // baseURL: "https://bistro-boss-restaurant-server-beryl.vercel.app"
})
const useAxiosPublic = () => {

    return axiosPublic
};

export default useAxiosPublic;