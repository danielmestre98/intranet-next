import Link from "next/link";
import { Popover } from "react-bootstrap";
import { styled } from "styled-components";

export const UserOptionsButton = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    padding-top: 15px;
    padding-right: 15px;
    color: var(--primary-color);

    &:hover {
        cursor: pointer;
        color: #133654;
    }
`;

export const HiddenDiv = styled.div`
    position: absolute;
    height: 136px;
    width: 156px;
    margin-left: 173px;
    margin-top: 16px;
`;

export const Baloons = styled.div`
    position: absolute;
    bottom: 0;

    img {
        width: 298px;
        cursor: auto;
        z-index: 1;
        margin-left: -30px;
    }
`;

export const UserImg = styled.img`
    width: 130px;
    height: 130px;
    border-radius: 100%;
    background-color: var(--primary-color);
    box-shadow: 0px 1px 10px var(--primary-color);
    margin-bottom: 10px;
`;

export const UserText = styled.p`
    margin: 0px;
`;

export const PopoverOptions = styled(Popover)`
    overflow: hidden;
`;

export const PopoverOptionsBody = styled(Popover.Body)`
    padding: 0px;
    display: flex;
    flex-direction: column;
`;

export const PopoverOptionsItem = styled(Link)`
    /* border-radius: 0.5rem; */
    color: #000;
    text-decoration: none;
    font-size: 16px;
    padding: 5px 8px;

    &:hover {
        background-color: #f2f2f2;
    }

    &:active {
        background-color: var(--primary-color);
        color: #fff;
    }
`;
