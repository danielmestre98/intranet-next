"use client";

import { logoutUser, userNotif } from "@/app/Redux/user/slice";
import CardIntranet from "@/components/Card/Card";
import { faCog, faCommentDots, faDesktop, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { OverlayTrigger } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Notifications from "./Notifications/Notifications";
import {
    UserOptionsButton,
    UserImg,
    UserText,
    PopoverOptions,
    PopoverOptionsBody,
    PopoverOptionsItem,
    Baloons,
} from "./styles";

const UserCard = () => {
    const router = useRouter();
    const { currentUser } = useSelector((reducer) => reducer.userReducer);
    const hiddenDiv = useRef();
    const [aniversario, setAniversario] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const eventSource = new EventSource(
            `${process.env.NEXT_PUBLIC_API_URL}/notifications-sse?token=${currentUser.login_token}`
        );
        eventSource.onmessage = async (event) => {
            const notificationData = JSON.parse(event.data);
            dispatch(userNotif(notificationData));
        };
        return () => {
            eventSource.close(); // Clean up when component unmounts
        };
    }, [dispatch]);

    useEffect(() => {
        const checarAniversario = async () => {
            if (currentUser.usuario_aniversario) {
                const aniversario = new Date(currentUser.usuario_aniversario.replace(/-/g, "/"));
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
        <PopoverOptions>
            <PopoverOptionsBody onClick={handleClick}>
                <PopoverOptionsItem href="/perfil">
                    <FontAwesomeIcon icon={faUser} /> Perfil
                </PopoverOptionsItem>
                <PopoverOptionsItem href="/comunicados">
                    <FontAwesomeIcon icon={faCommentDots} /> Comunicados
                </PopoverOptionsItem>
                <PopoverOptionsItem href="/chamados">
                    <FontAwesomeIcon icon={faDesktop} /> Meus Chamados
                </PopoverOptionsItem>
                <PopoverOptionsItem onClick={handleLogout} href="/logout">
                    <FontAwesomeIcon icon={faRightFromBracket} /> Sair
                </PopoverOptionsItem>
            </PopoverOptionsBody>
        </PopoverOptions>
    );

    return (
        <CardIntranet style={{ marginBottom: "10px" }} cardBodyStyle={{ padding: "30px", textAlign: "center" }}>
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
            <UserOptionsButton>
                <OverlayTrigger trigger="click" rootClose={true} placement="bottom" overlay={popoverOptions}>
                    <FontAwesomeIcon size="lg" icon={faCog} />
                </OverlayTrigger>
            </UserOptionsButton>
            {currentUser?.usuario_img ? (
                <UserImg src={`${process.env.NEXT_PUBLIC_UPLOADS_URL}/uploads/userimg/${currentUser.usuario_id}.jpg`} />
            ) : (
                <UserImg src="/img/assets/default-user-image.png" />
            )}

            <UserText>{aniversario ? "Parabéns!" : "Bem vindo(a)"}</UserText>
            <UserText> {currentUser?.usuario_nome}</UserText>
        </CardIntranet>
    );
};

export default UserCard;
