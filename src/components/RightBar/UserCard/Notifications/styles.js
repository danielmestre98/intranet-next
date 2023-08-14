import { Popover } from "react-bootstrap";
import { styled } from "styled-components";

export const NotificationsGroup = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    padding-top: 15px;
    padding-left: 15px;
`;

export const NotificationsButton = styled.div`
    color: var(--primary-color);

    &:hover {
        cursor: pointer;
        color: #133654;
    }
`;

export const NotificationCounter = styled.span`
    background-color: red;
    display: flex;
    cursor: default;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    width: 17px;
    height: 17px;
    position: absolute;
    left: 0;
    margin-left: 8px;
    margin-top: -7px;
    font-size: 11px;
    color: #fff;
    font-weight: bold;
`;

export const PopoverNotifications = styled(Popover)`
    overflow: hidden;
    min-width: 320px;
`;

export const PopoverNotificationsHeader = styled(Popover.Header)`
    background-color: var(--primary-color);
    color: #fff;

    &::before {
        content: none;
        border-bottom: none !important;
    }
`;

export const PopoverNotificationsBody = styled(Popover.Body)`
    padding: 0px;
`;

export const NotificationList = styled.ul`
    list-style: none;
    padding-left: 0;
    margin: 0;
`;

export const NotificationListItem = styled.li`
    padding-left: 10px;
    line-height: 45px;
    border: 1px solid #aaa;
    margin-top: -1px;
    cursor: pointer;
    display: flex;
    height: 60px;

    &:hover {
        background-color: #eee;
    }
    &:active {
        background-color: var(--primary-color);
        color: #fff;
    }
`;

export const Icon = styled.div`
    margin-right: 10px;
    margin-top: 10px;
`;

export const NotificationText = styled.div`
    font-size: 1rem;
`;

export const NotificationInfo = styled.div`
    position: absolute;
    margin-top: 24px;
    right: 0;
    margin-right: 10px;
    font-size: 10px;
`;
