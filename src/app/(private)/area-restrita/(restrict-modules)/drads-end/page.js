"use client";

import CardIntranet from "@/components/Card/Card";
import axios from "@/hooks/axiosInstance";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";

const DradsEndereco = () => {
    const [dradsEnd, setDradsEnd] = useState([]);
    const router = useRouter();

    useEffect(() => {
        axios
            .get("/drads-enderecos")
            .then(({ data }) => {
                setDradsEnd(data);
            })
            .catch(() => {
                toast.error(
                    "Falha ao recuperar dados, tente novamente. Caso o erro persista entre em contato com o suporte."
                );
            });
    }, []);

    return (
        <CardIntranet bigTitle cardTitle="DRADS">
            <Table bordered>
                <thead>
                    <tr>
                        <th scope="col">DRADS</th>
                        <th scope="col">ENDEREÇO</th>
                        <th scope="col">TELEFONE</th>
                        <th scope="col">GATEWAY</th>
                        <th scope="col">ID</th>
                        <th scope="col">IMPRESSORA</th>
                    </tr>
                </thead>
                <tbody>
                    {dradsEnd.map((item) => {
                        if (item?.drads?.drads_descricao_secundaria) {
                            item.drads =
                                item?.drads?.drads_descricao_secundaria + " (" + item?.drads?.drads_descricao + ")";
                        } else {
                            item.drads = item?.drads?.drads_descricao;
                        }
                        return (
                            <tr key={item?.drads?.drads_id}>
                                <td style={{ maxWidth: "150px" }}>{item.drads}</td>
                                <td style={{ maxWidth: "280px" }}>{item.endereco}</td>
                                <td>{item.telefone}</td>
                                <td>{item.gateway}</td>
                                <td>{item.id_maquina}</td>
                                <td>{item.impressora}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <Button variant="secondary" onClick={() => router.push("/area-restrita")}>
                Voltar
            </Button>
        </CardIntranet>
    );
};

export default DradsEndereco;
