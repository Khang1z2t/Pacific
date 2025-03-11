import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {Loading} from "~/component/ui/Loading";

export const GoogleRedirect = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const accessToken = urlParams.get('access_token');
        const refreshToken = urlParams.get('refresh_token');

        if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            navigate('/');
        } else {
            navigate('/login?error=google_auth_failed');
        }

    }, [navigate]);

    return (
        <Loading></Loading>
    )
}

