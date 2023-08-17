"use client";

import { logoutUser, userNotif } from "@/app/Redux/user/slice";
import CardIntranet from "@/components/Card/Card";
import { faCog, faCommentDots, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { OverlayTrigger } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Notifications from "./Notifications/Notifications";
import { UserOptionsButton, UserImg, UserText, PopoverOptions, PopoverOptionsBody, PopoverOptionsItem } from "./styles";

const UserCard = () => {
    const router = useRouter();
    const { currentUser } = useSelector((reducer) => reducer.userReducer);
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

    const handleLogout = (event) => {
        event.preventDefault();
        dispatch(logoutUser());
        router.push("/login");
    };

    const popoverOptions = (
        <PopoverOptions>
            <PopoverOptionsBody>
                <PopoverOptionsItem href="/perfil">
                    <FontAwesomeIcon icon={faUser} /> Perfil
                </PopoverOptionsItem>
                <PopoverOptionsItem href="/comunicados">
                    <FontAwesomeIcon icon={faCommentDots} /> Comunicados
                </PopoverOptionsItem>
                <PopoverOptionsItem onClick={handleLogout} href="/logout">
                    <FontAwesomeIcon icon={faRightFromBracket} /> Sair
                </PopoverOptionsItem>
            </PopoverOptionsBody>
        </PopoverOptions>
    );

    return (
        <CardIntranet style={{ marginBottom: "10px" }} cardBodyStyle={{ padding: "30px", textAlign: "center" }}>
            <Notifications userNotifications={currentUser?.notifications} userLogin={currentUser?.usuario_login} />
            <UserOptionsButton>
                <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popoverOptions}>
                    <FontAwesomeIcon size="lg" icon={faCog} />
                </OverlayTrigger>
            </UserOptionsButton>
            {currentUser?.usuario_img ? (
                <UserImg src={`/uploads/userimg/${currentUser.usuario_id}.jpg`} />
            ) : (
                <UserImg src="/uploads/userimg/default-user-image.png" />
            )}

            <UserText>Bem vindo(a)</UserText>
            <UserText> {currentUser?.usuario_nome}</UserText>
        </CardIntranet>
    );
};

export default UserCard;
