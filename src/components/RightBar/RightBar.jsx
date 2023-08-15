"use client";

import CardIntranet from "../Card/Card";
import UserCard from "./UserCard/UserCard";
import axios from "../../hooks/axiosInstance";
import { LinkRecadastramento, MenuServicoesBotao, MenuServicos } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLaptop, faPhoneSquare, faWifi, faWrench } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
        axios.get("/tecnicos").then(({ data }) => {
            setTecnicos(data);
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
            <CardIntranet
                cardBodyStyle={{ padding: "12px 30px 30px" }}
                style={{ backgroundColor: "#b3cce4", marginTop: "7px", textAlign: "center", maxHeight: "140px" }}>
                <LinkRecadastramento href="/documentacao/recadastramento">
                    <b>
                        Importante!
                        <br />
                        Recadastramento Anual
                    </b>
                    <br />
                    Este é o mês do seu aniversário?
                    <br />
                    Clique aqui, saiba o que é e faça o seu!
                </LinkRecadastramento>
            </CardIntranet>
            <CardIntranet style={{ marginTop: "15px" }} cardBodyStyle={{ padding: "30px" }} cardTitle="Serviços">
                <MenuServicos>
                    <MenuServicoesBotao
                        onClick={handleMenuServicoClick}
                        id={
                            tecnicos.suporte?.includes(currentUser.usuario_login.toLowerCase())
                                ? `http://10.22.0.38:83/redesocial/?lnk=helpdesk&view=home&l=${currentUser.usuario_login}`
                                : "/chamados/novo-chamado"
                        }>
                        <FontAwesomeIcon icon={faLaptop} size="5x" />
                        <span className="ti">TI</span>
                        <p>Suporte</p>
                    </MenuServicoesBotao>
                    <MenuServicoesBotao
                        onClick={handleMenuServicoClick}
                        id={
                            tecnicos.manutencao?.includes(currentUser.usuario_login.toLowerCase())
                                ? `http://10.22.0.38:83/redesocial/?lnk=manutencao&view=chamados&l=${currentUser.usuario_login}`
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
                </MenuServicos>
            </CardIntranet>
        </>
    );
};

export default RightBar;
