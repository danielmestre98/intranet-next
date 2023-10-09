"use client";

import CardIntranet from "@/components/Card/Card";
import axios from "@/hooks/axiosInstance";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import { ButtonsDiv, UserDataDisplay } from "./styles";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ReactLoading from "react-loading";

const validationSchema = yup
    .object({
        local: yup.string().required(),
        usuario_nome: yup.string().required(),
        usuario_login: yup.string().required(),
        usuario_email: yup.string().nullable(),
        departamento: yup.string().required(),
        andar: yup.string().nullable(),
        lado: yup.string().nullable(),
        ramal: yup.string().required(),
        nome_maquina: yup.string().nullable(),
        processador: yup.string().nullable(),
        arklok_cpu: yup.string().nullable(),
        arklok_monitor1: yup.string().nullable(),
        arklok_monitor2: yup.string().nullable(),
        bt_cpu: yup.string().nullable(),
        bt_monitor1: yup.string().nullable(),
        bt_monitor2: yup.string().nullable(),
    })
    .required();

const ManutencaoUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [selectUsuarios, setSelectUsuarios] = useState([]);
    const [selectedUser, setSelectedUser] = useState();
    const [drads, setDrads] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [selectedLocal, setSelectedLocal] = useState("SEDS");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (form) => {
        setLoading(true);
        axios
            .put(`/user/${selectedUser.usuario_id}`, form)
            .then(() => {
                toast.success("Usuário atualizado com sucesso!");
                axios
                    .get("/users-edit")
                    .then(({ data }) => {
                        setSelectUsuarios([]);
                        setUsuarios(data);
                        data.forEach((item) => {
                            setSelectUsuarios((prevSelect) => {
                                return [...prevSelect, { label: item.usuario_nome, value: item.usuario_id }];
                            });
                        });
                    })
                    .catch(() => {
                        toast.error(
                            "Falha ao recuperar dados dos usuários tente novamente. Caso o erro persista entre em contato com o suporte."
                        );
                    });
            })
            .catch(() => {
                toast.error("Falha ao atualizar usuário. Contate o suporte");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        axios
            .get("/users-edit")
            .then(({ data }) => {
                setSelectUsuarios([]);
                setUsuarios(data);
                data.forEach((item) => {
                    setSelectUsuarios((prevSelect) => {
                        return [...prevSelect, { label: item.usuario_nome, value: item.usuario_id }];
                    });
                });
            })
            .catch(() => {
                toast.error(
                    "Falha ao recuperar dados dos usuários tente novamente. Caso o erro persista entre em contato com o suporte."
                );
            });
        axios
            .get("/departamentos-drads-separados")
            .then(({ data }) => {
                setDepartamentos(data.departamentos);
                setDrads(data.drads);
            })
            .catch(() => {
                toast.error(
                    "Falha ao recuperar dados tente novamente. Caso o erro persista entre em contato com o suporte."
                );
            });
    }, []);

    useEffect(() => {
        if (selectedUser) {
            reset();
            if (selectedUser.local === "SEDS") {
                setSelectedLocal("SEDS");
                setValue("departamento", selectedUser.departamento);
            } else {
                setSelectedLocal("DRADS");
                setValue("departamento", selectedUser.drads_id);
            }
            setValue("local", selectedUser.local);
            setValue("usuario_nome", selectedUser.usuario_nome);
            setValue("usuario_login", selectedUser.usuario_login);
            setValue("usuario_email", selectedUser.usuario_email || "");
            setValue("andar", selectedUser.andar);
            setValue("lado", selectedUser.lado);
            setValue("ramal", selectedUser.ramais?.ramal_numero);
            setValue("pin", selectedUser.pin);
            setValue("nome_maquina", selectedUser.nome_maquina);
            setValue("processador", selectedUser.core);
            setValue("arklok_cpu", selectedUser.arklok_cpu);
            setValue("arklok_monitor1", selectedUser.arklok_monitor1);
            setValue("arklok_monitor2", selectedUser.arklok_monitor2);
            setValue("bt_cpu", selectedUser.bt_cpu);
            setValue("bt_monitor1", selectedUser.bt_monitor1);
            setValue("bt_monitor2", selectedUser.bt_monitor2);
        }
    }, [selectedUser]);

    const handleUserChange = ({ value }) => {
        const user = usuarios.find((item) => item.usuario_id === value);
        setSelectedUser(user);
    };

    const handleLocalChange = (e) => {
        setValue("local", e.target.value);
        setSelectedLocal(e.target.value);
        setValue("departamento", "");
    };

    return (
        <CardIntranet cardTitle={"Alteração de usuários"} bigTitle>
            <Select onChange={handleUserChange} placeholder="Selecione um usuário..." options={selectUsuarios} />
            <hr />
            <h5 style={{ textAlign: "center" }}>Dados do usuário</h5>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <UserDataDisplay>
                    <div className="user-image">
                        <img
                            src={
                                selectedUser?.usuario_img
                                    ? `${process.env.NEXT_PUBLIC_UPLOADS_URL}/uploads/userimg/${selectedUser.usuario_id}.jpg`
                                    : "/img/assets/default-user-image.png"
                            }
                            alt="user"
                        />
                    </div>
                    <div className="data-form">
                        <Row>
                            <Col md="2">
                                <Form.Group>
                                    <Form.Label>Local</Form.Label>
                                    <Form.Check
                                        disabled={!selectedUser}
                                        {...register("local")}
                                        isInvalid={errors.local}
                                        type="radio"
                                        label="SEDS"
                                        value="SEDS"
                                        onChange={handleLocalChange}
                                    />
                                    <Form.Check
                                        disabled={!selectedUser}
                                        {...register("local")}
                                        isInvalid={errors.local}
                                        type="radio"
                                        value="DRADS"
                                        label="DRADS"
                                        onChange={handleLocalChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md="7">
                                <Form.Group>
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control
                                        disabled={!selectedUser}
                                        {...register("usuario_nome")}
                                        isInvalid={errors.usuario_nome}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md="3">
                                <Form.Group>
                                    <Form.Label>Login</Form.Label>
                                    <Form.Control
                                        readOnly
                                        disabled={!selectedUser}
                                        {...register("usuario_login")}
                                        isInvalid={errors.usuario_login}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="5">
                                <Form.Group>
                                    <Form.Label>E-mail</Form.Label>
                                    <Form.Control
                                        disabled={!selectedUser}
                                        {...register("usuario_email")}
                                        isInvalid={errors.usuario_email}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md="5">
                                <Form.Group>
                                    {selectedLocal === "SEDS" ? (
                                        <>
                                            <Form.Label>Departamento</Form.Label>
                                            <Form.Select
                                                disabled={!selectedUser}
                                                {...register("departamento")}
                                                isInvalid={errors.departamento}>
                                                <option value=""></option>
                                                {departamentos.map((departamento) => (
                                                    <option
                                                        key={departamento.departamento_id}
                                                        value={departamento.departamento_id}>
                                                        {departamento.departamento_descricao}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </>
                                    ) : (
                                        <>
                                            <Form.Label>DRADS</Form.Label>
                                            <Form.Select
                                                disabled={!selectedUser}
                                                {...register("departamento")}
                                                isInvalid={errors.departamento}>
                                                <option value=""></option>
                                                {drads.map((dradsItem) => (
                                                    <option key={dradsItem.drads_id} value={dradsItem.drads_id}>
                                                        {dradsItem.drads_descricao}{" "}
                                                        {dradsItem.drads_descricao_secundaria || ""}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </>
                                    )}
                                </Form.Group>
                            </Col>
                            <Col md="1">
                                <Form.Group>
                                    <Form.Label>Andar</Form.Label>
                                    <Form.Control
                                        disabled={!selectedUser}
                                        {...register("andar")}
                                        isInvalid={errors.andar}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md="1">
                                <Form.Group>
                                    <Form.Label>Bloco</Form.Label>
                                    <Form.Control
                                        disabled={!selectedUser}
                                        {...register("lado")}
                                        isInvalid={errors.lado}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="3">
                                <Form.Group>
                                    <Form.Label>Ramal</Form.Label>
                                    <Form.Control
                                        disabled={!selectedUser}
                                        {...register("ramal")}
                                        isInvalid={errors.ramal}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md="3">
                                <Form.Group>
                                    <Form.Label>PIN</Form.Label>
                                    <Form.Control
                                        disabled={!selectedUser}
                                        {...register("pin")}
                                        isInvalid={errors.pin}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md="3">
                                <Form.Group>
                                    <Form.Label>Nome da Máquina</Form.Label>
                                    <Form.Control
                                        disabled={!selectedUser}
                                        {...register("nome_maquina")}
                                        isInvalid={errors.nome_maquina}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md="3">
                                <Form.Group>
                                    <Form.Label>Processador</Form.Label>
                                    <Form.Select
                                        disabled={!selectedUser}
                                        {...register("processador")}
                                        isInvalid={errors.processador}>
                                        <option value=""></option>
                                        <option value="i5">i5</option>
                                        <option value="i7">i7</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="4">
                                <Form.Group>
                                    <Form.Label>Arklok CPU</Form.Label>
                                    <Form.Control
                                        disabled={!selectedUser}
                                        {...register("arklok_cpu")}
                                        isInvalid={errors.arklok_cpu}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md="4">
                                <Form.Group>
                                    <Form.Label>Arklok Monitor 1</Form.Label>
                                    <Form.Control
                                        disabled={!selectedUser}
                                        {...register("arklok_monitor1")}
                                        isInvalid={errors.arklok_monitor1}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md="4">
                                <Form.Group>
                                    <Form.Label>Arklok Monitor 2</Form.Label>
                                    <Form.Control
                                        disabled={!selectedUser}
                                        {...register("arklok_monitor2")}
                                        isInvalid={errors.arklok_monitor2}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="4">
                                <Form.Group>
                                    <Form.Label>BT CPU</Form.Label>
                                    <Form.Control
                                        disabled={!selectedUser}
                                        {...register("bt_cpu")}
                                        isInvalid={errors.bt_cpu}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md="4">
                                <Form.Group>
                                    <Form.Label>BT Monitor 1</Form.Label>
                                    <Form.Control
                                        disabled={!selectedUser}
                                        {...register("bt_monitor1")}
                                        isInvalid={errors.bt_monitor1}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md="4">
                                <Form.Group>
                                    <Form.Label>BT Monitor 2</Form.Label>
                                    <Form.Control
                                        disabled={!selectedUser}
                                        {...register("bt_monitor2")}
                                        isInvalid={errors.bt_monitor2}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                </UserDataDisplay>
                <ButtonsDiv>
                    <Button variant="secondary" onClick={() => router.push("/area-restrita")}>
                        Voltar
                    </Button>
                    <Button disabled={!selectedUser || loading === true} type="submit">
                        {loading ? <ReactLoading type="spin" color="#fff" height={"25px"} width={"25px"} /> : "Salvar"}
                    </Button>
                </ButtonsDiv>
            </Form>
        </CardIntranet>
    );
};

export default ManutencaoUsuarios;
