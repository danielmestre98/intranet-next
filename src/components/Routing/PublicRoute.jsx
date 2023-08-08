"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PublicRoute = ({ children, setLoading }) => {
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (token) {
            router.push("/");
        } else {
            setLoading(false);
        }
    }, [router, setLoading]);

    return <div>{children}</div>;
};

export default PublicRoute;
