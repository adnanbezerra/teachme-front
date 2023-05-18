import { useState } from 'react';
import axios from 'axios';
import { BASE_URL, notifyFailure } from '../mock/data';

function useSearchPosts() {
  const [data, setData] = useState([{}]);

  function searches(search) {
    axios.get(`${BASE_URL}/post/name/${search}`)
      .then(response => {
        if (response.data.length === 0) {
          notifyFailure("Não encontramos o resultado solicitado!");
        } else {
          setData([...response.data])
        }
      })
      .catch(error => {
        notifyFailure("Erro não identificado. Contate o administrador")
        console.error(error);

      })

      return data;
    }

  return searches;
}

export default useSearchPosts;
