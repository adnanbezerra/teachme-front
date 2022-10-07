import { useContext, useEffect, useState } from "react";
import { BottomText, Container, Form, FormButton, FormInput, FormLabel, RegisterBox } from "./LoginPageStyles";
import { IoBook } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, getCookieByName } from "../../../mock/data";
import UserContext from "../../contexts/UserContext";
import { toast } from "react-toastify";

export default function LoginPage() {

    const { setUser, user } = useContext(UserContext);
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

    function notify() {
        toast.success('Login feito com sucesso!', {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    function submitForm(e) {
        e.preventDefault();

        console.log('rodo');

        notify("Roda mano pprt");

        const payload = { email, password };

        axios.post(`${BASE_URL}/signin`, payload)
            .then(response => {
                document.cookie = `token=${response.data}; expires=${getDateOneWeekFromNow()}`
                setUser({ token: response.data });
                navigate('/timeline');
            })
            .catch(error => {
                if (error.response.status === 401) {
                    alert("Email ou senha errados! Tente novamente.");
                } else if (error.response.status === 422) {
                    alert("Envie dados válidos!");
                }
                
                console.error(error);
            })
    }

    function getDateOneWeekFromNow() {
        const today = new Date();
        const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
        return nextWeek;
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
                <span id="bottom">TeachMe © 2022</span>
                <span id="bottom">Developed by Adnan Medeiros Bezerra</span>
            </BottomText>
        </Container>
    )
}