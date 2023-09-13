"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Red } from "@/app/(private)/styles";
import InputMask from "react-input-mask";
import { useSelector } from "react-redux";
import axios from "@/hooks/axiosInstance";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";

const validationSchema = yup
    .object({
        hora_inicio: yup.string().required("Esse campo é necessário."),
        hora_fim: yup.string().required("Esse campo é necessário."),
        descricao: yup.string().required("Esse campo é necessário."),
    })
    .required();

function formatDateToYMD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so we add 1
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

const ModalAgDa = ({ view, setView, agendamento, start, day, setAgenda, horariosNaoDisponiveis, horarios }) => {
    const { currentUser } = useSelector((reducer) => reducer.userReducer);
    const [loading, setLoading] = useState(false);
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
    const [availableHours, setAvailableHours] = useState([]);

    useEffect(() => {
        if (agendamento) {
            setValue("descricao", agendamento.descricao);
        } else {
            setValue("descricao", "");
        }
    }, [agendamento]);

    const handleModalClose = async () => {
        setView(false);
    };

    const onSubmit = (form) => {
        setLoading(true);
        form = {
            ...form,
            tipo_ag: 2,
            local: currentUser?.local,
            solicitante: currentUser?.local === "SEDS" ? currentUser?.departamento : currentUser?.drads_id,
            dia_agendamento: formatDateToYMD(day),
        };
        axios
            .post(`/agenda-sala/new`, form)
            .then(({ data }) => {
                setAgenda((prevAgenda) => {
                    return [...prevAgenda, data];
                });
                toast.success("Agendamento criado com sucesso.");
                handleModalClose();
            })
            .catch(() => {
                toast.error("Erro ao criar agendamento. Entre em contato com o suporte.");
            })
            .finally(() => {
                setLoading(false);
            });
        // console.log(form);
    };

    const notAvailableHours = React.useCallback(() => {
        var nextPeriods = [];
        var startHour = start;
        var filteredNotAvailableHours = [];
        if (startHour) {
            horariosNaoDisponiveis?.map((event) => {
                if (parseInt(event.hora_inicio.slice(0, -3).replace(":", "")) <= parseInt(startHour.replace(":", ""))) {
                    return true;
                }
                filteredNotAvailableHours.push(event.hora_inicio.slice(0, -3));
                return true;
            });
            filteredNotAvailableHours.push("12:00");
            horarios = [...horarios.slice(0, 10), "12:00", ...horarios.slice(10)];
            filteredNotAvailableHours.sort((a, b) => {
                if (parseInt(a.replace(":", "")) > parseInt(b.replace(":", ""))) return 1;
                if (parseInt(a.replace(":", "")) < parseInt(b.replace(":", ""))) return -1;
                return 0;
            });

            startHour = parseInt(startHour.replace(":", ""));
            for (let i = 0; i < horarios.length; i++) {
                const key = horarios[i];
                var hora = parseInt(key.replace(":", ""));
                if (hora > startHour && !filteredNotAvailableHours.includes(key)) {
                    nextPeriods.push(key);
                } else {
                    if (hora <= startHour) {
                    } else {
                        nextPeriods.push(horarios[i]);
                        break;
                    }
                }
            }
            setAvailableHours(nextPeriods);
        }
    }, [start, horarios, horariosNaoDisponiveis]);

    useEffect(() => {
        notAvailableHours();
        reset();
    }, [start]);

    const handleDelete = () => {
        if (confirm(`Tem certeza que deseja excluir esse agendamento?`)) {
            setLoading(true);
            axios
                .delete(`/agenda-sala/${agendamento.id}`)
                .then(async () => {
                    toast.success("Agendamento excluído com sucesso!");
                    await setAgenda((prevAgenda) => {
                        var index = prevAgenda.findIndex((item) => item.id === agendamento.id);
                        if (index !== -1) {
                            prevAgenda.splice(index, 1);
                        }
                        return prevAgenda;
                    });
                    handleModalClose();
                })
                .catch(() => {
                    toast.error("Erro ao excluir agendamento. Entre em contato com o suporte.");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
        return;
    };

    return (
        <>
            <Modal size="lg" show={view} onHide={handleModalClose}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {agendamento ? <>Visualizar agendamento</> : <>Registrar Agendamento</>}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col md={2}>
                                <Form.Group controlId="hora_inicio">
                                    <Form.Label>
                                        <Red>*</Red> Início
                                    </Form.Label>

                                    <Form.Control
                                        as={InputMask}
                                        mask="99:99"
                                        readOnly
                                        placeholder="__:__"
                                        isInvalid={errors?.hora_inicio}
                                        {...register("hora_inicio")}
                                        defaultValue={agendamento?.hora_inicio || start}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {errors?.hora_inicio?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group controlId="hora_fim">
                                    <Form.Label>
                                        <Red>*</Red> Fim
                                    </Form.Label>
                                    {agendamento ? (
                                        <Form.Control readOnly defaultValue={agendamento?.hora_fim.slice(0, -3)} />
                                    ) : (
                                        <Form.Select isInvalid={errors?.hora_fim} {...register("hora_fim")}>
                                            <option hidden value="">
                                                __:__
                                            </option>
                                            {availableHours?.map((hour) => (
                                                <option key={hour} value={hour}>
                                                    {hour}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    )}

                                    <Form.Control.Feedback type="invalid">
                                        {errors?.hora_fim?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={8}>
                                <Form.Group controlId="setor">
                                    <Form.Label>{currentUser?.local === "SEDS" ? "Departamento" : "DRADS"}</Form.Label>
                                    <Form.Control
                                        defaultValue={
                                            currentUser?.local === "SEDS"
                                                ? currentUser?.departamentos?.departamento_descricao
                                                : `${currentUser?.drads?.drads_descricao} ${
                                                      currentUser?.drads?.drads_descricao_secundaria || ""
                                                  }`
                                        }
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="descricao">
                                    <Form.Label>
                                        <Red>*</Red> Breve descrição do agendamento
                                    </Form.Label>
                                    <Form.Control
                                        isInvalid={errors?.descricao}
                                        readOnly={agendamento ? true : false}
                                        {...register("descricao")}
                                        as="textarea"
                                        rows="5"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors?.descricao?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalClose}>
                            Fechar
                        </Button>
                        {agendamento ? (
                            <Button onClick={handleDelete} type="button" variant="danger">
                                {loading ? (
                                    <ReactLoading type="spin" color="#fff" height={"25px"} width={"25px"} />
                                ) : (
                                    " Excluir agendamento"
                                )}
                            </Button>
                        ) : (
                            <Button type="submit" variant="primary">
                                {loading ? (
                                    <ReactLoading type="spin" color="#fff" height={"25px"} width={"25px"} />
                                ) : (
                                    "Salvar"
                                )}
                            </Button>
                        )}
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default ModalAgDa;
