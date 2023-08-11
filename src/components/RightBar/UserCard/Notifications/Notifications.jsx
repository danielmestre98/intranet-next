"use client";

import { faBell, faComments, faHeadset, faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { OverlayTrigger } from "react-bootstrap";
import {
    PopoverNotifications,
    PopoverNotificationsHeader,
    PopoverNotificationsBody,
    NotificationList,
    NotificationListItem,
    NotificationInfo,
    NotificationText,
    Icon,
    NotificationCounter,
    NotificationsButton,
    NotificationsGroup,
} from "./styles";

const Notifications = ({ userNotifications, userLogin }) => {
    const router = useRouter();
    const iconesNotificacao = { chamado: faHeadset, chamado_manut: faWrench, comunicado: faComments };
    const regex = /(<([^>]+)>)/gi;
    const regexImg = /<img.*?>/g;
    const handleNotificationClick = (notification) => {
        if (notification.tipo === "chamado") {
            window.open(
                `http://10.22.0.38:83/redesocial/?lnk=helpdesk&view=detalhamento&id=${notification.id}&l=${btoa(
                    userLogin
                )}`,
                "_blank"
            );
        }
        if (notification.tipo === "chamado_manut") {
            window.open(
                `http://10.22.0.38:83/redesocial/?lnk=manutencao&view=detalhamento&id=${notification.id}&l=${btoa(
                    userLogin
                )}`,
                "_blank"
            );
        }
        if (notification.tipo === "comunicado") {
            router.push(`/comunicados/view/${notification.id}`);
        }
    };

    useEffect(() => {
        if (userNotifications && userNotifications.length !== 0) {
            document.title = `(${userNotifications.length}) :: INTRANET SEDS ::`;
        } else {
            document.title = ":: INTRANET SEDS ::";
        }
    }, [userNotifications]);

    const popoverNotifications = (
        <PopoverNotifications>
            <PopoverNotificationsHeader>Notificações</PopoverNotificationsHeader>
            <PopoverNotificationsBody>
                {userNotifications && userNotifications.length !== 0 ? (
                    <NotificationList>
                        {userNotifications.map((notification) => {
                            let descricao = notification.descricao.replace(regexImg, "[Imagem]");
                            descricao = descricao.replace(regex, "");
                            if (descricao.length >= 30) {
                                descricao = descricao.substring(0, 30) + "...";
                            }
                            return (
                                <NotificationListItem
                                    onClick={() => handleNotificationClick(notification)}
                                    key={notification.id}>
                                    <Icon>
                                        <FontAwesomeIcon size="2x" icon={iconesNotificacao[notification.tipo]} />
                                    </Icon>
                                    <NotificationText>{descricao}</NotificationText>
                                    <NotificationInfo>
                                        {notification.remetente} - {notification.create_time}
                                    </NotificationInfo>
                                </NotificationListItem>
                            );
                        })}
                    </NotificationList>
                ) : (
                    <NotificationList>
                        <NotificationText style={{ textAlign: "center", padding: "10px", color: "#929292" }}>
                            Nenhuma notificação.
                        </NotificationText>
                    </NotificationList>
                )}
            </PopoverNotificationsBody>
        </PopoverNotifications>
    );

    return (
        <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popoverNotifications}>
            <NotificationsGroup>
                {userNotifications && userNotifications?.length !== 0 ? (
                    <NotificationCounter>{userNotifications?.length}</NotificationCounter>
                ) : (
                    ""
                )}

                <NotificationsButton>
                    <FontAwesomeIcon size="lg" icon={faBell} />
                </NotificationsButton>
            </NotificationsGroup>
        </OverlayTrigger>
    );
};

export default Notifications;
