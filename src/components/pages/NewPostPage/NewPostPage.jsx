import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, config, getCookieByName, notifyFailure, notifySuccess } from "../../../mock/data";
import UserContext from "../../contexts/UserContext";
import { PageTitle } from "../MainPage/MainPageStyles";
import { Container, Form, FormButton, FormInput, FormLabel } from "./NewPostStyle";
import dayjs from 'dayjs';

export default function NewPostPage() {

    const { user, setUser } = useContext(UserContext);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const verifyUser = user === undefined;
    const navigate = useNavigate();

    useEffect(() => {
        const tokenCookie = getCookieByName('token');
        if (tokenCookie) {
            setUser({ token: tokenCookie });
        }
        if (verifyUser) {
            navigate('/', { replace: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function submitForm(e) {
        e.preventDefault();

        const userToken = verifyUser ? "" : user.token;
        const token = config(userToken);
        const creationDate = dayjs().format('DD/MM/YYYY');
        const payload = { name, description, creationDate };

        axios.post(`${BASE_URL}/new-post`, payload, token)
            .then(() => {
                notifySuccess("Post criado com sucesso! Agora você pode adicionar capítulos e depois torná-la pública.");
                navigate("/");
            })
            .catch(error => {
                console.error(error);
                notifyFailure("Falha na criação do novo post");
            });
    }

    return (
        <Container>
            <PageTitle>Criar novo post</PageTitle>

            <Form onSubmit={submitForm}>
                <FormLabel for="post-name">Nome do post</FormLabel>
                <FormInput id="post-name"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Insira aqui o nome da postagem..."
                />

                <FormLabel for="description">Descrição do post</FormLabel>
                <FormInput id="description"
                    required
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Insira aqui uma descrição para a postagem..."
                />

                <FormButton>Criar novo post</FormButton>
            </Form>

        </Container>
    )
}