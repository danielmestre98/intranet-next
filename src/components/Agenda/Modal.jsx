import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Red } from "@/app/(private)/styles";
import axios from "@/hooks/axiosInstance";
import { toast } from "react-toastify";
import InputMask from "react-input-mask";

const is24HourTime = (value) => {
    return /^(?:[01]\d|2[0-3]):?([0-5]\d)$|^(24:00)$/.test(value);
};

const requiredMessage = "Esse campo é necessário.";

const validationSchema = yup
    .object({
        tipo: yup.string().required(requiredMessage),
        hora_inicio: yup.string().required(requiredMessage).test("is-24-hour-time", "Hora inválida.", is24HourTime),
        hora_fim: yup.string().required(requiredMessage).test("is-24-hour-time", "Hora inválida.", is24HourTime),
        local: yup.string().required(requiredMessage),
        titulo: yup.string().required(requiredMessage),
        descricao: yup.string().required(requiredMessage),
    })
    .required();

function jsonToFormData(jsonData) {
    const formData = new FormData();

    for (const key in jsonData) {
        if (jsonData.hasOwnProperty(key)) {
            if (key === "anexo") {
                formData.append(key, jsonData[key][0]);
            } else {
                formData.append(key, jsonData[key]);
            }
        }
    }

    return formData;
}

const AgendaModal = ({ view, setView, event, inicio, day, setEvents }) => {
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
    const checked = watch("tipo");

    useEffect(() => {
        reset();
    }, [event, inicio]);

    const handleModalClose = async () => {
        setView(false);
    };

    const handleFeriadoClick = () => {
        setValue("hora_inicio", "07:00");
        setValue("hora_fim", "24:00");
    };

    const onSubmit = (data) => {
        const formData = jsonToFormData(data);
        if (event) {
            axios
                .put(`/agenda/event/${event.id}`, formData)
                .then(() => {
                    toast.success("Evento alterado com sucesso!");
                    setEvents((prevEvents) => {
                        var index = prevEvents.findIndex((item) => item === event);
                        prevEvents[index] = {
                            ...prevEvents[index],
                            evento: parseInt(data.tipo),
                            descricao: data.descricao,
                            fim: data.hora_fim,
                            inicio: data.hora_inicio,
                            local: data.local,
                            titulo: data.titulo,
                        };
                        return prevEvents;
                    });
                    handleModalClose();
                })
                .catch(() => {
                    toast.error("Erro ao alterar evento. Entre em contato com o suporte.");
                });
            return;
        }
        axios
            .post(`/agenda/event/new`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                setEvents((prevEvents) => [
                    ...prevEvents,
                    {
                        id: parseInt(response.data),
                        descricao: data.descricao,
                        evento: parseInt(data.tipo),
                        fim: data.hora_fim,
                        inicio: data.hora_inicio,
                        local: data.local,
                        titulo: data.titulo,
                        data: data.dia_evento,
                    },
                ]);
                toast.success("Evento registrado com sucesso!");
                handleModalClose();
            })
            .catch(() => {
                toast.error("Erro ao registrar evento. Entre em contato com o suporte.");
            });
    };

    const handleDelete = () => {
        if (confirm("Deseja realmente excluir esse evento?")) {
            axios
                .delete(`/agenda/event/${event.id}`)
                .then(() => {
                    toast.success("Evento excluído com sucesso!");
                    setEvents((prevEvents) => {
                        var index = prevEvents.findIndex((item) => item === event);
                        if (index !== -1) {
                            prevEvents.splice(index, 1);
                        }
                        return prevEvents;
                    });
                    handleModalClose();
                })
                .catch(() => {
                    toast.error("Problema ao excluir o evento. Favor entrar em contato com o suporte");
                });
        }
    };

    return (
        <Modal size="lg" show={view} onHide={handleModalClose}>
            <Form id="eventForm" onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>{event ? "Visualizar evento" : "Registrar evento"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={3}>
                            <Form.Control
                                hidden
                                {...register("dia_evento")}
                                defaultValue={`${day?.getFullYear()}-${day?.getMonth() + 1}-${day?.getDate()}`}
                            />
                            <Form.Group>
                                <Form.Label>
                                    <b>Tipo de evento</b>
                                </Form.Label>
                                <Form.Check
                                    isInvalid={errors?.tipo}
                                    value="1"
                                    defaultChecked={event?.evento === 1}
                                    type="radio"
                                    label="Ação Formativa"
                                    id="acao_formativa"
                                    {...register("tipo")}
                                />
                                <Form.Check
                                    isInvalid={errors?.tipo}
                                    value="2"
                                    defaultChecked={event?.evento === 2}
                                    type="radio"
                                    label="Evento Comum"
                                    id="evento_comum"
                                    {...register("tipo")}
                                />
                                <Form.Check
                                    isInvalid={errors?.tipo}
                                    value="3"
                                    onClick={handleFeriadoClick}
                                    defaultChecked={event?.evento === 3}
                                    type="radio"
                                    label="Feriado"
                                    id="evento_feriado"
                                    {...register("tipo")}
                                />
                                <Form.Control.Feedback style={errors?.tipo ? { display: "block" } : {}} type="invalid">
                                    {errors?.tipo?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Form.Group controlId="hora_inicio">
                                <Form.Label>
                                    <Red>*</Red> Início
                                </Form.Label>

                                <Form.Control
                                    as={InputMask}
                                    mask="99:99"
                                    placeholder="__:__"
                                    isInvalid={errors?.hora_inicio}
                                    {...register("hora_inicio")}
                                    readOnly={checked === "3"}
                                    defaultValue={checked === "3" ? "07:00" : event?.inicio || inicio}
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
                                <Form.Control
                                    as={InputMask}
                                    mask="99:99"
                                    placeholder="__:__"
                                    isInvalid={errors?.hora_fim}
                                    {...register("hora_fim")}
                                    readOnly={checked === "3"}
                                    defaultValue={checked === "3" ? "24:00" : event?.fim}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors?.hora_fim?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Group controlId="local">
                            <Form.Label>
                                <Red>*</Red>Local
                            </Form.Label>
                            <Form.Control
                                isInvalid={errors?.local}
                                {...register("local")}
                                defaultValue={event?.local}
                            />
                            <Form.Control.Feedback type="invalid"> {errors?.local?.message}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group controlId="titulo">
                            <Form.Label>
                                <Red>*</Red>Título
                            </Form.Label>
                            <Form.Control
                                isInvalid={errors?.titulo}
                                {...register("titulo")}
                                defaultValue={event?.titulo}
                            />
                            <Form.Control.Feedback type="invalid"> {errors?.titulo?.message}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group controlId="descricao">
                            <Form.Label>
                                <Red>*</Red>Breve descrição do evento
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                isInvalid={errors?.descricao}
                                {...register("descricao")}
                                defaultValue={event?.descricao}
                            />
                            <Form.Control.Feedback type="invalid"> {errors?.descricao?.message}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <p>
                        Campos com <Red>*</Red> são obrigatórios.
                    </p>
                    {event ? (
                        ""
                    ) : (
                        <>
                            <p style={{ marginTop: "4px", fontSize: "20px" }}>Anexar arquivo</p>
                            <hr />
                            <Row>
                                <Form.Group>
                                    <Form.Control {...register("anexo")} id="anexo" type="file" />
                                </Form.Group>
                            </Row>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Fechar
                    </Button>
                    {event ? (
                        <>
                            <Button onClick={handleDelete} type="button" variant="danger">
                                Excluir Evento
                            </Button>
                            <Button type="submit">Alterar Evento</Button>
                        </>
                    ) : (
                        <Button type="submit">Registrar Evento</Button>
                    )}
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AgendaModal;
