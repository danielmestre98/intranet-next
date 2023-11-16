"use client";

import CardIntranet from "@/components/Card/Card";
import { useEffect, useState } from "react";
import axios from "@/hooks/axiosInstance";

const RecadosImportantes = () => {
    const [recado, setRecado] = useState();
    const [timestamp, setTimestamp] = useState("");
    useEffect(() => {
        axios
            .get("/notes/latest")
            .then(({ data }) => {
                const today = new Date();
                const updated = new Date(data?.created_at.replace("Z", ""));
                if (
                    today.getDate() + "-" + today.getMonth() + "-" + today.getFullYear() ===
                    updated.getDate() + "-" + updated.getMonth() + "-" + updated.getFullYear()
                ) {
                    setTimestamp(`Atualizado hoje às ${updated.getHours()}:${updated.getMinutes()}`);
                } else {
                    setTimestamp(
                        `Atualizado em: ${("0" + updated.getDate()).slice(-2)}/${("0" + updated.getMonth()).slice(
                            -2
                        )}/${updated.getFullYear()} às ${updated.getHours()}:${updated.getMinutes()}`
                    );
                }

                setRecado(data);
            })
            .catch(() => {
                toast.error("Falha ao recuperar recado. Entre em contato com o suporte.");
            })
            .finally(() => {});
    }, []);

    return (
        <CardIntranet cardTitle={"Recados Importantes"} bigTitle>
            <p>{timestamp}</p>
            <b>{recado?.departamento_descricao} informa:</b>
            <div dangerouslySetInnerHTML={{ __html: recado?.descricao }} />
        </CardIntranet>
    );
};

export default RecadosImportantes;
