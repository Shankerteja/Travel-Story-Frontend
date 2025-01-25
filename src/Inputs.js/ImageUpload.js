import axoisInstance from "../utils/axiosInstance"
const ImageUpload=async(imageFile)=>{
  const formData=new FormData()
  formData.append("image",imageFile)

  try {
    const response=await axoisInstance.post('/image-upload',formData,{
      headers:{
        "Content-Type":"multipart/form-data"
      }
    });
    return response.data;
    
  } catch (error) {
    throw error;
    
  }

}

export default ImageUpload