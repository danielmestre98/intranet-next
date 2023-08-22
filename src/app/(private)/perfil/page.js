"use client";

import CardIntranet from "@/components/Card/Card";
import ImgCrop from "@/components/Profile/ImgCrop";
import { useDispatch, useSelector } from "react-redux";
import { ProfileDiv, ProfileForm, ProfileImg } from "./styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button, Col, Form, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "@/hooks/axiosInstance";
import { updateProfile } from "@/app/Redux/user/slice";
import { toast } from "react-toastify";

const validationSchema = yup
    .object({
        usuario_nome: yup.string().required(),
        ramal: yup.string().required(),
        usuario_aniversario: yup.string().required(),
    })
    .required();

const Perfil = () => {
    const { currentUser } = useSelector((reducer) => reducer.userReducer);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        axios
            .post(`/user/profile-update`, data)
            .then(() => {
                toast.success("Alterações salvas com sucesso!");
                dispatch(updateProfile(data));
            })
            .catch(() => {
                toast.error("Erro ao gravar dados, entre em contato com o suporte.");
            });
    };

    return (
        <CardIntranet bigTitle cardTitle="Perfil">
            <ProfileDiv>
                <ProfileImg>
                    <img
                        src={
                            currentUser?.usuario_img
                                ? `${process.env.NEXT_PUBLIC_UPLOADS_URL}/uploads/userimg/${currentUser.usuario_id}.jpg`
                                : "/img/assets/default-user-image.png"
                        }
                        alt="..."
                    />
                    <ImgCrop />
                </ProfileImg>
                <ProfileForm>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col md="6">
                                <Form.Group controlId="usuario_nome">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control
                                        isInvalid={errors.usuario_nome}
                                        type="text"
                                        defaultValue={currentUser?.usuario_nome}
                                        {...register("usuario_nome")}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Esse campo é necessário
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md="6">
                                <Form.Group controlId="ramal">
                                    <Form.Label>Contato (Ramal)</Form.Label>
                                    <Form.Control
                                        isInvalid={errors.ramal}
                                        type="text"
                                        inputMode="numeric"
                                        defaultValue={currentUser?.ramais?.ramal_numero}
                                        {...register("ramal")}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Esse campo é necessário
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Group controlId="departamento">
                                    <Form.Label>Departamento/DRADS</Form.Label>
                                    <Form.Control
                                        disabled
                                        defaultValue={
                                            currentUser?.local === "SEDS"
                                                ? currentUser?.departamentos?.departamento_descricao
                                                : `${currentUser?.drads.drads_descricao} ${
                                                      currentUser?.drads.drads_descricao_secundaria || ""
                                                  }`
                                        }
                                    />
                                </Form.Group>
                            </Col>
                            <Col md="6">
                                <Form.Group controlId="usuario_aniversario">
                                    <Form.Label>Aniversário (ano de nascimento é privado)</Form.Label>
                                    <Form.Control
                                        isInvalid={errors.usuario_aniversario}
                                        type="date"
                                        defaultValue={currentUser?.usuario_aniversario}
                                        {...register("usuario_aniversario")}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Esse campo é necessário
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Form.Group controlId="pin">
                                    <Form.Label>
                                        PIN{" "}
                                        <OverlayTrigger
                                            placement="right"
                                            overlay={<Tooltip>Utilizado para aprovar impressoes</Tooltip>}>
                                            <span style={{ cursor: "help" }}>
                                                <FontAwesomeIcon icon={faQuestionCircle} />
                                            </span>
                                        </OverlayTrigger>
                                    </Form.Label>
                                    <Form.Control disabled defaultValue={currentUser?.pin} />
                                </Form.Group>
                            </Col>
                            <Col md="6">
                                <Form.Group controlId="email">
                                    <Form.Label>E-mail</Form.Label>
                                    <Form.Control disabled defaultValue={currentUser?.usuario_email} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button style={{ float: "right" }} size="sm" type="submit">
                            Salvar
                        </Button>
                    </Form>
                </ProfileForm>
            </ProfileDiv>
        </CardIntranet>
    );
};

export default Perfil;
