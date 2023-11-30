import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "http://localhost:5000"
    // baseURL: "https://friend-fusion-server.vercel.app"
})

const useAxiosPublic = () => {

    return axiosPublic
};

export default useAxiosPublic;