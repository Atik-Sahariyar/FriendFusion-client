import useAuth from '../../../../Hooks/useAuth';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import RecentPosts from './RecentPosts';

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [ recentPosts, setRecentPosts ] = useState([]);
  const { data: posts, isPending, refetch: reload } = useQuery({
    queryKey: [user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/myposts/${user?.email}`);
      return res?.data;
    }
  });
  
   
  useEffect(() => {
    if (isPending) {
      return /*  <p className=' text-cennter text-2xl mt-16'>Loading...</p> */
    }
    if(posts?.length > 3){
      const newPosts = posts.slice(0, 3);
      setRecentPosts(newPosts)
    } else {
      setRecentPosts(posts)
    }
  }, [ isPending, posts])


  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">My Profile</h1>
      <div className="flex justify-center items-center mb-6">
        <img src={user?.photoURL} alt="User" className="w-20 h-20 rounded-full mr-4" />
        <div>
          <h2 className="text-xl font-semibold">{user?.displayName}</h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>
      {/* <div className="mb-6">
        {userProfile.badges.bronze && (
          <div className="flex justify-center items-center mb-2">
            <FaMedal className="text-yellow-400 mr-2" />
            <p>Bronze Badge</p>
          </div>
        )}
        {userProfile.badges.gold && (
          <div className="flex justify-center items-center mb-2">
            <FaMedal className="text-yellow-600 mr-2" />
            <p>Gold Badge</p>
          </div>
        )}
      </div> */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-center">Recent Posts</h3>
        <div className="grid grid-cols-1 gap-6">
          {

            recentPosts?.map((post) => <RecentPosts key={post._id} post={post} reload = {reload}></RecentPosts >)
          }

        </div>
      </div>
    </div>
  );
};

export default MyProfile;
