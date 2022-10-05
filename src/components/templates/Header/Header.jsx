import { Container, Title } from "./HeaderStyles";
import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BsBook } from "react-icons/bs";

export function Header() {
    return (
        <Container>
            <FaBars style={{ color: "#fff", fontSize: "20px" }} />

            <Title><BsBook style={{ marginRight: "5px" }} />TeachMe</Title>

            <Link to={"/search"}><div>
                <AiOutlineSearch style={{ color: "#fff", fontSize: "30px" }} />
            </div></Link>
        </Container>
    )
}