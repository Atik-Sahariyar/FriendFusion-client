
// import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const Banner = () => {
    // const axiosPublic = useAxiosPublic()


    // const handleSearchClick = (searchTerm) => {
    //     // Implement logic to handle clicks on recent search terms
    //     console.log(`Clicked on search term: ${searchTerm}`);
    // };

    return (
        <div className="banner relative  mb-6">
            <img src="https://i.ibb.co/pjyKmkh/bannerBg.jpg" alt="Banner Background" className="w-full h-[50vh] opacity-20" />

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                <h1 className="text-2xl lg:text-4xl text-gray-600 font-bold mb-4">Welcome to the FriendFusion Forum!</h1>
                <div className="flex space-x-4">
                    <input
                        type="text"
                        placeholder="Search by tags"
                        className="bg-white rounded-l-md px-4 py-2 flex-1"
                    />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md">Search</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;
