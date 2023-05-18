import { Container } from "./FooterStyles";

export function Footer() {

    function getCurrentYear() {
        const today = new Date();
        return today.getFullYear();
    }

    return (
        <Container>
            <p>© TeachMe - {getCurrentYear()} </p>
            <p style={{ marginTop: "5px" }}>Developed by <a href="https://github.com/adnanbezerra" target="blank">Adnan Bezerra</a></p>
        </Container>
    )
}