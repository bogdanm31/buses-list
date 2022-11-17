import { useCallback, useState } from "react";
import { apiClient } from "../services/apiClient";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const httpRequest = useCallback(async (payload: {}, callbackFn: Function) => {
    setIsLoading(true);
    setError(null);
    try {
      const response:any = await apiClient.post('', payload);

      if (response.status !== 200) {
        throw new Error('Request failed!');
      }
  
      let data;
      try {
        data = await response.json();
      } catch (err: any) {
        data = response.data;
        while(data.data) {
          data = data.data;
        }
      }
      callbackFn(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, []);
  
  return {
    httpRequest,
    isLoading,
    error
  };
};

export default useHttp;