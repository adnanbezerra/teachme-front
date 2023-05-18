import axios from 'axios';
import { BASE_URL, notifyFailure } from '../mock/data';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';

function useGetUserInfo() {
  const { setUser } = useContext(UserContext);

  function getUserInfo(token) {
    axios.get(`${BASE_URL}/user/me`, token)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        notifyFailure("Erro ao coletar as suas informações!")
        console.error(error);
      })

  }

  return getUserInfo;
}

export default useGetUserInfo;
