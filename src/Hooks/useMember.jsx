import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useMember = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    
    const { data: isMember, isPending: isMemberLoading } = useQuery({
        queryKey: [user?.email, 'isMember'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/member/${user?.email}`)
            console.log(res.data);
            return res.data;
        }
    }) 
  

    return {isMember, isMemberLoading}
};

export default useMember;