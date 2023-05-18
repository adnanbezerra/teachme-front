import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

export default function Logout() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        setUser();
        deleteAllCookies();
        navigate('/login', { replace: true });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function deleteAllCookies() {
        let cookies = document.cookie.split(";");
    
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            let eqPos = cookie.indexOf("=");
            let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }

    return (
        <></>
    )
}