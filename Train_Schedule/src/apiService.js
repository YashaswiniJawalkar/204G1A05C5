import axios from 'axios';

const BASE_URL = 'http://20.244.56.144/train';

// Function to register your company and obtain the authentication token
export const registerCompany = async (registrationData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, registrationData);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error('Company registration failed');
  }
};

// Function to obtain the authorization token
export const getAuthorizationToken = async (authData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth`, authData);
    if (response.status === 200) {
      return response.data.access_token;
    }
  } catch (error) {
    throw new Error('Authorization failed');
  }
};

// Function to fetch all train details
export const fetchAllTrains = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/trains`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch train details');
  }
};

// Function to fetch details of a specific train
export const fetchSingleTrain = async (trainNumber, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/trains/${trainNumber}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch single train details');
  }
};