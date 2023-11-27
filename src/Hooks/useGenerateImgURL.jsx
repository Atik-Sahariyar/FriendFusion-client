import { useEffect, useState } from "react";
import axios from "axios";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const useGenerateImgURL = async(imageFiile) => {
    console.log(imageFiile);
    const [ imgURL, setImgURL ] = useState();
    const [ loading , setLoading ] = useState(true)
   useEffect(() => {
    const imageURL = async() =>{ 
        if(imageFiile){
            const res = await axios.post(image_hosting_api, imageFiile, {   
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });    
            if(res?.data?.data?.display_url){
                setImgURL( res?.data?.data?.display_url)
                setLoading(false)
            }
        }    
     
        
    }
    imageURL();

   }, [imageFiile])

  
   console.log(imgURL);
    return {imgURL, loading};
  
};

export default useGenerateImgURL;