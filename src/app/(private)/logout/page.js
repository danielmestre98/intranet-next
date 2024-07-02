"use client";

import { logoutUser } from "@/app/Redux/user/slice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Logout = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logoutUser());
        router.push("/login");
    }, []);
    return;
};

export default Logout;
