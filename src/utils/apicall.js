import api from 'axios';

 
api.defaults.baseURL = "http://nusissarchsst10testdeploy1-env.eba-2hb3hjjv.ap-southeast-2.elasticbeanstalk.com/";

const setHeader = () => {
    const token = localStorage.getItem('token');
    if(token){
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
}

export const GetData = async(endPoint,options) => {
  try {
    setHeader();
    const response = await api.get(endPoint);
    return response
  } catch (err) {
      throw err;
  }
    
}

export const PostData = async(endPoint,options) => {
  try {
    setHeader();
    const response = await api.post(endPoint, options);
    return response
  } catch (err) {
      throw err;
  }  
}

export const PutData = async(endPoint,options) => {

  try {
    setHeader();
    const response = await api.put(endPoint, options);
    return response
  } catch (err) {
      throw err;
  }  
}

export const DeleteData = async(endPoint) => {

  try {
    setHeader();
    const response = await api.delete(endPoint);
    return response
  } catch (err) {
      throw err;
  }  
}