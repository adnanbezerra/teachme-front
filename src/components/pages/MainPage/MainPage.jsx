import axios from 'axios';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, config, getCookieByName } from '../../../mock/data';
import UserContext from '../../contexts/UserContext';
import { Container } from './MainPageStyles'

export default function MainPage() {

    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const verifyUser = user === undefined;

    useEffect(() => {
        const tokenCookie = getCookieByName('token');
        if (tokenCookie) {
            setUser({ token: tokenCookie });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container>
            oiiiii
        </Container>
    )
}