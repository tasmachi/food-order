import { useState, useCallback } from "react";

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [didSubmit,setDidSubmit]=useState(false)

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    setDidSubmit(false)

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
      });

      if (!response.ok) throw new Error("Couldn't connect to server, Please check your internet connection.");

      const data = await response.json();
      applyData(data);
    } catch (error) {
      setError(
        error.message || "Something went wrong, check your internet connection."
      );
    } finally {
      setIsLoading(false);
      setDidSubmit(true)
    }
  }, []);

  return { isLoading, error, sendRequest,didSubmit };
};

export default useFetch;
