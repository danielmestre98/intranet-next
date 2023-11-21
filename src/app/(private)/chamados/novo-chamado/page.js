"use client";

import CardIntranet from "@/components/Card/Card";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FilesDiv } from "./styles";
import axios from "@/hooks/axiosInstance";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";
import { updateRamal } from "@/app/Redux/user/slice";

const validationSchema = yup
    .object({
        descricao_chamado: yup.string().required(),
        ramal: yup.string().required(),
    })
    .required();

const NovoChamadoSuporte = () => {
    const { currentUser } = useSelector((reducer) => reducer.userReducer);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });
    const [count, setCount] = useState(1);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();

    const onSubmit = (form) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("descricao_chamado", form.descricao_chamado);
        formData.append("ramal", form.ramal);
        if (files.length > 0) {
            files.forEach((item) => {
                formData.append(`arquivos[]`, item.file);
            });
        }
        axios
            .post("/chamados/new", formData, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            .then(({ data }) => {
                toast.success(`Chamado ${data.chamado_id} criado com sucesso.`);
                dispatch(updateRamal(form.ramal));
                router.push("/chamados");
            })
            .catch(() => {
                toast.error("Falha ao registrar chamado, por gentileza entre em contato por telefone.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleFileSelect = (e) => {
        let newFile = { id: count, file: e.target.files[0] };

        setFiles((prevFiles) => [...prevFiles, newFile]);
        setCount((prevCount) => prevCount + 1);
        e.target.value = null;
    };

    const handleFileRemove = (fileRemove) => {
        const index = files.findIndex((file) => file.id === fileRemove.id);
        if (index !== -1) {
            setFiles((prevFiles) => {
                const newFiles = [...prevFiles];
                newFiles.splice(index, 1);
                return newFiles;
            });
        }
    };

    return (
        <CardIntranet cardTitle={"Novo chamado suporte"} bigTitle>
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
                <Row>
                    <Col md={3}>
                        <Form.Group controlId="ramal">
                            <Form.Label>Ramal / Telefone</Form.Label>
                            <Form.Control
                                isInvalid={errors.ramal}
                                defaultValue={currentUser?.ramais?.ramal_numero}
                                {...register("ramal")}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group>
                    <Form.Label>Anexar arquivos</Form.Label>
                    <Form.Control onChange={handleFileSelect} style={{ width: "140px" }} type="file" />
                </Form.Group>
                <FilesDiv>
                    {files?.map((file) => {
                        return (
                            <div key={file?.id} className="file">
                                <div className="file-name">{file?.file?.name}</div>
                                <div className="remove" onClick={() => handleFileRemove(file)}>
                                    <FontAwesomeIcon icon={faX} />
                                </div>
                            </div>
                        );
                    })}
                </FilesDiv>
                <Button disabled={loading ? true : false} style={{ float: "right" }} type="submit">
                    {loading ? <ReactLoading type="spin" color="#fff" height={"25px"} width={"25px"} /> : "Enviar"}
                </Button>
            </Form>
        </CardIntranet>
    );
};

export default NovoChamadoSuporte;
