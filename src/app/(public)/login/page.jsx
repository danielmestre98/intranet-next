"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ReactLoading from "react-loading";
import * as yup from "yup";

import { LoginCard, LoginCardHeader, LoginCardInner, LoginCardOuter } from "./styles";
import axios from "../../../hooks/axiosInstance";
import { useRouter } from "next/navigation";
import { useState } from "react";

const schema = yup
    .object({
        username: yup.string().required(),
        password: yup.string().required(),
    })
    .required();

const Login = () => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        setLoading(true);
        axios
            .post(`/login`, data)
            .then(async ({ data }) => {
                localStorage.setItem("userToken", data);
                router.push("/");
            })
            .catch(() => {
                setError(true);
            })
            .finally(() => setLoading(false));
    };

    return (
        <>
            <LoginCardOuter>
                <LoginCardInner>
                    <LoginCard>
                        <LoginCardHeader>
                            <h3>Intranet SEDS</h3>
                        </LoginCardHeader>
                        <Card.Body>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group controlId="username">
                                    <Form.Label>Usuário</Form.Label>
                                    <Form.Control isInvalid={errors.username} type="text" {...register("username")} />
                                    <Form.Control.Feedback type="invalid">
                                        Esse campo é necessário
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control
                                        isInvalid={errors.password}
                                        {...register("password")}
                                        type="password"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Esse campo é necessário
                                    </Form.Control.Feedback>
                                </Form.Group>
                                {error ? <Alert variant="danger">Usuário ou senha inválidos.</Alert> : null}

                                <Button disabled={loading ? true : false} type="submit">
                                    {loading ? (
                                        <ReactLoading type="spin" color="#fff" height={"25px"} width={"25px"} />
                                    ) : (
                                        "Login"
                                    )}
                                </Button>
                            </Form>
                        </Card.Body>
                    </LoginCard>
                </LoginCardInner>
            </LoginCardOuter>
        </>
    );
};

export default Login;
