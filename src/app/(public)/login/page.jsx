"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { LoginCard, LoginCardHeader, LoginCardInner, LoginCardOuter } from "./styles";
import axios from "../../../hooks/axiosInstance";
import { useRouter } from "next/navigation";

const schema = yup
    .object({
        username: yup.string().required(),
        password: yup.string().required(),
    })
    .required();

const Login = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        axios.post(`/login`, data).then(async ({ data }) => {
            localStorage.setItem("userToken", data);
            router.push("/");
        });
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
                                <Form.Group controlId="password">
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
                                <Button className="mt-3" type="submit">
                                    Login
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
