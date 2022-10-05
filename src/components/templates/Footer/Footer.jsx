import { Container } from "./FooterStyles";

export function Footer() {
    return (
        <Container>
            <p>© TeachMe - 2022</p>
            <p style={{ marginTop: "5px" }}>Developed by <a href="https://github.com/adnanbezerra" target="blank">Adnan Bezerra</a></p>
        </Container>
    )
}