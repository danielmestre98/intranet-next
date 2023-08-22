"use client";

import PublicRoute from "@/components/Routing/PublicRoute";
import { useState } from "react";
import ReactLoading from "react-loading";
import { LoadingDiv } from "./styles";

export default function PublicLayout({ children }) {
    const [loading, setLoading] = useState(true);

    return (
        <PublicRoute setLoading={setLoading}>
            {loading ? (
                <LoadingDiv>
                    <ReactLoading type="spin" color="#034ea2" height={"200px"} width={"200px"} />
                </LoadingDiv>
            ) : (
                <div>{children}</div>
            )}
        </PublicRoute>
    );
}
