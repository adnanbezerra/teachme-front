import { useContext } from 'react';
import { useEffect } from 'react';
import { getCookieByName } from '../../mock/data';
import UserContext from '../../contexts/UserContext';
import SearchResultCard from '../SearchPage/SearchResultCard';
import { Container, NoResults, PageTitle } from './MainPageStyles'
import { v4 as uuid } from 'uuid';
import useGetPosts from '../../actions/useGetPosts';

export default function MainPage() {
    const { setUser } = useContext(UserContext);
    const { data: posts } = useGetPosts();

    useEffect(() => {
        const tokenCookie = getCookieByName('token');
        if (tokenCookie) {
            setUser({ token: tokenCookie });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container>
            <PageTitle>Postagens recentes</PageTitle>
            {posts.length === 0 ?
                <NoResults>Sem histórias recentes publicadas</NoResults>
                :
                posts.map(result =>
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