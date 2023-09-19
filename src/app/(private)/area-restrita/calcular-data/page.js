"use client";

import CardIntranet from "@/components/Card/Card";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Col, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";

const CalcularData = () => {
    const [calculo, setCalculo] = useState();
    const router = useRouter();

    const addZero = (str) => {
        str = str.toString();
        return str.length < 2 ? addZero("0" + str) : str;
    };

    const formatarDatas = (data) => {
        const ano = data.getFullYear();
        const mes = addZero(data.getMonth() + 1);
        const dia = addZero(data.getDate());
        return `${dia}/${mes}/${ano}`;
    };

    const handleCalculo = (inital, count) => {
        const response = new Date(inital);
        response.setDate(response.getDate() + count);

        return formatarDatas(response);
    };

    const calculoDatas = () => {
        const dataInicial = new Date(document.getElementById("dataInicial").value);
        const qtdDias = parseInt(document.getElementById("qtdDias").value);
        if (document.getElementById("dataInicial").value && qtdDias) {
            const total = handleCalculo(dataInicial, qtdDias);
            const noventa = handleCalculo(dataInicial, 90);
            const centoVinte = handleCalculo(dataInicial, 120);
            const centoCinquenta = handleCalculo(dataInicial, 150);
            const centoOitenta = handleCalculo(dataInicial, 180);

            setCalculo({
                total: `${qtdDias} dias: ${total}`,
                noventa: `90 dias: ${noventa}`,
                centoVinte: `120 dias: ${centoVinte}`,
                centoCinquenta: `150 dias: ${centoCinquenta}`,
                centoOitenta: `180 dias: ${centoOitenta}`,
            });
        }
    };

    return (
        <CardIntranet bigTitle cardTitle="Calcular data">
            <form onSubmit={(e) => e.preventDefault()}>
                <Row>
                    <Col md={3}>
                        <FormGroup>
                            <FormLabel>Data inicial</FormLabel>
                            <FormControl type="date" id="dataInicial" />
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <FormLabel>Quantidade de dias</FormLabel>
                            <FormControl id="qtdDias" />
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <Button onClick={calculoDatas} style={{ marginTop: "32px" }}>
                            Calcular
                        </Button>
                    </Col>
                </Row>
            </form>

            {calculo ? (
                <div>
                    <b>
                        <p style={{ color: "#034EA2" }}>Data final:</p>
                    </b>
                    <p>{calculo.total}</p>
                    <b>
                        <p style={{ color: "#034EA2" }}>Outras datas:</p>
                    </b>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <p>{calculo.noventa}</p>
                        <p>{calculo.centoVinte}</p>
                        <p>{calculo.centoCinquenta}</p>
                        <p>{calculo.centoOitenta}</p>
                    </div>
                </div>
            ) : null}
            <Button onClick={() => router.push("/area-restrita")}>Voltar</Button>
        </CardIntranet>
    );
};

export default CalcularData;
