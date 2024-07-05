import axios from 'axios';
import { useState } from 'react';
const useImgupload = (img) =>{
    const [imgmessage, setImgMessage] = useState('');
    const [imgloading, setImgLoading] = useState(false);

    const hendleImageUpload = async () =>{
        try {
            if(!img){
                setImgMessage('Please upload img file');
                return;
            }
           
            setImgLoading(true);
            const formData = new FormData();
            formData.append('my_file', img);
            const response = await axios.post('https://hospital-mangment.onrender.com/upload', formData);
            setImgLoading(false);
            return response.data.secure_url;

        } catch (error) {
            console.error(error);
        }
    }

  return {imgmessage, imgloading, hendleImageUpload}
}
export default useImgupload;