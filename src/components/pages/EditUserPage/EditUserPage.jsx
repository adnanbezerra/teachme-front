import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, config, getCookieByName, notifyFailure, notifySuccess } from "../../../mock/data";
import UserContext from "../../contexts/UserContext";
import { PageTitle } from "../UserPage/UserPageStyles";
import { Container, FormButton, FormInput, FormLabel, ImageDiv, InfoDiv } from "./EditUserStyles";

export default function EditUserPage() {

    const { user, setUser } = useContext(UserContext);
    const [userInfo, setUserInfo] = useState({});
    const [name, setName] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [biography, setBiography] = useState("");

    const verifyUser = user === undefined;
    const navigate = useNavigate();

    useEffect(() => {
        const tokenCookie = getCookieByName('token');
        if (tokenCookie) {
            setUser({ token: tokenCookie });
        }
        if (verifyUser) {
            navigate('/', { replace: true });
        } else {
            getUserInfo();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function getUserInfo() {
        const userToken = verifyUser ? "" : user.token;
        const token = config(userToken);

        axios.get(`${BASE_URL}/user/me`, token)
            .then(response => {
                setUserInfo(response.data);
            })
            .catch(error => {
                notifyFailure("Erro ao coletar as suas informações!")
                console.error(error);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    };

    function submitForm(e) {
        e.preventDefault();

        const userToken = verifyUser ? "" : user.token;
        const token = config(userToken);
        const payload = { email, userInfo, profilePicture, password, biography };

        if (window.confirm("Quer editar suas informações?")) {
            axios.put(`${BASE_URL}/user/id/${verifyUser ? "" : user.id}`, payload, token)
                .then(response => {
                    notifySuccess("Sucesso ao editar suas informações!");
                    navigate("/");
                })
                .catch(error => {
                    console.error(error);
                    notifyFailure("Falha ao atualizar as suas informações.");
                });
        };
    }

    return (
        <Container>
            <PageTitle>Editar informações de usuário</PageTitle>

            <InfoDiv onSubmit={submitForm}>
                <ImageDiv>
                    {userInfo.profilePicture ?
                        <img src={userInfo.profilePicture} alt="" />
                        :
                        <img src="https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg" alt="" />
                    }
                </ImageDiv>

                <FormLabel for="name">Nome:</FormLabel>
                <FormInput id="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Insira seu novo nome de usuário"
                />

                <FormLabel for="biography">Biografia:</FormLabel>
                <FormInput id="biography"
                    value={biography}
                    onChange={e => setBiography(e.target.value)}
                    placeholder="Insira sua nova biografia"
                />

                <FormLabel for="profilePicture">Link para a foto de perfil:</FormLabel>
                <FormInput id="profilePicture"
                    value={profilePicture}
                    onChange={e => setProfilePicture(e.target.value)}
                    type="url"
                    placeholder="Insira sua nova foto de perfil"
                />

                <FormLabel for="email">Email:</FormLabel>
                <FormInput id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    placeholder="Insira seu novo e-mail"
                />

                <FormLabel for="password">Confirme a sua senha:</FormLabel>
                <FormInput id="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    placeholder="Insira sua senha"
                />

                <FormButton>Enviar</FormButton>
            </InfoDiv>
        </Container>
    )
}