import axios from 'axios';
import { BASE_URL, notifyFailure, notifySuccess } from '../mock/data';
import { useNavigate } from 'react-router-dom';

function useEditUserInfo() {
  const navigate = useNavigate();

  function editUserInfo(id, payload, token) {
    axios.put(`${BASE_URL}/user/${id}`, payload, token)
      .then(() => {
        notifySuccess("Sucesso ao editar suas informações!");
        navigate("/");
      })
      .catch(error => {
        console.error(error);
        notifyFailure("Falha ao atualizar as suas informações.");
      });

  }

  return editUserInfo;
}

export default useEditUserInfo;
