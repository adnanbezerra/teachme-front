import { useState } from "react";
import { BottomText, Container, Form, FormButton, FormInput, FormLabel, ReturnButton } from "./RegisterPageStyles";
import axios from "axios";
import { BASE_URL } from "../../../mock/data";
import { useNavigate, Link } from "react-router-dom";
import { BsBookFill } from "react-icons/bs";
import { RiArrowLeftSLine } from "react-icons/ri";

export default function RegisterPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const navigate = useNavigate();

    function submitForm(e) {
        e.preventDefault();

        if(password !== confirmPassword) alert("As senhas precisam ser iguais!");

        const payload = { name, email, nickname, password, profilePicture };

        axios.post(`${BASE_URL}/signup`, payload)
            .then(response => {
                alert("Cadastro feito com sucesso!");
                navigate("/login", { replace: true });
            })
            .catch(error => {
                console.error(error);
                alert("Erro no cadastro! Contrate o administrador.");
            })
    }

    return (
        <Container>
            <Link to="/login" style={{ textDecoration: "none", color: "#000" }}>
                <ReturnButton>
                    <RiArrowLeftSLine style={{ fontSize: "25px" }} />
                    Retornar
                </ReturnButton>
            </Link>

            <BsBookFill style={{ fontSize: "70px", marginBottom: "5px" }} />
            <p>Cadastrar-se no TeachMe</p>

            <Form onSubmit={submitForm}>
                <FormLabel for="email">Email</FormLabel>
                <FormInput id="email" value={email} type="email" required onChange={e => setEmail(e.target.value)} />

                <FormLabel for="name">Seu nome</FormLabel>
                <FormInput id="name" value={name} required onChange={e => setName(e.target.value)} />

                <FormLabel for="nickname">Nickname</FormLabel>
                <FormInput id="nickname" value={nickname} required onChange={e => setNickname(e.target.value)} />

                <FormLabel for="profilePicture">Link da foto de perfil (opcional)</FormLabel>
                <FormInput id="profilePicture" value={profilePicture} type="url" onChange={e => setProfilePicture(e.target.value)} />

                <FormLabel for="password">Senha</FormLabel>
                <FormInput id="password" value={password} required type="password" onChange={e => setPassword(e.target.value)} />

                <FormLabel for="confirmPassword">Confirmar a senha</FormLabel>
                <FormInput id="confirmPassword" value={confirmPassword} required type="password" onChange={e => setConfirmPassword(e.target.value)} />

                <FormButton>Cadastrar</FormButton>
            </Form>

            <BottomText>
                <span id="bottom">TeachMe © 2022</span>
                <span id="bottom">Developed by Adnan Medeiros Bezerra</span>
            </BottomText>
        </Container>
    )
}