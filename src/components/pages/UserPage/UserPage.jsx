import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, config, getCookieByName, notifyFailure } from "../../../mock/data";
import UserContext from "../../contexts/UserContext";
import { NoSearchResults } from "../SearchPage/SearchPageStyles";
import SearchResultCard from "../SearchPage/SearchResultCard";
import { Container, EditUser, Email, ImageDiv, InfoDiv, InfoText, PageTitle } from "./UserPageStyles";

export default function UserPage() {

    const { user, setUser } = useContext(UserContext);
    const [userInfo, setUserInfo] = useState({});
    const [myPosts, setMyPosts] = useState([]);
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
            getMyPosts();
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

    function getMyPosts() {
        const userToken = verifyUser ? "" : user.token;
        const token = config(userToken);

        axios.get(`${BASE_URL}/my-posts`, token)
            .then(response => {
                setMyPosts(response.data);
            })
            .catch(error => {
                notifyFailure("Erro ao coletar os seus posts!");
                console.error(error);
            })
    }

    return (
        <Container>
            <PageTitle>Olá, {userInfo.name}!</PageTitle>
            <InfoText>Informações da sua conta:</InfoText>

            <InfoDiv>
                <ImageDiv>
                    {userInfo.profilePicture ?
                        <img src={userInfo.profilePicture} alt="" />
                        :
                        <img src="https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg" alt="" />
                    }
                    <EditUser onClick={() => navigate("/edit-user")}>Editar</EditUser>
                </ImageDiv>

                {userInfo.biography ?
                    <Email>Biografia: {userInfo.biography}</Email>
                    :
                    <Email>Biografia: Escreva já a sua!</Email>
                }

                <Email>Email: {userInfo.email}</Email>

                <InfoText>Suas histórias:</InfoText>
                {myPosts.length === 0 ?
                    <NoSearchResults>Nenhum resultado encontrado...</NoSearchResults>
                    :
                    myPosts.map(result => <SearchResultCard id={result.id} name={result.name} views={result.views} likes={result.likes} creationDate={result.creationDate} description={result.description} />)
                }
            </InfoDiv>
        </Container>
    )
}