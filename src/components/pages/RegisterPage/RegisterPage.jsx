import { useEffect, useState } from "react";
import { BottomText, Container, Form, FormButton, FormInput, FormLabel, ReturnButton } from "./RegisterPageStyles";
import axios from "axios";
import { BASE_URL, getCookieByName, notifyFailure, notifySuccess } from "../../../mock/data";
import { useNavigate, Link } from "react-router-dom";
import { IoBook } from "react-icons/io5";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

export default function RegisterPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

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

        axios.post(`${BASE_URL}/signup`, payload)
            .then(response => {
                notifySuccess("Cadastro feito com sucesso!")
                navigate("/login", { replace: true });
            })
            .catch(error => {
                if (error.response.status === 409) {
                    notifyFailure("Email já cadastrado!");
                } else if (error.response.status === 422) {
                    notifyFailure("Envie dados válidos!");
                }
                
                console.error(error);
            })
    }

    function getCurrentYear() {
        const today = new Date();
        return today.getFullYear();
    }

    return (
        <Container>
            <Link to="/login" style={{ textDecoration: "none", color: "#000" }}>
                <ReturnButton>
                    <RiArrowLeftSLine style={{ fontSize: "25px" }} />
                    Retornar
                </ReturnButton>
            </Link>

            <IoBook style={{ fontSize: "70px", marginBottom: "5px" }} />
            <p>Cadastrar-se no TeachMe</p>

            <Form onSubmit={submitForm}>
                <FormLabel for="email">Email</FormLabel>
                <FormInput id="email"
                    value={email}
                    type="email"
                    placeholder="Digite o seu email..."
                    required
                    onChange={e => setEmail(e.target.value)}
                />

                <FormLabel for="name">Seu nome</FormLabel>
                <FormInput id="name"
                    value={name}
                    required
                    placeholder="Digite o seu nome..."
                    onChange={e => setName(e.target.value)}
                />

                <FormLabel for="profilePicture">Link da foto de perfil (opcional)</FormLabel>
                <FormInput id="profilePicture"
                    value={profilePicture}
                    type="url"
                    placeholder="Insira um link, se quiser"
                    onChange={e => setProfilePicture(e.target.value)}
                />

                <FormLabel for="password">Senha</FormLabel>
                <FormInput id="password"
                    value={password}
                    required
                    type="password"
                    placeholder="Insira a sua senha"
                    onChange={e => setPassword(e.target.value)}
                />

                <FormLabel for="confirmPassword">Confirmar a senha</FormLabel>
                <FormInput id="confirmPassword"
                    value={confirmPassword}
                    required
                    type="password"
                    placeholder="Confirme a sua senha"
                    onChange={e => setConfirmPassword(e.target.value)}
                />

                <FormButton>Cadastrar</FormButton>
            </Form>

            <BottomText>
                <span id="bottom">TeachMe © {getCurrentYear()}</span>
                <span id="bottom">Developed by Adnan Medeiros Bezerra</span>
            </BottomText>
        </Container>
    )
}