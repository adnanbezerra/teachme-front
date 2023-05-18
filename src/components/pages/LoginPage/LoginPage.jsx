import { useContext, useEffect, useState } from "react";
import { BottomText, Container, Form, FormButton, FormInput, FormLabel, RegisterBox } from "./LoginPageStyles";
import { IoBook } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, getCookieByName, notifyFailure, notifySuccess } from "../../../mock/data";
import UserContext from "../../contexts/UserContext";

export default function LoginPage() {

    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (user !== undefined) navigate("/", { replace: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const tokenCookie = getCookieByName("token");
        if (tokenCookie) {
            setUser({ token: tokenCookie });
            navigate("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    function submitForm(e) {
        e.preventDefault();

        const payload = { email, password };

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

    function getDateOneWeekFromNow() {
        const today = new Date();
        const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
        return nextWeek;
    }

    function getCurrentYear() {
        const today = new Date();
        return today.getFullYear();
    }

    return (
        <Container>
            <IoBook style={{ fontSize: "70px", marginBottom: "5px" }} />
            <p>Fazer login no TeachMe</p>

            <Form onSubmit={submitForm}>
                <FormLabel for="email">Email</FormLabel>
                <FormInput id="email"
                    value={email}
                    placeholder="Digite o seu email..."
                    type="email"
                    required
                    onChange={e => setEmail(e.target.value)}
                />

                <FormLabel for="password">Senha</FormLabel>
                <FormInput id="password"
                    value={password}
                    type="password"
                    placeholder="Insira sua senha"
                    required
                    onChange={e => setPassword(e.target.value)}
                />

                <FormButton>Fazer login</FormButton>
            </Form>

            <RegisterBox>Ainda não tem conta? <Link id="link" to="/register">Cadastre-se!</Link></RegisterBox>

            <BottomText>
                <span id="bottom">TeachMe © {getCurrentYear()}</span>
                <span id="bottom">Developed by Adnan Medeiros Bezerra</span>
            </BottomText>
        </Container>
    )
}