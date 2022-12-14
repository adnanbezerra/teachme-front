import axios from 'axios';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { BASE_URL, getCookieByName, notifyFailure } from '../../../mock/data';
import UserContext from '../../contexts/UserContext';
import SearchResultCard from '../SearchPage/SearchResultCard';
import { Container, NoResults, PageTitle } from './MainPageStyles'

export default function MainPage() {
    const { setUser } = useContext(UserContext);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const tokenCookie = getCookieByName('token');
        if (tokenCookie) {
            setUser({ token: tokenCookie });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        axios.get(`${BASE_URL}/posts`)
            .then(response => {
                setPosts([...response.data]);
            })
            .catch(error => {
                notifyFailure("Falha na coleta de posts.")
                console.error(error);
            })
    }, [])

    return (
        <Container>
            <PageTitle>Postagens recentes</PageTitle>
            {posts.length === 0 ?
                <NoResults>Sem histórias recentes publicadas</NoResults>
                :
                posts.map(result => <SearchResultCard id={result.id} name={result.name} views={result.views} likes={result.likes} creationDate={result.creationDate} description={result.description} />)
            }
        </Container>
    )
}