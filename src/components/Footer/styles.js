import Link from "next/link";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const FooterContainer = styled.footer`
    background-color: #ccc;
    width: 100%;
`;

export const FooterSecondColor = styled.div`
    background-color: var(--primary-color);
    height: 50px;
`;

export const Address = styled.div`
    display: flex;
    text-align: left;
    position: inherit;
    justify-content: space-between;

    p {
        margin-top: 12px;
        color: black;
        font-size: 13px;
        line-height: 10px;
    }

    div {
        display: flex;
    }
`;

export const AddressLink = styled(Link)`
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

export const MarkerIcon = styled(FontAwesomeIcon)`
    margin-top: 16px;
    margin-right: 6px;
`;

export const SocialLinks = styled.ul`
    margin-bottom: -4px;
    position: relative;
    float: right;
`;

export const SocialLinkItem = styled(Link)`
    color: #6699c8;
    padding: 3px;
    font-size: 40px;

    &:hover {
        color: #034ea2;
    }
`;
