import { useContext, useEffect, useState } from "react";
import { ArrowContainer, BottomText, Container, Form, FormButton, FormInput, FormLabel, RegisterBox } from "./LoginPageStyles";
import { IoBook } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { getCookieByName } from "../../../mock/data";
import UserContext from "../../contexts/UserContext";
import { SlArrowLeft } from "react-icons/sl";
import useLoginToAccount from "../../../actions/useLoginToAccount";

export default function LoginPage() {

    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const login = useLoginToAccount();

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

        login(payload);
    }

    function getCurrentYear() {
        const today = new Date();
        return today.getFullYear();
    }

    function returnToMainPage() {
        navigate('/');
    }

    return (
        <Container>
            <ArrowContainer>
                <SlArrowLeft onClick={returnToMainPage} />
            </ArrowContainer>
            
            <IoBook style={{ fontSize: "70px", marginBottom: "5px" }} />
            <p>Fazer login no TeachMe</p>

            <Form onSubmit={submitForm}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormInput id="email"
                    value={email}
                    placeholder="Digite o seu email..."
                    type="email"
                    required
                    onChange={e => setEmail(e.target.value)}
                />

                <FormLabel htmlFor="password">Senha</FormLabel>
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