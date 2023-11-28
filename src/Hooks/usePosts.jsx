import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePosts = (page , limit = 5) => {
    const axiosPublic = useAxiosPublic();

    const { data: postsData, isPending: loading, refetch } = useQuery({
        queryKey: ['post', page, limit], // Include page and limit in the query key
        queryFn: async() => {
            const res = await axiosPublic.get(`/posts?page=${page}&limit=${limit}`);
            return res?.data;
        }
    })
    return { postsData, refetch, loading };
};

export default usePosts;
