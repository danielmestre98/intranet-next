"use client";

import { logoutUser, userNotif } from "@/app/Redux/user/slice";
import CardIntranet from "@/components/Card/Card";
import {
    faCog,
    faCommentDots,
    faDesktop,
    faFileLines,
    faRightFromBracket,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import { OverlayTrigger } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Notifications from "./Notifications/Notifications";
import axios from "@/hooks/axiosInstance";
import {
    UserOptionsButton,
    UserImg,
    UserText,
    PopoverOptions,
    PopoverOptionsBody,
    PopoverOptionsItem,
    Baloons,
    HiddenDiv,
    IconsMenu,
} from "./styles";
import { toast } from "react-toastify";

const UserCard = () => {
    const router = useRouter();
    const { currentUser } = useSelector((reducer) => reducer.userReducer);
    const hiddenDiv = useRef();
    const [aniversario, setAniversario] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchNotifications = async () => {
            axios
                .get("/notifications")
                .then(({ data }) => {
                    dispatch(userNotif(data));
                })
                .catch(() => {
                    // toast.error("Falha ao recuperar notificações");
                });
        };

        if (currentUser?.login_token) {
            fetchNotifications();
        }

        // Intervalo entre busca de notificações
        const intervalId = setInterval(() => {
            fetchNotifications();
        }, 60000);

        // Clean up the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, [dispatch, currentUser?.login_token]);

    useEffect(() => {
        const checarAniversario = async () => {
            if (currentUser?.usuario_aniversario) {
                const aniversario = new Date(currentUser?.usuario_aniversario.replace(/-/g, "/"));
                const hoje = new Date();
                if (aniversario.getDate() + "/" + aniversario.getMonth() === hoje.getDate() + "/" + hoje.getMonth()) {
                    setAniversario(true);
                } else {
                    setAniversario(false);
                }
            }
        };
        checarAniversario();
        return () => {};
    }, [currentUser]);

    const handleLogout = (event) => {
        event.preventDefault();
        dispatch(logoutUser());
        router.push("/login");
    };

    const handleClick = () => {
        hiddenDiv.current.click();
    };

    const popoverOptions = (
        <PopoverOptions className="menu-user">
            <PopoverOptionsBody onClick={handleClick}>
                <PopoverOptionsItem href="/perfil">
                    <IconsMenu icon={faUser} /> Perfil
                </PopoverOptionsItem>
                <PopoverOptionsItem href="/comunicados">
                    <IconsMenu icon={faCommentDots} /> Comunicados
                </PopoverOptionsItem>
                <PopoverOptionsItem href="/chamados">
                    <IconsMenu icon={faDesktop} /> Meus Chamados
                </PopoverOptionsItem>
                <PopoverOptionsItem
                    href={`https://portal.seds.sp.gov.br/formularios/meus-formularios/${currentUser?.login_token}`}
                    target="_blank">
                    <IconsMenu icon={faFileLines} /> Meus Formulários
                </PopoverOptionsItem>
                <PopoverOptionsItem onClick={handleLogout} href="/logout">
                    <IconsMenu icon={faRightFromBracket} /> Sair
                </PopoverOptionsItem>
            </PopoverOptionsBody>
        </PopoverOptions>
    );

    return (
        <CardIntranet
            className="user-card"
            style={{ marginBottom: "10px" }}
            cardBodyStyle={{ padding: "30px", textAlign: "center" }}>
            {aniversario ? (
                <Baloons>
                    <img src="/img/assets/aniversario.png" alt="balões" />
                </Baloons>
            ) : (
                ""
            )}
            <div hidden ref={hiddenDiv}>
                teste
            </div>
            <Notifications userNotifications={currentUser?.notifications} userLogin={currentUser?.usuario_login} />
            <OverlayTrigger trigger="click" rootClose={true} placement="bottom" overlay={popoverOptions}>
                <UserOptionsButton id="menu-user">
                    <FontAwesomeIcon size="lg" icon={faCog} />
                </UserOptionsButton>
            </OverlayTrigger>
            <HiddenDiv className="hidden-menu" />
            {currentUser?.usuario_img ? (
                <UserImg
                    src={`${process.env.NEXT_PUBLIC_UPLOADS_URL}/uploads/userimg/${currentUser?.usuario_id}.jpg`}
                />
            ) : (
                <UserImg src="/img/assets/default-user-image.png" />
            )}

            <UserText>{aniversario ? "Parabéns!" : "Bem vindo(a)"}</UserText>
            <UserText> {currentUser?.usuario_nome}</UserText>
        </CardIntranet>
    );
};

export default UserCard;
