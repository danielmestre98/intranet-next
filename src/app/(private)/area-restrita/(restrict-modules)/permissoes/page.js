"use client";

import CardIntranet from "@/components/Card/Card";
import { useEffect, useRef, useState } from "react";
import axios from "@/hooks/axiosInstance";
import Select from "react-select";
import { toast } from "react-toastify";
import ListSelect from "@/components/ListSelect/ListSelect";

const Permissions = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState();

    useEffect(() => {
        axios
            .get(`/users-select`)
            .then(({ data }) => {
                setUsers(data);
                console.log(data);
            })
            .catch(() => {
                toast.error("Falha ao recuperar dados dos usuários. Contate o Suporte");
            });
    }, []);

    return (
        <CardIntranet cardTitle="Gerenciar Permissões" bigTitle>
            <Select
                className="mb-2"
                onChange={setSelectedUser}
                options={users}
                placeholder="Selecione o usuário..."
                name="pessoa"
                id="pessoa"
                menuPortalTarget={document.body}
            />
            <ListSelect user={selectedUser} />
        </CardIntranet>
    );
};

export default Permissions;
