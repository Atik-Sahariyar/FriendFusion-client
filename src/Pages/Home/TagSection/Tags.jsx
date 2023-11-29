import useSearch from "../../../Hooks/useSearch";

const Tags = () => {
    const {setSearchTag } = useSearch()
    const tags = [ 'education', 'programming', 'cybersecurity', 'webDevelopment', 'general', 'softwareDevelopment', 'webDesgin' , 'computer', 'technology']
    return (
      <div className=" bg-blue-200 my-5 py-10">
         <h3 className=" text-center mb-5 text-3xl font-bold">Explore by tags</h3>
         <div className=" flex justify-center">
         <div className="  grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {
                tags?.map(tag => <div key={tag}>
                    <button onClick={() => setSearchTag(tag)} className=" bg-gray-100 text-blue-600 py-1 px-2 rounded-md"> #{ tag }</button>
                </div>)
            }
        </div>
         </div>
      </div>
    );
};

export default Tags;