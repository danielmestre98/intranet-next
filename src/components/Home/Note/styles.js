import Link from "next/link";
import { styled } from "styled-components";

export const Timestamp = styled.p`
    position: absolute;
    margin-top: -36px;
    font-size: 12px;
    right: 0;
    margin-right: 8px;
    color: #fff;
`;

export const LinkNote = styled(Link)`
    color: #000;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;
