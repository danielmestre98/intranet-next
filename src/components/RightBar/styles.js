import Link from "next/link";
import { styled } from "styled-components";

export const LinkRecadastramento = styled(Link)`
    color: #000;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
        text-decoration-color: #8b2424;
    }
`;

export const MenuServicos = styled.ul`
    list-style: none;
    display: flex;
    justify-content: space-evenly;
    padding: 0;
    margin-bottom: 0;
    flex-wrap: wrap;
`;

export const MenuServicoesBotao = styled.li`
    width: 110px;
    margin-bottom: 5px;
    padding: 0px;
    background-color: #4d80bb;
    padding: 3px;
    text-align: center;
    color: #fff;
    max-height: 112px;

    p {
        margin-bottom: 0;
        font-weight: bold;
        padding: 4px;
        font-size: 15px;
        border-radius: 0;
    }

    &:hover {
        transition: 0.3s ease;
        cursor: pointer;
        background-color: #133654;
    }

    span.ti {
        color: #fff;
        position: absolute;
        font-weight: bold;
        margin-left: -62px;
        margin-top: 14px;
        font-size: 26px;
    }
`;

export const Spotify = styled.iframe`
    margin-top: 10px;
    width: 100%;
    height: 200px;
`;
