"use client";

import CardIntranet from "@/components/Card/Card";
import { useEffect, useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import Select from "react-select";
import axios from "@/hooks/axiosInstance";
import { toast } from "react-toastify";
import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";
import { NavigationButtons } from "./styles";
import { useRouter } from "next/navigation";

const NewComunicado = () => {
    const [destinos, setDestinos] = useState([]);
    const [presetDestino, setPresetDestino] = useState();
    const [sendAsDepartment, setSendAsDepartment] = useState(false);
    const router = useRouter();

    useEffect(() => {
        axios
            .get("/users-select")
            .then(({ data }) => {
                setDestinos(data);
            })
            .catch(() => {
                toast.error("Falha ao recuperar usuários, por favor entre em contato com o suporte.");
            });
    }, []);

    const changePresetDestino = (e) => {
        if (presetDestino == e.target.id) {
            setPresetDestino(null);
            return;
        }
        setPresetDestino(e.target.id);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        var data = {
            destino: [],
            enviarComoDepto: sendAsDepartment,
            descricao: document.getElementById("comunicado-html").value,
        };
        if (presetDestino) {
            switch (presetDestino) {
                case "enviar-todos":
                    data.destino.push("0");
                    break;
                case "enviar-seds":
                    data.destino.push("1");
                    break;
                case "enviar-drads":
                    data.destino.push("2");
                    break;
            }
        } else {
            const destinosInput = document.getElementsByName("destinos");
            if (!destinosInput[0].value) {
                toast.error("Por favor selecione pelo menos um destino");
                return;
            }
            destinosInput.forEach((element) => {
                data.destino.push(element.value);
            });
        }
        axios
            .post("/comunicados/new", data)
            .then(() => {
                toast.success("Comunicado criado com sucesso");
                router.push("/area-restrita/comunicados");
            })
            .catch(() => {
                toast.error(
                    "Falha ao criar comunicado, tente novamente. Caso o erro persista entre em contato com o suporte."
                );
            });
    };

    return (
        <CardIntranet cardTitle="Novo Comunicado" bigTitle>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Form.Group>
                        <Form.Label>Destinos</Form.Label>
                        <Select
                            isDisabled={presetDestino}
                            name="destinos"
                            id="destinos"
                            placeholder="Selecione os destinos..."
                            options={destinos}
                            isMulti
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group style={{ display: "flex", columnGap: "10px" }}>
                        <Form.Group controlId="enviar-todos">
                            <Form.Check
                                onChange={changePresetDestino}
                                checked={presetDestino === "enviar-todos"}
                                type="checkbox"
                                name="presets"
                                label="Enviar para todos"
                            />
                        </Form.Group>
                        <Form.Group controlId="enviar-seds">
                            <Form.Check
                                onChange={changePresetDestino}
                                checked={presetDestino === "enviar-seds"}
                                type="checkbox"
                                name="presets"
                                label="Enviar para SEDS"
                            />
                        </Form.Group>
                        <Form.Group controlId="enviar-drads">
                            <Form.Check
                                checked={presetDestino === "enviar-drads"}
                                onChange={changePresetDestino}
                                type="checkbox"
                                name="presets"
                                label="Enviar para DRADS"
                            />
                        </Form.Group>
                    </Form.Group>
                </Row>
                <Row>
                    <RichTextEditor />
                </Row>
                <Row>
                    <Form.Group controlId="enviar-departamento" id="enviar-como-depto">
                        <Form.Check
                            reverse
                            type="checkbox"
                            onChange={() => setSendAsDepartment((prevValue) => !prevValue)}
                            label="Enviar como departamento"
                        />
                    </Form.Group>
                </Row>
                <NavigationButtons>
                    <Button onClick={() => router.push("/area-restrita/comunicados")} variant="secondary">
                        Voltar
                    </Button>
                    <Button type="submit">Salvar</Button>
                </NavigationButtons>
            </Form>
        </CardIntranet>
    );
};

export default NewComunicado;
