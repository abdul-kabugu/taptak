// middleware/authMiddleware.js

import {useUserContext}  from "../providers/UserContext"
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
    const ComponentWithAuth = (props) => {
        const { userProfile } = useUserContext();
        const router = useRouter();

        useEffect(() => {
            const token = localStorage.getItem('kbg_accessToken');
            if (!userProfile  && ! token) {
                router.push('/login');
            }
        }, [userProfile, router]);

        if (!userProfile) {
            return "Redireting to login page "; // Render a loading spinner or nothing while redirecting
        }

        return <WrappedComponent {...props} />;
    };

    // Set the display name for easier debugging
    ComponentWithAuth.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return ComponentWithAuth;
};

export default withAuth;

