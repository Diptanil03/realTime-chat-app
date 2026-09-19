import axios from "axios"; 

const baseurl=import.meta.env.VITE_URL

const axiosInstance = axios.create({
  baseURL : baseurl,
  withCredentials:true,
    headers: {
//  Authorization: `<Your Auth Token>`,
    ContentType: "application/json",
  },
  // .. other options
});

export default axiosInstance;