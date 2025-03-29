import axios from 'axios';
import { useAuthContext } from './useAuthContext';
import { useErrorContext } from './useErrorContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const useAxiosInterceptor = () => {
  const { dispatch } = useAuthContext();
  const { errorDispatch } = useErrorContext();
  const navigate = useNavigate();

  useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          dispatch({ type: 'LOGOUT' });
          errorDispatch({ type: 'ERROR', payload: 'Session expired. Please log in again.' });
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [dispatch, errorDispatch, navigate]);
};

export default useAxiosInterceptor;
