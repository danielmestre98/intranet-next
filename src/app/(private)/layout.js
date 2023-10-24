"use client";

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import RightBar from "@/components/RightBar/RightBar";
import ProtectedRoute from "@/components/Routing/ProtectedRoute";
import { useState } from "react";
import ReactLoading from "react-loading";
import { Button, Container, FormCheck, FormGroup, Modal } from "react-bootstrap";
import { LoadingDiv, PagesContentDiv, PagesMainDiv, PagesMenuDiv } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "@/hooks/axiosInstance";
import { updateRecadastramento } from "../Redux/user/slice";

export default function PrivateLayout({ children }) {
    const { currentUser } = useSelector((reducer) => reducer.userReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [modalShow, setModalShow] = useState(false);
    const [recadastramentoCheck, setRecastramentoCheck] = useState(true);

    useEffect(() => {
        const showModal = () => {
            window.open("https://recadastramentoanual.sp.gov.br/recadastramentoanual/noauth/LoginPrepare.do", "_blank");
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
    }, [currentUser]);

    const hideModal = () => {
        setRecastramentoCheck(true);
        setModalShow(false);
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
