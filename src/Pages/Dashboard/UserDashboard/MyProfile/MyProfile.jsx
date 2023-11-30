import useAuth from '../../../../Hooks/useAuth';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
// import { useState, useEffect } from 'react';
import RecentPosts from './RecentPosts';
import useMember from '../../../../Hooks/useMember';
import { FaMedal } from 'react-icons/fa';

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isMember } = useMember();
  let { data: posts = [], isPending, refetch: reload } = useQuery({
    queryKey: [user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/myposts/${user?.email}`);
      return res?.data;
    }
  });
  console.log(' recent posts: ', posts);

  if ( isPending) {
    return <div>Loading</div>
  }

console.log(' recent posts: ', posts);
  const recentPosts = async () => {
    if (posts?.length > 3) {
      const newPosts = await posts.slice(0, 3);
      posts = newPosts
    }
  }
  recentPosts();

  // useEffect(() => {


  //   if(posts?.length > 3){
  //     const newPosts = posts.slice(0, 3);
  //     setRecentPosts(newPosts)
  //   } else {
  //     setRecentPosts(posts)
  //   }
  // }, [ isPending, posts])



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
      <div className="mb-6">
        {!isMember ? (
          <div className="flex justify-center items-center mb-2">
            <FaMedal className="text-yellow-400 mr-2" />
            <p>Bronze Badge</p>
          </div>
        ) : (
          <div className="flex justify-center items-center mb-2">
            <FaMedal className="text-yellow-600 mr-2" />
            <p>Gold Badge</p>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4 text-center">Recent Posts</h3>
        <div className="grid grid-cols-1 gap-6">
          {

            posts?.map((post) => <RecentPosts key={post._id} post={post} reload={reload}></RecentPosts >)
          }

        </div>
      </div>
    </div>
  );
};

export default MyProfile;
