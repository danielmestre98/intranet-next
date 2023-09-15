"use client";

import { Button, Form, Modal, Row } from "react-bootstrap";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "@/hooks/axiosInstance";
import { toast } from "react-toastify";
import { useState } from "react";
import ReactLoading from "react-loading";

// Define a custom Yup validation function
yup.addMethod(yup.mixed, "fileType", function (allowedExtensions, message) {
    return this.test("fileType", message, function (value) {
        if (!value[0]) {
            return true; // Skip validation if no file is provided
        }

        const fileExtension = value[0].name.split(".").pop().toLowerCase();
        return allowedExtensions.includes(fileExtension);
    });
});

const validationSchema = yup.object({
    nome_view: yup.string().required("Esse campo é necessário."),
    arquivo: yup
        .mixed()
        .test("required", "Você precisa selecionar um arquivo.", (file) => {
            // return file && file.size;
            if (file.length > 0) return true;
            return false;
        })
        .fileType(["pdf", "doc", "docx"], "O arquivo deve ser PDF, DOC ou DOCX."),
});
const CurriculosModal = ({ view, setView, setCurriculos }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useForm({
        resolver: yupResolver(validationSchema),
    });
    const [loading, setLoading] = useState(false);

    const handleModalClose = () => {
        setView(false);
        reset();
    };

    const onSubmit = (form) => {
        setLoading(true);
        const formData = new FormData();
        const file = form.arquivo[0];
        formData.append("arquivo", file);
        formData.append("nome_view", form.nome_view);
        axios
            .post(`/curriculos/new`, formData, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            .then(({ data }) => {
                toast.success("Curriculo enviado com sucessso!");
                setCurriculos((prevCurriculos) => {
                    return [data, ...prevCurriculos];
                });
                handleModalClose();
            })
            .catch(() => {
                toast.error("Falha no envio do arquivo, por favor contate o suporte!");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Modal show={view} onHide={handleModalClose}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header>
                    <Modal.Title>Enviar Currículo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Form.Group controlId="arquivo">
                            <Form.Label>Selecione o currículo (PDF, DOC ou DOCX)</Form.Label>
                            <Form.Control
                                accept=".pdf, .doc, .docx"
                                isInvalid={errors?.arquivo}
                                {...register("arquivo")}
                                type="file"
                            />
                            <Form.Control.Feedback type="invalid">{errors?.arquivo?.message}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group controlId="nome_exibicao">
                            <Form.Label>Nome para exibição</Form.Label>
                            <Form.Control isInvalid={errors?.nome_view} {...register("nome_view")} />
                            <Form.Control.Feedback type="invalid">{errors?.nome_view?.message}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleModalClose} variant="secondary">
                        Fechar
                    </Button>
                    <Button disabled={loading} type="submit">
                        {loading ? <ReactLoading type="spin" color="#fff" height={"25px"} width={"25px"} /> : "Salvar"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default CurriculosModal;
