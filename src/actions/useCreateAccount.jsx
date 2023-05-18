import axios from 'axios';
import { BASE_URL, notifyFailure, notifySuccess } from '../mock/data';
import { useNavigate } from 'react-router-dom';

function useCreateAccount() {
  const navigate = useNavigate();

  function register(payload) {
    axios.post(`${BASE_URL}/signup`, payload)
      .then(() => {
        notifySuccess("Cadastro feito com sucesso!")
        navigate("/login", { replace: true });
      })
      .catch(error => {
        if (error.response.status === 409) {
          notifyFailure("Email já cadastrado!");
        } else if (error.response.status === 422) {
          notifyFailure("Envie dados válidos!");
        }

        console.error(error);
      })

  }

  return register;
}

export default useCreateAccount;
