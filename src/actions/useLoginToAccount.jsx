import { useContext } from 'react';
import axios from 'axios';
import { BASE_URL, notifyFailure, notifySuccess } from '../mock/data';
import { useNavigate } from 'react-router-dom';
import UserContext from '../components/contexts/UserContext';

function getDateOneWeekFromNow() {
  const today = new Date();
  const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
  return nextWeek;
}

function useLoginToAccount() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  function login(payload) {
    axios.post(`${BASE_URL}/signin`, payload)
      .then(response => {
        document.cookie = `token=${response.data}; expires=${getDateOneWeekFromNow()}`
        notifySuccess("Login feito com sucesso!");
        setUser({ token: response.data });
        navigate('/');
      })
      .catch(error => {
        notifyFailure("Falha no login! Confira suas informações");
        console.error(error);
      })

  }

  return login;
}

export default useLoginToAccount;
