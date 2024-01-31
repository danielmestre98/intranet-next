"use client";

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import RightBar from "@/components/RightBar/RightBar";
import ProtectedRoute from "@/components/Routing/ProtectedRoute";
import { useState } from "react";
import ReactLoading from "react-loading";
import { Button, Container, Form, FormCheck, FormGroup, Modal, Row } from "react-bootstrap";
import { LoadingDiv, PagesContentDiv, PagesMainDiv, PagesMenuDiv, Red } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "@/hooks/axiosInstance";
import { updateProfile, updateRecadastramento } from "../Redux/user/slice";
import Tutorial from "@/components/Tutorial/Tutorial";

const validationSchema = yup
    .object({
        usuario_nome: yup.string().required(),
        ramal: yup.string(),
        usuario_aniversario: yup.string(),
    })
    .required();

export default function PrivateLayout({ children }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });
    const { currentUser } = useSelector((reducer) => reducer.userReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [modalShow, setModalShow] = useState(false);
    const [modalNovoNome, setModalNovoNome] = useState(false);
    const [recadastramentoCheck, setRecastramentoCheck] = useState(true);
    const [isEventAllowed, setIsEventAllowed] = useState(true);

    useEffect(() => {
        const handleFocus = () => {
            // Code to execute when the window gains focus
            if (isEventAllowed) {
                axios.post("/user/last-seen");
                setIsEventAllowed(false);
                setTimeout(() => {
                    setIsEventAllowed(true);
                }, 30000);
            }
        };

        window.addEventListener("focus", handleFocus);

        return () => {
            window.removeEventListener("focus", handleFocus);
        };
    }, [isEventAllowed]);

    useEffect(() => {
        const showModal = () => {
            window.open("https://recad.sp.gov.br/", "_blank");
            setModalShow(true);
        };

        const currentDate = new Date();
        const userBirthday = new Date(currentUser?.usuario_aniversario);
        if (currentUser?.recadastramento === 0 && currentDate?.getMonth() === userBirthday?.getMonth()) {
            toast.warning("Faça seu recadastramento anual, clique aqui!", {
                autoClose: false,
                closeOnClick: false,
                closeButton: false,
                toastId: "recadastramento",
                style: { cursor: "pointer" },
                draggable: false,
                onClick: showModal,
            });
        }

        if (
            currentUser?.usuario_nome.toLowerCase() == currentUser?.usuario_login.toLowerCase() &&
            currentUser?.tutorial == "1"
        ) {
            setModalNovoNome(true);
        }
    }, [currentUser]);

    const hideModal = () => {
        setRecastramentoCheck(true);
        setModalShow(false);
    };

    const handleNovoNomeSubmit = (form) => {
        axios
            .post(`/user/profile-update`, form)
            .then(() => {
                toast.success("Alterações salvas com sucesso!");
                dispatch(updateProfile(form));
                setModalNovoNome(false);
            })
            .catch(() => {
                toast.error("Erro ao gravar dados, entre em contato com o suporte.");
            });
    };

    const toggleRecadastramento = (e) => {
        setRecastramentoCheck(!e.target.checked);
    };

    const handleRecadastramento = () => {
        axios.post("/user/recadastramento").then(() => {
            dispatch(updateRecadastramento(1));
            toast.dismiss("recadastramento");
            hideModal();
        });
    };

    return (
        <ProtectedRoute setLoading={setLoading}>
            {!currentUser?.tutorial && !loading ? <Tutorial /> : ""}
            <Modal show={modalShow} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação de recadastramento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        <b>Completou o recadastramento anual?</b>
                    </p>
                    <FormGroup controlId="checkbox-recadastramento">
                        <FormCheck
                            onChange={toggleRecadastramento}
                            label="* Confirmo que completei o recadastramento anual e é de minha responsabilidade caso não o faça."
                            type="checkbox"
                        />
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideModal}>
                        Não
                    </Button>
                    <Button disabled={recadastramentoCheck} onClick={handleRecadastramento}>
                        Sim
                    </Button>
                </Modal.Footer>
            </Modal>
            {!loading ? (
                <Modal show={modalNovoNome}>
                    <Modal.Header>
                        <Modal.Title>Cadastrar dados básicos</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={handleSubmit(handleNovoNomeSubmit)}>
                        <Modal.Body>
                            <Row>
                                <Form.Group>
                                    <Form.Label>
                                        <Red>*</Red> Nome Completo
                                    </Form.Label>
                                    <Form.Control isInvalid={errors?.usuario_nome} {...register("usuario_nome")} />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group>
                                    <Form.Label>Conato (Ramal)</Form.Label>
                                    <Form.Control
                                        defaultValue={currentUser?.ramais?.ramal_numero}
                                        {...register("ramal")}
                                    />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group>
                                    <Form.Label>Aniversário (ano de nascimento é privado)</Form.Label>
                                    <Form.Control
                                        defaultValue={currentUser?.usuario_aniversario}
                                        type="date"
                                        {...register("usuario_aniversario")}
                                    />
                                </Form.Group>
                            </Row>
                            <p>
                                Campos com <Red>*</Red> são obrigatórios.
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit">Salvar</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            ) : (
                ""
            )}

            {loading ? (
                <LoadingDiv>
                    <ReactLoading type="spin" color="#034ea2" height={"200px"} width={"200px"} />
                </LoadingDiv>
            ) : (
                <>
                    <Container>
                        <Navbar />
                        <PagesMainDiv>
                            <PagesContentDiv>{children}</PagesContentDiv>
                            <PagesMenuDiv>
                                <RightBar />
                            </PagesMenuDiv>
                        </PagesMainDiv>
                    </Container>
                    <Footer />
                </>
            )}
        </ProtectedRoute>
    );
}
