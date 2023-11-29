import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUsers = (currentPage) => {
    console.log('current page: ', currentPage);
    const axiosSecure = useAxiosSecure();

    const { data: result = [], isPending : userLoading, refetch: userRefetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?page=${currentPage}&limit=10`);
            return res.data;
        }
    })
    
    const users = result?.result;
    const totalUser = result?.totalUser;

    return { users, totalUser, userLoading ,userRefetch }
};

export default useUsers;