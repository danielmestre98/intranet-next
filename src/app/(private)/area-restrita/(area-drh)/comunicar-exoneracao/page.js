"use client";

import { Red } from "@/app/(private)/styles";
import CardIntranet from "@/components/Card/Card";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import axios from "@/hooks/axiosInstance";
import { ButtonsDiv, SelectValidation } from "./styles";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";

const validationSchema = yup
    .object({
        usuario: yup.object({
            label: yup.string().required("status is required (from label)"),
            value: yup.string().required("status is required"),
        }),
        data_exoneracao: yup.string().required(),
    })
    .required();

const ComunicarExoneracao = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (form) => {
        axios
            .post("/chamados/new-exoneracao", form)
            .then(({ data }) => {
                toast.success(`Chamado ${data.chamado_id} criado com sucesso!`);
                router.push("/area-restrita/comunicar-exoneracao");
            })
            .catch(() => {
                toast.error("Falha ao criar chamado. Entre em contato com o suporte");
            });
    };

    useEffect(() => {
        axios
            .get("/users-select")
            .then(({ data }) => {
                setUsers(data);
            })
            .catch(() => {
                toast.error(
                    "Falha ao recuperar dados dos usuários tente novamente. Caso o erro persista entre em contato com o suporte."
                );
            });
    }, []);

    return (
        <CardIntranet cardTitle={"Comunicar Exoneração"} bigTitle>
            <Row>
                <p style={{ margin: "0" }}>
                    Escolha o nome da pessoa para solicitar a inativação dela nos sistemas internos. (Após solicitado
                    será aberto um chamado que você poderá encontrar em &quot;Meus chamados&quot;)
                </p>
            </Row>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col md={9}>
                        <Form.Group>
                            <Form.Label>
                                <Red>*</Red> Pessoa
                            </Form.Label>
                            <Controller
                                name="usuario"
                                control={control}
                                render={({ field }) => (
                                    <SelectValidation
                                        {...field}
                                        className={errors?.usuario_id ? "is-invalid" : ""}
                                        options={users}
                                        placeholder="Selecione a pessoa..."
                                    />
                                )}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>
                                <Red>*</Red> Data exoneração
                            </Form.Label>
                            <Form.Control
                                isInvalid={errors?.data_exoneracao}
                                {...register("data_exoneracao")}
                                type="date"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <p>
                    Campos com <Red>*</Red> são obrigatórios
                </p>
                <ButtonsDiv>
                    <Button onClick={() => router.push("/area-restrita")} variant="secondary">
                        Voltar
                    </Button>
                    <Button disabled={loading} type="submit">
                        {loading ? (
                            <ReactLoading type="spin" color="#fff" height={"25px"} width={"25px"} />
                        ) : (
                            "Abrir chamado"
                        )}
                    </Button>
                </ButtonsDiv>
            </Form>
        </CardIntranet>
    );
};

export default ComunicarExoneracao;
