import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useComments = (postId) => {
    const axiosSecure = useAxiosSecure();
    const { data: comments, isPending: commentsLoading,  refetch: commentRefetch  } = useQuery({
        queryKey: ['postId',postId],
        queryFn: async() =>{
            const res = await axiosSecure.get(`/comments/${postId}`);
            console.log(res?.data);
            return res?.data
        }
    })
    return {comments, commentsLoading, commentRefetch};
};

export default useComments;