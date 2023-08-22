"use client";

import CardIntranet from "@/components/Card/Card";
import { List, ListItem } from "@/components/List/List";
import { useEffect, useState } from "react";
import axios from "@/hooks/axiosInstance";
import RestrictedAreaLoad from "@/components/Loads/RestrictedArea";
import { useSelector } from "react-redux";

const publicModules = [
    {
        id_modulo: "999",
        url_modulo: "calcular-data",
        nome_modulo: "Calcular data",
    },
    { id_modulo: "1000", url_modulo: "agenda", nome_modulo: "Agenda de eventos" },
    {
        id_modulo: "1001",
        url_modulo: "agendamento-sala-da",
        nome_modulo: "Agendamento sala DA",
    },
];

const AreaRestrita = () => {
    const [loading, setLoading] = useState(true);
    const [modules, setModules] = useState(publicModules);
    const { currentUser } = useSelector((reducer) => reducer.userReducer);

    useEffect(() => {
        axios
            .get("/permissions/modules")
            .then(({ data }) => {
                const allModules = [...modules, ...data];

                setModules(
                    allModules.sort(function (a, b) {
                        if (a.nome_modulo > b.nome_modulo) {
                            return 1;
                        }
                        if (a.nome_modulo < b.nome_modulo) {
                            return -1;
                        }
                        // a must be equal to b
                        return 0;
                    })
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <CardIntranet bigTitle cardTitle="Área Restrita">
            {loading ? (
                <RestrictedAreaLoad />
            ) : (
                <List>
                    {modules.map((row) => {
                        if (row.id_modulo === 14) {
                            return (
                                <ListItem
                                    clickableRow
                                    key={row?.id_modulo}
                                    href={row.url_modulo + localStorage.getItem("userToken")}>
                                    {row?.nome_modulo}
                                </ListItem>
                            );
                        }

                        return (
                            <ListItem
                                clickableRow
                                key={row?.id_modulo}
                                href={
                                    row?.url_modulo.search("https://") === -1
                                        ? `/area-restrita/${row?.url_modulo}`
                                        : `${row?.url_modulo}/${btoa(
                                              `${currentUser.usuario_login}/valido/${currentUser.usuario_nome}/${currentUser.usuario_id}`
                                          )}`
                                }>
                                {row?.nome_modulo}
                            </ListItem>
                        );
                    })}
                </List>
            )}
        </CardIntranet>
    );
};

export default AreaRestrita;
