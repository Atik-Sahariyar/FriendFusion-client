import { useForm } from "react-hook-form";
import useSearch from "../../../Hooks/useSearch";

const Banner = () => {
   const { setSearchTag } = useSearch();    
   const { register, handleSubmit, reset } = useForm()

  const handleSearchClick = async(data) => {
        const searchTag = data.searchTag;
        setSearchTag(searchTag)
       reset()
    };

    return (
        <div className="banner relative  mb-6">
            <img src="https://i.ibb.co/pjyKmkh/bannerBg.jpg" alt="Banner Background" className="w-full h-[50vh] opacity-20" />

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                <h1 className="text-2xl lg:text-4xl text-gray-600 font-bold mb-4">Welcome to the FriendFusion Forum!</h1>
                <form onSubmit={handleSubmit(handleSearchClick)} className="flex space-x-4">
                    <input
                        type="text"
                        {...register('searchTag')}
                        placeholder="Search by tags"
                        className="text-black rounded-l-md px-4 py-2 flex-1"
                    />
                    <input type="submit" value='search' className="bg-blue-500 text-white px-4 py-2 rounded-r-md"/>
                </form>
            </div>
        </div>
    );
};

export default Banner;
