"use client";

import CardIntranet from "@/components/Card/Card";
import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";
import { useRouter } from "next/navigation";
import { Button, Form, Row } from "react-bootstrap";
import { NavigationButtons } from "./styles";
import axios from "@/hooks/axiosInstance";
import { toast } from "react-toastify";
import { useState } from "react";
import ReactLoading from "react-loading";

const NewRecado = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const recadosText = document.getElementById("rich-text-editor").value;
        console.log(recadosText);
        axios
            .post("/notes/new", { descricao: recadosText })
            .then(() => {
                toast.success("Recado criado com sucesso!");
                router.push("/area-restrita/recados");
            })
            .catch(() => {
                toast.error(
                    "Falha ao enviar recado, tente novamente. Caso o erro persista entre em contato com o suporte"
                );
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <CardIntranet cardTitle={"Novo Recado"} bigTitle>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <RichTextEditor disableImage disableLink />
                </Row>
                <NavigationButtons>
                    <Button onClick={() => router.push("/area-restrita/recados")} variant="secondary">
                        Voltar
                    </Button>
                    <Button disabled={loading} type="submit">
                        {loading ? <ReactLoading type="spin" color="#fff" height={"25px"} width={"25px"} /> : "Salvar"}
                    </Button>
                </NavigationButtons>
            </Form>
        </CardIntranet>
    );
};

export default NewRecado;
