"use client";

import CardIntranet from "../Card/Card";
import UserCard from "./UserCard/UserCard";
import axios from "../../hooks/axiosInstance";
import { MenuServicoesBotao, MenuServicos, Spotify } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faEnvelope, faLaptop, faPhoneSquare, faWifi, faWrench } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Birthdays from "./Birthdays/Birthdays";
import { toast } from "react-toastify";

function isValidURL(str) {
    try {
        new URL(str);
        return true;
    } catch (error) {
        return false;
    }
}

const RightBar = () => {
    const [tecnicos, setTecnicos] = useState([]);
    const { currentUser } = useSelector((reducer) => reducer.userReducer);
    const router = useRouter();

    useEffect(() => {
        axios
            .get("/tecnicos")
            .then(({ data }) => {
                setTecnicos(data);
            })
            .catch(() => {
                toast.error("Erro ao resgatar técnicos, entre em contato com o suporte.");
            });
    }, []);

    const handleMenuServicoClick = (e) => {
        if (isValidURL(e.currentTarget.id)) {
            window.open(e.currentTarget.id, "_blank");
        } else {
            router.push(e.currentTarget.id);
        }
    };

    return (
        <>
            <UserCard />
            <CardIntranet style={{ marginTop: "15px" }} cardBodyStyle={{ padding: "30px" }} cardTitle="Serviços">
                <MenuServicos>
                    <MenuServicoesBotao
                        onClick={handleMenuServicoClick}
                        id={
                            tecnicos.suporte?.includes(currentUser?.usuario_login?.toLowerCase())
                                ? `http://10.22.0.38:83/redesocial/?lnk=helpdesk&view=home&l=${currentUser?.usuario_login}`
                                : "/chamados/novo-chamado"
                        }>
                        <FontAwesomeIcon icon={faLaptop} size="5x" />
                        <span className="ti">TI</span>
                        <p>Suporte</p>
                    </MenuServicoesBotao>
                    <MenuServicoesBotao
                        onClick={handleMenuServicoClick}
                        id={
                            tecnicos.manutencao?.includes(currentUser?.usuario_login?.toLowerCase())
                                ? `http://10.22.0.38:83/redesocial/?lnk=manutencao&view=chamados&l=${currentUser?.usuario_login}`
                                : "/chamados/novo-chamado-manut"
                        }>
                        <FontAwesomeIcon icon={faWrench} size="5x" />
                        <p>Manutenção</p>
                    </MenuServicoesBotao>
                    <MenuServicoesBotao id="https://outlook.office.com/mail/" onClick={handleMenuServicoClick}>
                        <FontAwesomeIcon icon={faEnvelope} size="5x" />
                        <p>Office 365</p>
                    </MenuServicoesBotao>
                    <MenuServicoesBotao id="/ramais" onClick={handleMenuServicoClick}>
                        <FontAwesomeIcon icon={faPhoneSquare} size="5x" />
                        <p>Ramais</p>
                    </MenuServicoesBotao>
                    <MenuServicoesBotao>
                        <FontAwesomeIcon
                            onClick={() =>
                                alert(
                                    "Utilize o mesmo login e senha usados para acessar o computador.\nSenha wifi visitantes: Seds*2@2@"
                                )
                            }
                            icon={faWifi}
                            size="5x"
                        />
                        <p>Wi-Fi</p>
                    </MenuServicoesBotao>
                    <MenuServicoesBotao id="/biblioteca" onClick={handleMenuServicoClick}>
                        <FontAwesomeIcon icon={faBook} size="5x" />
                        <p>Biblioteca</p>
                    </MenuServicoesBotao>
                </MenuServicos>
            </CardIntranet>
            <Birthdays />
            <Spotify title="spotify" src="https://open.spotify.com/embed-podcast/show/7dZuzlniuCoq4mTaiJUuFU" />
        </>
    );
};

export default RightBar;
