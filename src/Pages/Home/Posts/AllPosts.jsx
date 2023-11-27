import { useState } from 'react';
import Post from './Post';
import usePosts from '../../../Hooks/usePosts';

const AllPosts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedPosts, setSortedPosts] = useState(false);
  const { postsData, refetch, loading } = usePosts(currentPage, 5);

  console.log(postsData);
  if(loading ){
    console.log(loading);
    return <p className=' text-center'>Loading....</p>
  }
  console.log(loading);
  const totalPost = postsData?.totalPosts || 0;
  const pageNumbers = Array.from({ length: Math.ceil(totalPost / 5) }, (_, index) => index + 1);
  console.log(' page number: ',pageNumbers);
  console.log(totalPost);

    const handlePagination = pageNumber => {
      setCurrentPage(pageNumber);
    };

    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage((prevPage) => prevPage - 1);
      }
    };
  
    const handleNextPage = () => {
      if (currentPage < Math.ceil(totalPost / 5)) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };
  // sort by popularity button
  const handleSortByPopularity = () => {
    setSortedPosts(!sortedPosts)
  }
  console.log("new post:  ",postsData?.posts);
  console.log('populare: ', postsData?.popularPosts);
  return (
    <div className="container mx-auto py-8">
      <div className=' flex justify-center'>
        <button onClick={() => handleSortByPopularity(!sortedPosts)} className=' px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-700'>{ sortedPosts ? 'Sort by new post': 'Sort By Popularity'}</button>
      </div>
      <div className="grid gap-4">
        {
          sortedPosts ?
            <span>
              {postsData?.popularPosts?.map(post => <Post key={post._id} post={post} refetch={refetch}></Post>)}
            </span>
            :
            <span>
              {postsData?.posts?.map(post => <Post key={post._id} post={post} refetch={refetch}></Post>)}
            </span>
        }
      </div>
      <div className="flex justify-center mt-4">
      <button onClick={handlePrevPage} className="mx-1 px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-700">
          Prev
        </button>
        { pageNumbers.map((_, index) => (
          <button
            key={index}
            onClick={() => handlePagination(index + 1)}
            className={`mx-1 px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-700 ${
              currentPage === index + 1 ? 'bg-blue-700' : ''
            }`}
          >
            {index + 1}
          </button>
        ))}
          <button onClick={handleNextPage} className="mx-1 px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-700">
          Next
        </button>
      </div>
    </div>
  );
};

export default AllPosts;
