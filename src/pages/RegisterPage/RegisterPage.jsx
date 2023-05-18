import { useEffect, useState } from "react";
import { ArrowContainer, BottomText, Container, Form, FormButton, FormInput, FormLabel, RegisterBox } from "./RegisterPageStyles";
import { Link, useNavigate } from "react-router-dom";
import { IoBook } from "react-icons/io5";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { SlArrowLeft } from "react-icons/sl";
import { getCookieByName } from "../../mock/data";
import useCreateAccount from "../../actions/useCreateAccount";

export default function RegisterPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const register = useCreateAccount();

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

        if (password !== confirmPassword) alert("As senhas precisam ser iguais!");

        const payload = { name, email, password, profilePicture };

        register(payload);
    }

    function returnToMainPage() {
        navigate('/');
    }

    function getCurrentYear() {
        const today = new Date();
        return today.getFullYear();
    }

    return (
        <Container>
            <ArrowContainer>
                <SlArrowLeft onClick={returnToMainPage} />
            </ArrowContainer>

            <IoBook style={{ fontSize: "70px", marginBottom: "5px" }} />
            <p>Cadastrar-se no TeachMe</p>

            <Form onSubmit={submitForm}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormInput id="email"
                    value={email}
                    type="email"
                    placeholder="Digite o seu email..."
                    required
                    onChange={e => setEmail(e.target.value)}
                />

                <FormLabel htmlFor="name">Seu nome</FormLabel>
                <FormInput id="name"
                    value={name}
                    required
                    placeholder="Digite o seu nome..."
                    onChange={e => setName(e.target.value)}
                />

                <FormLabel htmlFor="profilePicture">Link da foto de perfil (opcional)</FormLabel>
                <FormInput id="profilePicture"
                    value={profilePicture}
                    type="url"
                    placeholder="Insira um link, se quiser"
                    onChange={e => setProfilePicture(e.target.value)}
                />

                <FormLabel htmlFor="password">Senha</FormLabel>
                <FormInput id="password"
                    value={password}
                    required
                    type="password"
                    placeholder="Insira a sua senha"
                    onChange={e => setPassword(e.target.value)}
                />

                <FormLabel htmlFor="confirmPassword">Confirmar a senha</FormLabel>
                <FormInput id="confirmPassword"
                    value={confirmPassword}
                    required
                    type="password"
                    placeholder="Confirme a sua senha"
                    onChange={e => setConfirmPassword(e.target.value)}
                />

                <FormButton>Cadastrar</FormButton>
            </Form>

            <RegisterBox>Já tem conta? <Link id="link" to="/login">Faça login!</Link></RegisterBox>

            <BottomText>
                <span id="bottom">TeachMe © {getCurrentYear()}</span>
                <span id="bottom">Developed by Adnan Medeiros Bezerra</span>
            </BottomText>
        </Container>
    )
}