import axios from 'axios';

export const baseURL = (!process.env.NODE_ENV || process.env.NODE_ENV === "development") 
						? process.env.REACT_APP_API_DEV 
						: process.env.REACT_APP_API_PROD;

const api = axios.create({
	baseURL
});

export default api;