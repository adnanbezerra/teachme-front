import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../mock/data";
import { Container, Form, FormButton, FormInput, NoSearchResults } from "./SearchPageStyles";
import SearchResultCard from "./SearchResultCard";

export default function SearchPage() {

    const [searchResults, setSearchResults] = useState([
        {
            id: 1,
            name: "Adnan",
            views: 3,
            likes: 4,
            creationDate: '24/4',
            description: "Adnan Medeiros Bezerra"
        }
    ]);
    const [search, setSearch] = useState("");

    function submitForm(e) {
        e.preventDefault();

        axios.get(`${BASE_URL}/post/${search}`)
            .then(response => {
                if (response.data.length === 0) {
                    alert("sem retorno");
                } else {
                    setSearchResults([...response.data])
                }
            })
            .catch(error => {
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