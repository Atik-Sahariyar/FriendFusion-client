import { useEffect, useState } from "react";
import axios from "axios";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const useGenerateImgURL = async(imageFiile) => {
    const [ imgURL, setImgURL ] = useState();
   
   useEffect(() => {
    const imageURL = async() =>{      
        const res = await axios.post(image_hosting_api, imageFiile, {   
            headers: {
                'content-type': 'multipart/form-data'
            }
        });        
        setImgURL( res?.data?.data?.display_url)
    }
    imageURL();

   }, [imageFiile])

  

  
    return imgURL;
  
};

export default useGenerateImgURL;