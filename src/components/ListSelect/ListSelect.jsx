"use client";

import axios from "@/hooks/axiosInstance";
import { useEffect, useState } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import CardIntranet from "../Card/Card";
import PermissionsLoad from "../Loads/Permissions";
import { ListSelectUl } from "./styles";

const sortArrayItems = (array) => {
    array.sort(function (a, b) {
        if (a.nome_modulo > b.nome_modulo) {
            return 1;
        }
        if (a.nome_modulo < b.nome_modulo) {
            return -1;
        }
        return 0;
    });
};

const ListSelect = ({ user }) => {
    const [allModules, setAllModules] = useState();
    const [userModules, setUserModules] = useState();
    const [loading, setLoading] = useState(true);

    const handleAddModule = async (module) => {
        setAllModules((prevModules) => {
            var index = prevModules.findIndex((item) => item === module);
            if (index !== -1) {
                prevModules.splice(index, 1);
            }
            return prevModules;
        });
        setUserModules((prevModules) => {
            var sort = [...prevModules, module];
            sortArrayItems(sort);
            return sort;
        });
        axios.post(`/permissions/add`, { usuario: user.value, modulo: module.id_modulo }).catch(() => {
            toast.error("Falha ao adicionar permissão. Contate o administrador.");
            setUserModules((prevModules) => {
                var index = prevModules.findIndex((item) => item === module);
                if (index !== -1) {
                    prevModules.splice(index, 1);
                }
                return prevModules;
            });
            setAllModules((prevModules) => {
                var sort = [...prevModules, module];
                sortArrayItems(sort);
                return sort;
            });
        });
    };

    const handleRemoveModule = async (module) => {
        setUserModules((prevModules) => {
            var index = prevModules.findIndex((item) => item === module);
            if (index !== -1) {
                prevModules.splice(index, 1);
            }
            return prevModules;
        });
        setAllModules((prevModules) => {
            var sort = [...prevModules, module];
            sortArrayItems(sort);
            return sort;
        });
        axios.delete(`/permissions/remove/${user.value}`, { data: { module_id: module.id_modulo } }).catch(() => {
            toast.error("Erro ao remover permissão. Contate o administrador.");
            setAllModules((prevModules) => {
                var index = prevModules.findIndex((item) => item === module);
                if (index !== -1) {
                    prevModules.splice(index, 1);
                }
                return prevModules;
            });
            setUserModules((prevModules) => {
                var sort = [...prevModules, module];
                sortArrayItems(sort);
                return sort;
            });
        });
    };

    useEffect(() => {
        if (user) {
            setLoading(true);
            axios
                .get(`/permissions/get/${user?.value}`)
                .then(({ data }) => {
                    sortArrayItems(data.all_modules);
                    sortArrayItems(data.permissions);
                    setAllModules(data.all_modules);
                    setUserModules(data.permissions);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [user]);

    return (
        <Row>
            <Col md={6}>
                <CardIntranet cardTitle="Todos os módulos">
                    {user && loading ? (
                        <PermissionsLoad />
                    ) : (
                        <ListSelectUl>
                            {allModules?.map((module) => {
                                return (
                                    <ListGroup.Item
                                        onClick={() => handleAddModule(module)}
                                        key={module.id_modulo}
                                        id={module.id_modulo}>
                                        {module?.nome_modulo}
                                    </ListGroup.Item>
                                );
                            })}
                        </ListSelectUl>
                    )}
                </CardIntranet>
            </Col>
            <Col md={6}>
                <CardIntranet cardTitle="Módulos permitidos">
                    {user && loading ? (
                        <PermissionsLoad />
                    ) : (
                        <ListSelectUl>
                            {userModules?.map((module) => {
                                return (
                                    <ListGroup.Item
                                        onClick={() => handleRemoveModule(module)}
                                        key={module.id_modulo}
                                        id={module.id_modulo}>
                                        {module?.nome_modulo}
                                    </ListGroup.Item>
                                );
                            })}
                        </ListSelectUl>
                    )}
                </CardIntranet>
            </Col>
        </Row>
    );
};

export default ListSelect;
