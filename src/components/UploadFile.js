import axios from "axios";
export const handleImageUpload = async (img) => {

  try {
    const formData = new FormData();
    formData.append('my_file', img);
    const response = await axios.post('http://localhost:5000/upload', formData);
    return response.data.secure_url;
  } catch (error) {
    console.error(error);
  }
};