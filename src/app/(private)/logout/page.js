"use client";

import { useEffect } from "react";

const Logout = () => {
    useEffect(() => {
        dispatch(logoutUser());
        router.push("/login");
    }, []);
    return;
};

export default Logout;
