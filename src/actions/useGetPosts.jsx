import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../mock/data';

function useGetPosts() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/posts/`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        setError(error);
      });

  }, []);

  return { data, error };
}

export default useGetPosts;
