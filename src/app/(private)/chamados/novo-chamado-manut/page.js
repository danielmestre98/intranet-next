"use client";

import CardIntranet from "@/components/Card/Card";
3;
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "@/hooks/axiosInstance";
import { useForm } from "react-hook-form";
import { Button, Form, Row } from "react-bootstrap";
import { useState } from "react";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const validationSchema = yup
    .object({
        descricao_chamado: yup.string().required(),
    })
    .required();

const NovoChamadoManut = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (form) => {
        setLoading(true);
        axios
            .post("/chamados/new-manut", form, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            .then(({ data }) => {
                toast.success(`Chamado ${data.chamado_id} criado com sucesso.`);
                router.push("/chamados");
            })
            .catch(() => {
                toast.error("Falha ao registrar chamado, por gentileza entre em contato por telefone.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <CardIntranet cardTitle={"Novo chamado manutenção"} bigTitle>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Form.Group controlId="solicitacao">
                        <Form.Label>
                            <b>Faça a sua solicitação no quadro abaixo</b>
                        </Form.Label>
                        <Form.Control
                            isInvalid={errors.descricao_chamado}
                            as="textarea"
                            rows={8}
                            {...register("descricao_chamado")}
                        />
                    </Form.Group>
                </Row>
                <Button disabled={loading ? true : false} style={{ float: "right" }} type="submit">
                    {loading ? <ReactLoading type="spin" color="#fff" height={"25px"} width={"25px"} /> : "Enviar"}
                </Button>
            </Form>
        </CardIntranet>
    );
};

export default NovoChamadoManut;
