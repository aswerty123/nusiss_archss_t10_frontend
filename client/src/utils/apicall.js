import api from 'axios';

api.defaults.baseURL = 'http://localhost:90/';

const setHeader = () => {
  const authDataString = localStorage.getItem('authData');
  const authData = JSON.parse(authDataString);
  if (authData) {
    api.defaults.headers.common['Authorization'] = `Bearer ${authData.token}`;
  }
};

export const SetAuthToken = async (token) => {
  if (token) {
    const jsonString = JSON.stringify(token);
    localStorage.setItem('authData', jsonString);
  } else {
    localStorage.clear();
  }
};

export const GetData = async (endPoint, options) => {
  try {
    setHeader();
    const response = await api.get(endPoint);
    return response;
  } catch (err) {
    throw err;
  }
};

export const PostData = async (endPoint, options) => {
  try {
    setHeader();
    const response = await api.post(endPoint, options);
    return response;
  } catch (err) {
    throw err;
  }
};

export const PutData = async (endPoint, options) => {
  try {
    setHeader();
    const response = await api.put(endPoint, options);
    return response;
  } catch (err) {
    throw err;
  }
};

export const DeleteData = async (endPoint) => {
  try {
    setHeader();
    const response = await api.delete(endPoint);
    return response;
  } catch (err) {
    throw err;
  }
};
