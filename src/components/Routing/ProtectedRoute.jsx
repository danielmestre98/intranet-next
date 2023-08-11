"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import axiosIstance from "@/hooks/axiosInstance";
import { useDispatch } from "react-redux";
import { fetchUserData } from "@/app/Redux/user/slice";

const ProtectedRoute = ({ children, setLoading }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        const fetchUser = async (token) => {
            axiosIstance.defaults.headers.Authorization = "Bearer " + token;
            await axiosIstance
                .get(`/user`)
                .then(({ data }) => dispatch(fetchUserData(data)))
                .catch(() => {
                    localStorage.removeItem("userToken");
                    router.push("/login");
                })
                .finally(() => {
                    setLoading(false);
                });
        };
        const token = localStorage.getItem("userToken");
        if (!token) {
            router.push("/login");
        } else {
            fetchUser(token);
        }
    }, [router, setLoading, dispatch]);

    return <div>{children}</div>;
};

export default ProtectedRoute;
