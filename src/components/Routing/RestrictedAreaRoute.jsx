"use client";

import axios from "@/hooks/axiosInstance";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LoadingDiv } from "./styles";
import ReactLoading from "react-loading";

const RestrictedAreaRoute = ({ children }) => {
    const [permission, setPermission] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const currentURL = window.location.href;
        const parts = currentURL.split("/");
        const permission = parts[parts.length - 1];
        axios
            .get(`/permissions/check/${permission}`)
            .then(({ data }) => {
                if (data) {
                    setPermission(true);
                } else {
                    setPermission(false);
                }
            })
            .catch(() => {
                toast.error("Falha ao recuperar permissões do usuário. Entre em contato com o suporte.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <>
            {loading ? (
                <LoadingDiv>
                    <ReactLoading type="spin" color="#034ea2" height={"200px"} width={"200px"} />
                </LoadingDiv>
            ) : permission ? (
                children
            ) : (
                "nao permitido"
            )}
        </>
    );
};

export default RestrictedAreaRoute;
