import Link from "next/link";
import { ToggleButton } from "react-bootstrap";
import { styled } from "styled-components";

export const HeaderAgenda = styled.div`
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    font-size: 18px;
    max-width: 488px;
    display: flex;
    align-items: center;

    p {
        margin: 0px;
        margin-right: 5px;
    }
`;

export const LinkCreateEvent = styled(Link)`
    font-size: 11px;
    width: 120px;
    margin-left: 5px;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

export const ButtonGroup = styled.div`
    display: inline-block;
    width: 100%;
    padding-top: 3px;
    padding-bottom: 3px;
    padding-left: 20px;
    margin-top: 9px;
    margin-bottom: -9px;
    max-width: 488px;
    scroll-behavior: smooth;
    overflow: hidden;
    white-space: nowrap;
`;

export const ButtonAgenda = styled(ToggleButton)`
    border-radius: 32px;
    font-size: 14px;
    line-height: 20px;
    margin-right: 5px;
`;

export const LeftArrow = styled.button`
    background-color: unset;
    border: 0;
    margin-top: 7px;
    font-size: 28px;
    width: 30px;
    position: absolute;
    background: -webkit-linear-gradient(right, rgba(137, 255, 241, 0) 0%, rgb(255, 255, 255) 100%);
`;

export const RightArrow = styled.button`
    background-color: unset;
    border: 0;
    width: 30px;
    margin-top: 7px;
    margin-left: -30px;
    font-size: 28px;
    position: absolute;
    background: -webkit-linear-gradient(left, rgba(137, 255, 241, 0) -10%, rgb(255, 255, 255) 100%);
`;

export const EventsBlock = styled.div`
    overflow: auto;
    max-height: 284px;

    &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }

    &::-webkit-scrollbar-button {
        width: 0px;
        height: 0px;
    }

    &::-webkit-scrollbar-thumb {
        background: #034ea2;
        border: 0px none #ffffff;
        border-radius: 50px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #133654;
    }

    &::-webkit-scrollbar-thumb:active {
        background: #133654;
    }

    &::-webkit-scrollbar-track {
        background: #9c9c9c;
        border: 0px none #ffffff;
        border-radius: 50px;
    }

    &::-webkit-scrollbar-track:hover {
        background: #ccc;
    }

    &::-webkit-scrollbar-track:active {
        background: #aaa;
    }

    &::-webkit-scrollbar-corner {
        background: transparent;
    }
`;

export const EventContainer = styled.div`
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;

    &:hover {
        background-color: #eee;
        cursor: pointer;
    }

    &:active {
        background-color: #ccc;
    }
`;

export const DayBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 15%;
    margin-left: 10px;
    margin-right: 10px;
    text-align: center;
    border-radius: 10px;
    margin-top: 2.5px;
    margin-bottom: 2.5px;
    padding-bottom: 5px;

    .dia {
        font-size: 20px;
    }

    .mes {
        font-size: 11px;
    }

    .nome-dia {
        font-size: 9px;
    }

    &.acao-formativa {
        background-color: #6ec9ec;
    }

    &.evento-comum {
        background-color: #fff4d5;
    }

    &.feriado {
        background-color: #b0e7b0;
    }
`;

export const DetailsBlock = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;

    .horas {
        font-size: 11px;
    }

    .nome {
        font-size: 11px;
    }

    .local {
        font-size: 11px;
    }
`;

export const NoEventsDiv = styled.div`
    justify-content: center;
    flex-direction: column;
    margin-top: 10px;
    margin-left: 115px;
    display: flex;
    height: 83.5px;
    color: #9c9c9c;
`;
