'use client'

import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

export default function HomePageRedirect() {
    const [currentUser, setCurrentUser] = useState<any>(null);

    const router = useRouter();

    useEffect(() => {
        const cookies = parseCookies();
        const currentUser = cookies?.currentUser;
        currentUser ? setCurrentUser(currentUser) : setCurrentUser(null);
    }, []);

    useEffect(() => {
        if (currentUser === null) {
            router.push('/auth/login');
        } else {
            router.push('/dashboard');
        }
    }, [currentUser]);

    return (<></>);
}