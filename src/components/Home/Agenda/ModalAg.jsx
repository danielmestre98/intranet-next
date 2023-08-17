"use client";

import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { LabelViewEvent } from "./styles";

const weekDays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
const monthNames = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
];
const ModalAg = ({ view, setView, event }) => {
    const handleModalClose = () => {
        setView(false);
    };
    const day = new Date(event?.dia_evento.replace(/-/g, "/"));

    return (
        <>
            <Modal size="lg" show={view} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Visualizar evento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={3}>
                            <Form.Group>
                                <Form.Label>
                                    <b>Tipo de evento</b>
                                </Form.Label>
                                <Form.Check
                                    disabled
                                    value="1"
                                    defaultChecked={event?.tipo === 1}
                                    type="radio"
                                    label="Ação Formativa"
                                    name="tipo"
                                    id="acao_formativa"
                                />
                                <Form.Check
                                    disabled
                                    value="2"
                                    defaultChecked={event?.tipo === 2}
                                    type="radio"
                                    label="Evento Comum"
                                    name="tipo"
                                    id="evento_comum"
                                />
                                <Form.Check
                                    disabled
                                    value="3"
                                    defaultChecked={event?.tipo === 3}
                                    type="radio"
                                    label="Feriado"
                                    name="tipo"
                                    id="evento_feriado"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Form.Group>
                                <Form.Label>Início</Form.Label>
                                <Form.Control disabled defaultValue={event?.hora_inicio.slice(0, 5)} />
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Form.Group>
                                <Form.Label>Fim</Form.Label>
                                <Form.Control disabled defaultValue={event?.hora_fim.slice(0, 5)} />
                            </Form.Group>
                        </Col>
                        <Col md={5}>
                            <Form.Group>
                                <Form.Label>Dia</Form.Label>
                                <Form.Control
                                    disabled
                                    defaultValue={`${weekDays[day.getDay()]}, ${("0" + day.getDate()).slice(-2)} de ${
                                        monthNames[day.getMonth()]
                                    } de ${day.getFullYear()}`}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Responsável</Form.Label>
                                <Form.Control
                                    defaultValue={event?.usuario_nome
                                        .toLowerCase()
                                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                                    disabled
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>{event?.local === "SEDS" ? "Departamento" : "DRADS"}</Form.Label>
                                <Form.Control
                                    disabled
                                    defaultValue={
                                        event?.local === "SEDS"
                                            ? event?.departamento_descricao
                                            : `${event?.drads_descricao} ${event?.drads_descricao_secundaria || ""}`
                                    }
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Group>
                            <Form.Label>Local</Form.Label>
                            <Form.Control disabled defaultValue={event?.local_evento} />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group>
                            <Form.Label>Título</Form.Label>
                            <Form.Control disabled defaultValue={event?.titulo} />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group>
                            <Form.Label>Descrição do evento</Form.Label>
                            <Form.Control as="textarea" rows={5} disabled defaultValue={event?.descricao} />
                        </Form.Group>
                    </Row>
                    {event?.arquivo === "" || event?.arquivo === "0" ? (
                        ""
                    ) : (
                        <>
                            <p style={{ marginTop: "4px", fontSize: "20px" }}>Anexo</p>
                            <hr />
                            <Button
                                onClick={() => {
                                    window.open(`/uploads/agenda/${event?.id_evento}.${event?.arquivo}`);
                                }}>
                                Clique aqui para visualizar o anexo
                            </Button>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalAg;
