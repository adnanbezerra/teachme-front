import axios from "axios";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { BASE_URL, getCookieByName, notifyFailure } from "../../../mock/data";
import UserContext from "../../contexts/UserContext";
import { Container, Form, FormButton, FormInput, NoSearchResults } from "./SearchPageStyles";
import SearchResultCard from "./SearchResultCard";

export default function SearchPage() {

    const [searchResults, setSearchResults] = useState([]);
    const [search, setSearch] = useState("");
    const { setUser } = useContext(UserContext);

    useEffect(() => {
        const tokenCookie = getCookieByName('token');
        if (tokenCookie) {
            setUser({ token: tokenCookie });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function submitForm(e) {
        e.preventDefault();

        axios.get(`${BASE_URL}/post/name/${search}`)
            .then(response => {
                if (response.data.length === 0) {
                    notifyFailure("Não encontramos o resultado solicitado!");
                } else {
                    setSearchResults([...response.data])
                }
            })
            .catch(error => {
                notifyFailure("Erro não identificado. Contate o administrador")
                console.error(error);
            })
    }

    return (
        <Container>
            <Form onSubmit={submitForm}>
                <FormInput value={search} onChange={e => setSearch(e.target.value)} required placeholder="Digite a sua pesquisa..." />
                <FormButton>Pesquisar</FormButton>
            </Form>

            {searchResults.length === 0 ?
                <NoSearchResults>Nenhum resultado encontrado...</NoSearchResults>
                :
                searchResults.map(result => <SearchResultCard id={result.id} name={result.name} views={result.views} likes={result.likes} creationDate={result.creationDate} description={result.description} />)
            }

        </Container>
    )
}