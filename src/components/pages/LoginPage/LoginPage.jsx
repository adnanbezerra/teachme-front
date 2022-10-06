import { useContext, useState } from "react";
import { BottomText, Container, Form, FormButton, FormInput, FormLabel, RegisterBox } from "./LoginPageStyles";
import { IoBook } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../mock/data";
import UserContext from "../../contexts/UserContext";
import { toast } from "react-toastify";

export default function LoginPage() {

    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

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
                setUser(response.data);
                navigate("/");
            })
            .catch(error => {
                console.error(error);
                alert("Erro no login!");
            })
    }

    return (
        <Container>
            <IoBook style={{ fontSize: "70px", marginBottom: "5px" }} />
            <p>Cadastrar-se no TeachMe</p>

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