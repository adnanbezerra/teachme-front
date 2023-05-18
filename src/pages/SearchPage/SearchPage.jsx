import { useContext } from "react";
import { useEffect, useState } from "react";
import { getCookieByName } from "../../mock/data";
import UserContext from "../../contexts/UserContext";
import { Container, Form, FormButton, FormInput, NoSearchResults } from "./SearchPageStyles";
import SearchResultCard from "./SearchResultCard";
import { v4 as uuid } from 'uuid';
import useSearchPosts from "../../actions/useSearchPosts";

export default function SearchPage() {
    let searchResults = [{}];
    const [search, setSearch] = useState("");
    const { setUser } = useContext(UserContext);
    const searches = useSearchPosts();

    useEffect(() => {
        const tokenCookie = getCookieByName('token');
        if (tokenCookie) {
            setUser({ token: tokenCookie });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function submitForm(e) {
        e.preventDefault();

        searchResults = searches(search);
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
                searchResults.map(result =>
                    <SearchResultCard
                        key={uuid()}
                        id={result.id}
                        name={result.name}
                        views={result.views}
                        likes={result.likes}
                        creationDate={result.creationDate}
                        description={result.description}
                    />
                )
            }

        </Container>
    )
}
