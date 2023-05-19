import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { config, getCookieByName } from "../../mock/data";
import UserContext from "../../contexts/UserContext";
import { PageTitle } from "../UserPage/UserPageStyles";
import { Container, FormButton, FormInput, FormLabel, ImageDiv, InfoDiv } from "./EditUserStyles";
import useEditUserInfo from "../../actions/useEditUserInfo";
import useGetUserInfo from "../../actions/useGetUserInfo";

export default function EditUserPage() {

    const { user, setUser } = useContext(UserContext);
    const [userData, setUserData] = useState({
        username: "",
        password: "",
        profilePicture: "",
        email: "",
        biography: "",
    });
    const editUserInfo = useEditUserInfo();
    const getUserInfo = useGetUserInfo();
    const [userInfo, setUserInfo] = useState();

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
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function fetchData() {
        const userToken = verifyUser ? "" : user.token;
        const token = config(userToken);

        const data = getUserInfo(token)
        setUserInfo(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }

    function submitForm(e) {
        e.preventDefault();

        const userToken = verifyUser ? "" : user.token;
        const token = config(userToken);
        const payload = { ...userData, userInfo };

        if (window.confirm("Quer editar suas informações?")) {
            editUserInfo(user.id, payload, token);
        }
    }

    function handleChange(valueName, entry) {
        const newData = { ...userData, valueName: entry };
        setUserData(newData);
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
                    value={userData.name}
                    onChange={e => handleChange("name", e.target.value)}
                    placeholder="Insira seu novo nome de usuário"
                />

                <FormLabel for="biography">Biografia:</FormLabel>
                <FormInput id="biography"
                    value={userData.biography}
                    onChange={e => handleChange("biography", e.target.value)}
                    placeholder="Insira sua nova biografia"
                />

                <FormLabel for="profilePicture">Link para a foto de perfil:</FormLabel>
                <FormInput id="profilePicture"
                    value={userData.profilePicture}
                    onChange={e => handleChange("profilePicture", e.target.value)}
                    type="url"
                    placeholder="Insira sua nova foto de perfil"
                />

                <FormLabel for="email">Email:</FormLabel>
                <FormInput id="email"
                    value={userData.email}
                    onChange={e => handleChange("email", e.target.value)}
                    type="email"
                    placeholder="Insira seu novo e-mail"
                />

                <FormLabel for="password">Confirme a sua senha:</FormLabel>
                <FormInput id="password"
                    required
                    value={userData.password}
                    onChange={e => handleChange("password", e.target.value)}
                    type="password"
                    placeholder="Insira sua senha"
                />

                <FormButton>Enviar</FormButton>
            </InfoDiv>
        </Container>
    )
}
