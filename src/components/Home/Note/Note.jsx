"use client";

import { useEffect, useState } from "react";
import { LinkNote, Timestamp } from "./styles";
import axios from "../../../hooks/axiosInstance";
import { toast } from "react-toastify";
import NoteLoad from "./Load";

const Note = () => {
    const [loading, setLoading] = useState(true);
    const [recado, setRecado] = useState();
    const [timestamp, setTimestamp] = useState("");

    useEffect(() => {
        const fetchNote = () => {
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

                    if (data.descricao.length > 900) {
                        data.descricao = `${data.descricao.slice(0, 900)} <b>[Leia mais ...]</b>`;
                    }
                    setRecado(data);
                })
                .catch(() => {
                    // toast.error("Falha ao recuperar recado. Entre em contato com o suporte.");
                })
                .finally(() => {
                    setLoading(false);
                });
        };
        fetchNote();
        const interval = setInterval(() => {
            fetchNote();
        }, 60 * 30 * 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            <Timestamp>{timestamp}</Timestamp>
            {loading ? (
                <NoteLoad />
            ) : (
                <>
                    <b>{recado?.departamento_descricao} informa:</b>
                    <LinkNote href="/recados-importantes" dangerouslySetInnerHTML={{ __html: recado?.descricao }} />
                </>
            )}
        </>
    );
};

export default Note;
