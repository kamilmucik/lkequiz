import { useEffect } from 'react';
import { BASE_API_URL } from '../config';

const useFetchedData = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const abortController = new AbortController();
  
      const fetchData = async () => {
        try {
          const response = await fetch(BASE_API_URL, {
            signal: abortController.signal,
          });
  
          const json = await response.json();
          setData(json);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
  
      return () => {
        abortController.abort();
      };
    }, []);
  
    return { data, error, loading };
  };
  